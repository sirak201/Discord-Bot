module.exports = {
  name: "s2",
  description: "Ping!",
  execute(message) {
    message.channel
      .send("Do you need help with MSG , Ostric , or Project")
      .then(() => {
        const filter = m => message.author.id === m.author.id;
        message.channel
          .awaitMessages(filter, {
            time: 60000,
            maxMatches: 1,
            errors: ["time"]
          })
          .then(collector => {
            if (collector.first().content === "MSG") {
              require("../projects/msg")(message);
            }
          })
          .catch(err => {
            console.log(err);
            message.channel.send("Something went wrong please try again");
          });
      });
  }
};
