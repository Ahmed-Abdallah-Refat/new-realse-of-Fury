const { MessageEmbed } = require("discord.js")
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY, QUEUE_LIMIT, COLOR, MAX_PLAYLIST_SIZE, PREFIX } = require("../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../system/play.js");

module.exports = {
  name: "playlist",
  cooldown: 3,
  aliases: ["pl"],
  usage: `${PREFIX}play`,
  description: "Play a playlist from youtube",
  async execute(client, message, args) {
    let embed = new MessageEmbed()
    const { PRUNING } = require("../config.json");
    
    let RE = new MessageEmbed()
    const { channel } = message.member.voice;
    RE.setColor("RED")
    RE.setAuthor("YOU ARE NOT IN VOICE CHANNEL")
    if (!channel) return message.channel.send(RE).catch(console.error);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`SORRY JUST JOIN ${message.client.user} CHANNEL`)

    if (!args.length)
      return message.reply(`${message.client.prefix}playlist [YouTube Playlist URL | Playlist Name]`)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
      return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    
    let song = null;
    let playlist = null;
    let videos = [];
    let songInfo = null;
    
    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url);
        videos = await playlist.getVideos( 20 );
      } catch (error) {
        console.error(error);
        return message.reply("Playlist not found :(").catch(console.error);
      }
    } else {
      try {const result = await youtube.searchVideos(search, 1);
        playlist = await ytdl.getInfo(result[0].url);
        song = {
          author: songInfo.videoDetails.author.name,
	        authorUrl: songInfo.videoDetails.author.user_url,
          url: songInfo.videoDetails.video_url,
                };
        const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 20, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.reply("Playlist not found :(").catch(console.error);
      }
    }

    videos.forEach((video) => {
      song = {
        id: video.id,
        title: video.title,
        url: video.url,
        duration: video.durationSeconds,
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
let embed = new MessageEmbed()
      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
      } else {
        queueConstruct.songs.push(song);
      }
    });

    let playlistEmbed = new MessageEmbed()
      .setAuthor(`PLAYLIST`, `https://cdn.glitch.com/e044e79b-7b61-4ebe-93df-3cb3b79ed768%2FYOUTUBE.png?v=1598821081244`)
      .addField(`**Name**:`,` **[${playlist.title}](${playlist.url})** `)
      .addField(`**Played by**: ${message.author.tag}`)
      .addField("Duration", "`[" + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)) + "]`", true)
      .setFooter(`Use ${PREFIX}queue/list to see the PLAYLIST Songs.`)
      .setColor(COLOR)
      .setTimestamp();
let PRU = true;
    if (!PRU) {
      playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song.title}`));
      if (playlistEmbed.description.length >= 2048)
        playlistEmbed.description =
          playlistEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit...";
    }

    message.channel.send(playlistEmbed);

    if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel
          .join();
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
