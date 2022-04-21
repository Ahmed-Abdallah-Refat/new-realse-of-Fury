const { MessageEmbed } = require("discord.js")
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY, QUEUE_LIMIT, COLOR } = require("../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../system/fury.js");

module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Play the song and feel the music",
  async execute(client, message, args) {
    let embed = new MessageEmbed()
    .setColor(COLOR);

    //FIRST OF ALL WE WILL ADD ERROR MESSAGE AND PERMISSION MESSSAGE
    if (!args.length) {
      embed.setAuthor(` ${message.client.prefix}play <YouTube URL | Video Name>`)
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;
        
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }  
      //IF AUTHOR IS NOT IN SAME VOICE CHANNEL

        const serverQueue = message.client.queue.get(message.guild.id);
   if (serverQueue && channel !== message.guild.me.voice.channel)
        return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);

    //PERMS ERROR 
    const permissions = channel.permissionsFor(message.client.user);
if (!permissions.has("CONNECT"))
  return message.reply("Cannot connect to voice channel, missing permissions");
if (!permissions.has("SPEAK"))
  return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");
    
    const search = args.join(" ");
    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlcheck = videoPattern.test(args[0]);
    
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return     message.client.commands.get("playlist").execute(client, message, args);
}   


 const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };
    
    const voteConstruct = {
      vote: 0,
      voters: []
    }

    let songInfo = null;
    let song = null;

    if (urlcheck) {
      try {
        songInfo = await ytdl.getInfo(args[0]);
        song = {
          id: songInfo.videoDetails.video_id,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          author: songInfo.videoDetails.author.name,
	     		authorUrl: songInfo.videoDetails.author.user_url,
          duration: songInfo.videoDetails.lengthSeconds,
          thumbnailUrl: songInfo.player_response.videoDetails.thumbnail.thumbnails.pop().url,
        };
      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("THERE IS COPYRIGHT CONTENT IN VIDEO -_-")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songInfo = await ytdl.getInfo(result[0].url);
        song = {
          id: songInfo.videoDetails.video_id,
          title: songInfo.videoDetails.title,
        	author: songInfo.videoDetails.author.name,
	     		authorUrl: songInfo.videoDetails.author.user_url,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds,
          thumbnailUrl: songInfo.player_response.videoDetails.thumbnail.thumbnails.pop().url,          
        };
      } catch (error) {
        console.log(error)
        if(error.errors[0].domain === "usageLimits") {
          return message.channel.send("Your YT API limit is over and it will be restored under 24 hours")
        }
      }
    }

    if (serverQueue) {
        if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
      return message.channel.send(`You can not add songs more than ${QUEUE_LIMIT} in queue`)
    }
      serverQueue.songs.push(song);
        embed.addField(':notes: Added To Queue', `[${song.title}](${song.url})`)

      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);
      
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel
          .join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send({
            embed: {
              description: `😭 | Could not join the channel: ${error}`,
              color: "#ffffff"
            }
          })
          .catch(console.error);
      }
    }
  }
};
