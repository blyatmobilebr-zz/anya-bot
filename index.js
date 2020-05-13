const Discord = require("discord.js");
const anya = new Discord.Client();
const { token, prefix } = require("./config.json");
const axios = require("axios");

// Initializing discord client
anya.once("ready", () => console.log("let's go!"));

// Event listener for every message sent
anya.on("message", async (message) => {
  try {
    // Ignore messages if they're from bots
    if (message.author.bot) return;

    // if they aren't:
    if (message.content === `${prefix}`.concat(message.content.substring(1))) {
      let animal = message.content.substring(1);
      if (animal === "shibes" || animal === "birds" || animal === "cats") {
        let apiURL = `http://shibe.online/api/${animal}?count=1&urls=true&httpsUrls=true`;
        let response = await axios.get(apiURL);
        message.channel.send(response.data);
      }

      // Help command
      else if (message.content === `${prefix}help`) {
        let embed = new Discord.MessageEmbed()
          .setTitle("Help Command")
          .setDescription("Help command for users")
          .addFields(
            { name: "!shibes", value: "Returns a random shibe picture." },
            { name: "!birds", value: "Returns a random bird picture." },
            { name: "!cats", value: "Returns a random cat picture." }
          )
          .setFooter("Made with love by Anya!")
          .setTimestamp();

        message.channel.send(embed);
      }

      // Anything that doesn't fit in the above commands
      else {
        message.content.send(
          "Please type !help to see the commands available."
        );
      }
    }
  } catch (error) {
    message.channel.send(
      "There was an error while trying to run the command..."
    );
  }
});

// Making the bot online in the server
anya.login(token);
