// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "",
    description: "Shows the sales leaderboard or the sales of a specific user",
    usage: "{member || member ID}",
    aliases: ["s"],
    permissions: [],
    guildOnly: true,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        let embed;
        const user = message.mentions.users.first() || await message.guild.members.cache.find(m => m.id === args[0])?.user;
        const sales = client.db.get("sales");
        const sorted = Object.entries(sales).sort((a, b) => a[1].sales - b[1].sales).reverse();
        let i = 0;

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Current Sales Leaderboard')
        .setDescription(`\`\`\`${sorted.map(d => {
            i++;
            return `${i}) ${message.guild.members.cache.find(m => m.user.id === d[0]).user.username}: £${d[1].sales}`
        }).join('\n')}\`\`\``)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!user) return message.reply({embeds: [embed]});

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle(`Current Sales for ${user.username}`)
        .setDescription(`\`They have made £${sorted.filter(d => d[0] === user.id).map(d => d[1].sales)} via sales!\``)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        return message.reply({embeds: [embed]})


    }
}