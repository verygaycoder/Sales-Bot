// ** IMPORTS ** //

import { MessageEmbed } from 'discord.js';

// ** Main Code ** //

export default {
    name: "",
    description: "Removes a specified amount of sales from yourself or another member",
    usage: "<member> <amount>",
    aliases: ["rs"],
    permissions: ["ADMINISTRATOR"],
    guildOnly: true,
    ownerOnly: false,
    botOwnerOnly: false,
    execute: async (message, args, client) => {

        let embed;
        const user = message.mentions.users.first() || await message.guild.members.cache.find(m => m.id === args[0])?.user;

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('That isn\'t a member!')
        .setDescription("Try tagging the member or using their ID")
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(!user) return message.reply({embeds: [embed]});

        const sales = client.db.get("sales");
        const sorted = Object.entries(sales).sort((a, b) => a[1].sales - b[1].sales).reverse();
        const current = sorted.filter(d => d[0] === user.id).map(d => d[1].sales);
        const increment = args[1];

        embed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('That number is too small!')
        .setDescription("Members can't have negative sales")
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        if(parseInt(increment) < 0 ||  (parseInt(current) - parseInt(increment)) < 0 || isNaN((parseInt(current) - parseInt(increment)))) return message.reply({embeds: [embed]});

        client.db.set(`sales.${user.id}.sales`, parseInt(current) - parseInt(increment));

        embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle('Sales Increased!')
        .setDescription(`I've decreased ${user.username}'s sales by \`${increment}\`. They now have \`£${parseInt(current) - parseInt(increment)}\``)
        .setFooter(client.user.tag, client.user.avatarURL())
        .setTimestamp();

        message.reply({embeds: [embed]});

    }
}