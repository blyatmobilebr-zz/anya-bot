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
    if (message.content.startsWith(prefix)) {
      let animal = message.content.substring(prefix.length).trim();
      switch(animal) {
        case "shibes":
        case "birds":
        case "cats":
          let apiURL = `http://shibe.online/api/${animal}?count=1&urls=true&httpsUrls=true`;
          let response = await axios.get(apiURL);
          message.channel.send(response.data);
          break;

        //help command 
        case "help":
          let embed = new Discord.MessageEmbed()
          .setTitle("Help Command")
          .setDescription("Help command for users")
          .addFields(
            { name: prefix + "shibes", value: "Returns a random shibe picture." },
            { name: prefix + "birds", value: "Returns a random bird picture." },
            { name: prefix + "cats", value: "Returns a random cat picture." }
          )
          .setFooter("Made with love by Anya!")
          .setTimestamp();

          message.channel.send(embed);
          break;
        default: 
          message.content.send(
          `Please type ${prefix}help to see the commands available.`
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
anya.login(process.env.TOKEN);
