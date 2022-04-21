const ytdlDiscord = require("erit-ytdl");
const scdl = require("soundcloud-downloader");
const { canModifyQueue } = require("../system/mod.js");
const { MessageEmbed } = require("discord.js")
let embed = new MessageEmbed()

module.exports = {
  async play(song, message) {
    const { PRUNING, SOUNDCLOUD_CLIENT_ID, COLOR } = require("../config.json");
    const queue = message.client.queue.get(message.guild.id);
    
    if (!song) {
      queue.channel.join();
     return message.client.queue.delete(message.guild.id);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

    try {
      if (song.url.includes("youtube.com")) {
        stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
      } else if (song.url.includes("soundcloud.com")) {
        try {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined);
        } catch (error) {
          stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined);
          streamType = "unknown";
        }
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return message.channel.send(`Error: ${error.message ? error.message : error}`);
    }

    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

    const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    const thumb = `https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`;
    let requestedBy = `\`${message.client.users.cache.get(message.author.id).username}\``
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    try {
      embed.setAuthor(`Playing`);
      embed.setDescription(`[${song.title}](${song.url}) - **${requestedBy}**`);
      embed.setThumbnail(`${song.thumbnailUrl}`)
      embed.setColor(COLOR)
    
      var playingMessage = await queue.textChannel.send(embed);
      await playingMessage.react("⏭");
      await playingMessage.react("⏯");
      await playingMessage.react("🔁");
      await playingMessage.react("⏹");
      await playingMessage.react("➕");
      await playingMessage.react("➖");
      await playingMessage.react("🔇");
    } catch (error) {
      console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!queue) return;
      const member = message.guild.member(user);

      switch (reaction.emoji.name) {
        case "⏭":
          queue.playing = true;
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.connection.dispatcher.end();
          collector.stop();
          break;

        case "⏯":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.playing) {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.pause(true);
          } else {
            queue.playing = !queue.playing;
            queue.connection.dispatcher.resume();
          }
          break;

        case "🔁":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.loop = !queue.loop;
          break;

        case "⏹":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          queue.songs = [];
          try {
            queue.connection.dispatcher.end();
          } catch (error) {
            console.error(error);
            queue.connection.disconnect();
          }
          collector.stop();
          break;

       case "➕":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume + 10 >= 1000) queue.volume = 100;
          else queue.volume = queue.volume+10
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          break;
          
       case "➖":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if (queue.volume - 10 <= 0) queue.volume = 0;
          else queue.volume = queue.volume-10
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
          break;
        
      case "🔇":
          reaction.users.remove(user).catch(console.error);
          if (!canModifyQueue(member)) return;
          if(queue.volume > 0) {
          queue.volume = 0
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
              } else {
          queue.volume = 100
          queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
              }
          break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });

    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (PRUNING && playingMessage && !playingMessage.deleted) {
        playingMessage.delete({ timeout: 3000 }).catch(console.error);
      }
    });
  }
};
