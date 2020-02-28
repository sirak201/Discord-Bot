const avalable_msg = require("./avalable_msg");
const Discord = require("discord.js");

module.exports = message => {
  var avalableSteps = "";

  Object.keys(avalable_msg).forEach(function(key) {
    avalableSteps = `${avalableSteps},  ${key}`;
  });
  message.channel.send(`Here are avlable steps: ${avalableSteps}`);
  message.channel.send("What Step do need help with").then(() => {
    const filter = m => message.author.id === m.author.id;
    message.channel
      .awaitMessages(filter, {
        time: 60000,
        maxMatches: 1,
        errors: ["time"]
      })
      .then(collector => {
        const wantedStep = collector.first().content;
        if (!avalable_msg[wantedStep]) return;

        if (wantedStep == "description") {
          const exampleEmbed = new Discord.RichEmbed()
            .setColor("#0099ff")
            .setTitle("Some title")
            .setURL("https://discord.js.org/")
            .setAuthor(
              "Some name",
              "https://i.imgur.com/wSTFkRM.png",
              "https://discord.js.org"
            )
            .setDescription("Some description here")
            .setThumbnail("https://i.imgur.com/wSTFkRM.png")
            .addField("Regular field title", "Some value here")
            .addBlankField()
            .addField("Inline field title", "Some value here", true)
            .addField("Inline field title", "Some value here", true)
            .addField("Inline field title", "Some value here", true)
            .setImage("https://i.imgur.com/wSTFkRM.png")
            .setTimestamp()
            .setFooter(
              "Some footer text here",
              "https://i.imgur.com/wSTFkRM.png"
            );

          message.channel.send(exampleEmbed);
          return;
        }
        message.reply(`Here is an example of step ${wantedStep}`, {
          files: [avalable_msg[wantedStep]]
        });
      })
      .catch(err => {
        console.log(err);
        message.channel.send("You did not give a response");
      });
  });
};
