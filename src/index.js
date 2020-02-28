const Discord = require("discord.js");

const client = new Discord.Client();
const { key, prefix } = require("./config");
const fs = require("fs");

const currentDirc = "/Users/user/Documents/Projetcs/Discord_Bot/src";
client.commands = new Discord.Collection();

client.once("ready", () => {
  console.log("Ready!");
});

fs.readdir(currentDirc + "/command/", (err, files) => {
  for (const file of files) {
    const command = require(`./command/${file}`);
    client.commands.set(command.name, command);
  }
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length + 1).split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    client.commands.get(command).execute(message);
  } catch (error) {
    console.error(error);
  }
});

client.login(key);
