const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');
const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
arr.reverse();
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
module.exports = {
  name: "bb",
  aliases: ["bbb", "bbbb"],
  category: "info",
  usage: "bot information",
  description: "to know everything about BOT",
  async execute(client, message, args) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${client.user.tag}`,
        `**❯ ID:** [${client.user.id}]`,
				`**❯ Commands:** ${client.commands.size}`,
				`**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
        
])
    .addField('Memory', [ 
        
        ` ${Math.round(used * 100) / 100} MB`
    ])
    
			.setTimestamp();

		message.channel.send(embed);
	
}
}

