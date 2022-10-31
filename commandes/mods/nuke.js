const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };


module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.clone({reason: `Purge claimed by ${message.author.tag} (${message.author.id})`}).then(c => c.setPosition(message.channel.position) && c.send(`:boom:The purge claimed by ${message.author} has been done.`))
    message.channel.delete() 

    };
    
module.exports.help = {
    name: "nuke",
    aliases: ['duplicate','boom'],
    category: 'Gestion de serveur',
    description: "- Duplique le salon et supprime l'ancien",
  };