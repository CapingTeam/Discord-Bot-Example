const { isBuffer } = require("util");

const fs = require("fs"),
ms = require("ms"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = async (client, message, args) => { 
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
    logsmod = message.guild.channels.cache.find(c => c.id === db.mods.logs);
    var user = message.mentions.members.first()

if (!message.member.roles.cache.some(role => role.id === db.mods.ban)) return;


if(args[0]) {
    var user = await client.users.fetch(args[0])
    console.log(user)
    if(!user) return message.channel.send(`:x: ${message.author}, user not found, try the username or ID.`)
    ban = message.guild.fetchBan(user.id)
    if (ban) {
        message.channel.send(`\`${getNow().time}\` :white_check_mark: ${message.author}, you have unbanned **${user.username}**#${user.discriminator}.`);
        message.guild.members.unban(user.id)
        if(logsmod) logsmod.send({embed:{ description: `**${message.author.username}**#${message.author.discriminator} have unbanned **${user.username}**#${user.discriminator} in the channel [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id}) `, color: 3553599, author: { name: "✍️ Members Unban" }, footer: { text: `🕙 ${getNow().time}` } }}) 
    } else {
        message.channel.send(`:x: ${message.author}, user is not banned.`)
        }
    }

};


module.exports.help = {
name: "unban",
aliases: ['ub','pardon'],
category: 'moderation',
description: "Débannir une personne",
 };
