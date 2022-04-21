const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "talk",
  description: "say Somthing",
  execute(client, message, args) {

 if (!message.member.permissions.has("ADMINISTRATPR"))
      return message.channel.send(
        ":x: you dont have the **ADMINSTRATOR** permission"
      ); //done, they need the 'BAN_MEMBERS' permission to use the command.
    let saymessage = args.join(" "); //
    if (!saymessage) return message.channel.send("Please give a **TEXT**"); //return a message if they don't provide text.
    message.channel.send(saymessage); //send the message.
    message.delete();
  }
}
