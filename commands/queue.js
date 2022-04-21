const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");

module.exports = {
  name: "queue",
  aliases: ["list", "q", "qu"],
  usage: `${PREFIX}queue`,
  description: "Get all the song name which are in queue",
  execute: (client, message, args) => {
    let embed = new MessageEmbed().setColor(COLOR);
    
    let RE = new MessageEmbed()
    const { channel } = message.member.voice;
    if (!channel) {
      RE.setColor("RED")
      RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(RE);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      RE.setColor("RED")
      RE.setAuthor("NOTHING IN THE QUEUE/LIST");
      return message.channel.send(RE);
    }

    embed.setDescription(
      `${serverQueue.songs
          .map((song, index) => index  + 1 + ": " + `**[${song.title}](${song.url})**`)      
        .join("\n\n")}`,
      { split: true }
    );
  
    message.channel.send(embed);
  }
};
