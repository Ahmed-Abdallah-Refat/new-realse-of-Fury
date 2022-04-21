const { MessageEmbed } = require("discord.js")
const createBar = require("string-progressbar");
const { COLOR } = require("../config.json");

module.exports = {
  name: "nowplaying",
  aliases: ["np"], 
  description: "Get the name of current playing song",
  execute (client, message, args) {
    let embed = new MessageEmbed()
.setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setColor("RED")
      embed.setAuthor("YOU ARE NOT IN VOICE CHANNEL")
      return message.channel.send(embed);
    }
    
   
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setDescription("⏹"+"●▬▬▬▬▬▬▬▬▬▬▬▬▬▬●"+ "🔊");
      embed.setColor("RED")
      return message.channel.send(":notes:** NO MUSIC PLAYING...**", embed);
    }
    
    const song = serverQueue.songs[0];
    const seek = (serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;
    const thumb = `https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`;
    
    embed.setAuthor(`${message.author.tag}`, message.author.avatarURL())
    embed.addField('Now Playing', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
    embed.addField('YT Channel', `[${serverQueue.songs[0].author}](${serverQueue.songs[0].authorUrl})`)
    embed.addField("Duration" + "\u200b", "[`" +  new Date(seek * 1000).toISOString().substr(11, 8) + "/" + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)) + "`]", false)
    embed.setThumbnail(`${serverQueue.songs[0].thumbnailUrl}`)
    embed.setFooter(`${message.guild.name}`, message.guild.iconURL());
    
    message.channel.send(embed)
  }
}
