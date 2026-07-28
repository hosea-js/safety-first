const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { latestEarthquake } = require("../services/bmkg")

module.exports = {
    data: new SlashCommandBuilder() .setName("latestearthq") .setDescription("Get latest earthquake information from Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)"),
    
    async execute(interaction) {
  await interaction.deferReply();

  try {
    const data = await latestEarthquake();
    const gempa = data.Infogempa.gempa;

    if (!gempa) {
      return interaction.editReply("Bot mendeteksi adanya kesalahan dalam format data yang digunakan. Mohon untuk segera melaporan kepada tim developer. Terima kasih!");
    }

    const location = `https://maps.google.com/?q=${gempa.Coordinates}`
    const embed = new EmbedBuilder().setColor(0x1E88E5) .setTitle("🌎 Latest Earthquake") .addFields({name: "Magnitude", value: gempa.Magnitude, inline: true}, {name: "Depth", value: gempa.Kedalaman, inline: true}, {name: "Location", value: `Google Maps: ${location}`}, {name: "Coordinates", value: gempa.Coordinates}, {name: "Date and Time", value: `${gempa.Tanggal}, Jam ${gempa.Jam}`}) .setFooter({text: "Source: Badan Meteorologi, Klimatologi, dan Geofisika Indonesia"}) .setImage(`https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`);
    return interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    return interaction.editReply("Terdapat kesalahan yang terjadi. Mohon untuk segera melaporkan kepada tim developer. Terima kasih!");
  }
}};