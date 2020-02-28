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
    console.log(command.name);
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

  //   if (!message.content.startsWith(prefix) || message.author.bot) return;
  //   if (message.content.toLowerCase() == prefix) {
  //     message.channel
  //       .send("Do you need help with MSG , Ostric , or Project")
  //       .then(() => {
  //         const filter = m => message.author.id === m.author.id;
  //         message.channel
  //           .awaitMessages(filter, {
  //             time: 60000,
  //             maxMatches: 1,
  //             errors: ["time"]
  //           })
  //           .then(() => {
  //             message.channel.send("What Step do need help with").then(() => {
  //               const filter = m => message.author.id === m.author.id;
  //               message.channel
  //                 .awaitMessages(filter, {
  //                   time: 60000,
  //                   maxMatches: 1,
  //                   errors: ["time"]
  //                 })
  //                 .then(() => {
  //                   message.channel.send("Give me a sec let me fetch the answer");
  //                 })
  //                 .catch(() => {
  //                   message.channel.send("You did not enter any input!");
  //                 });
  //             });
  //             //message.channel.send(`You've entered: ${messages.first().content}`);
  //           })
  //           .catch(() => {
  //             message.channel.send("You did not enter any input!");
  //           });
  //       });
  //   } else if (message.content.toLowerCase() == "thanks") {
  //     message.react("👍🏼");
  //   }
});

client.login(key);
