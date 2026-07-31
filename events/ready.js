const earthquakeWatcher = require("../tasks/earthquakeWatcher")

module.exports = {
    name: "ready",
    once: true,

    execute(client) {
        console.log(`${client.user.tag} ready from ./events/ready.js!`)

        earthquakeWatcher(client);
    }
}