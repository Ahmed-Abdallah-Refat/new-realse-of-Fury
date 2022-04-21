const { MessageEmbed } = require("discord.js");
const { COLOR, PREFIX } = require("../config.json");

module.exports = {
  name: "shuffle",
  aliases: ["sh"],
  usage: `${PREFIX}shuffle`,
  description: "Shuffle your queue",
  execute(client, message, args) {
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
      RE.setAuthor("NOTHING PLAYING IN QUEUE TO SHUFFLE");
      return message.channel.send(RE);
    }

    
    shuffleQueue(serverQueue)
    let title = [];

    serverQueue.songs.slice(0, 10).forEach(obj => {
      title.push(obj.title)
      
    });
    
    
    var num = 10;
    
    if(title.length < 10) num = title.length;
    embed.setTitle("NEW QUEUE")
    embed.setDescription(`This is a new shuffled queue`)
  var i;
    for(i = 0; i < num; i++) {
      embed.addField(`SONG ${i + 1}`, title[i])
    }
    message.channel.send(embed)
  }
}; //NOT WORKING FOR NOW


function shuffleQueue(queue) {
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
}
