const { Client, Collection, GatewayIntentBits } = require(`discord.js`);
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once(`clientReady`, () => {
    console.log(`Succesfully logged as ${client.user.tag} from index.js`)
})

// Command Collection
const fs = require("fs")
const path = require("path")

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    client.commands.set(command.data.name, command)
}

client.login(process.env.BOT_TOKEN);
console.log(client.commands.keys());
console.log(commandFiles);

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.log(err);

        if (interaction.replied || interaction.deferred) {
            await interaction.editReply("Error.");
        } else {await interaction.reply("Error.");}
    }
});