const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   config = require("../../config.json"),
   winner = null,
   presence = {
   "false": "DΓ©sactivΓ©",
   "true": "ActivΓ©"
   },
   filter = (reaction, user) => ['π', 'π·οΈ','π΅οΈ','π','π','β'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setAuthor(`π Launch a giveaway on ${message.guild.name}`)
   .setColor(db.color)
   .setDescription(`\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`)
   .addField(`\`π\`  Time`, ms(db.giveaway.duree), true)
   .addField(`\`π·οΈ\`  Channel`, `<#${db.giveaway.channel}>`, true)
   .addField(`\`π΅οΈ\` Imposed winner`, `${db.giveaway.gagnant}`, true)
   .addField(`\`π\` Voice Presence`, `${presence[db.giveaway.voice]}`, true)
   .addField(`\`π\` Gain`, `${db.giveaway.gain}`, true)
   .setFooter(`kodb`)
    message.channel.send(msgembed)
    .then(async m => {
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
    if (r.emoji.name === 'π') {
        message.channel.send(`\`${getNow().time}\` π Please enter a value for the time.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var msg = cld.first();
            if(!msg.content.endsWith("d") && !msg.content.endsWith("h") && !msg.content.endsWith("m")) return message.channel.send(`\`${getNow().time}\` π Temps incorrect.`)
            db.giveaway.duree = ms(msg.content)
            message.channel.send(`\`${getNow().time}\` π You changed the time of the next giveaway to **${ms(db.giveaway.duree)}**`)
            m.edit({ embed: { author: { name: `π Launch a giveaway on ${message.guild.name}`}, color: db.color, description: `\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`, fields: [ {name: `\`π\`  Time`, value: ms(db.giveaway.duree), inline: true }, { name: `\`π·οΈ\`  Channel`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`π΅οΈ\` Imposed winner`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`π\` Voice presence`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`π\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
            update(message, db)
        });
        })
    // --
    } else if(r.emoji.name === 'π·οΈ') {
        message.channel.send(`\`${getNow().time}\` π·οΈ Please enter the channel ID.`).then(mp => {
        mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
        .then(cld => {
        var msg = cld.first();
        var channel = message.guild.channels.cache.get(msg.content)
        if(!channel) return  message.channel.send(`\`${getNow().time}\` π·οΈ Incorrect channel.`)
        db.giveaway.channel = channel.id
        message.channel.send(`\`${getNow().time}\` π·οΈ You have changed the channel of the next giveaway to \`${channel.name}\``)
        m.edit({ embed: { author: { name: `π Launch a giveaway on ${message.guild.name}`}, color: db.color, description: `\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`, fields: [ {name: `\`π\`  Time`, value: ms(db.giveaway.duree), inline: true }, { name: `\`π·οΈ\`  Channel`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`π΅οΈ\` Imposed winner`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`π\` Voice presence`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`π\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });   
        update(message, db)
        });
        });
    } else if(r.emoji.name === 'π΅οΈ') {
        message.channel.send(`\`${getNow().time}\` π΅οΈ Please enter the user id. (or write \`false\` to disable it)`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
                var msg = cld.first();
                if(msg.content === "false") {
                    db.giveaway.gagnant = false
                    message.channel.send(`\`${getNow().time}\` π΅οΈ You have deactivated the predefined winners`)
                    m.edit({ embed: { author: { name: `π Launch a giveaway on ${message.guild.name}`}, color: db.color, description: `\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`, fields: [ {name: `\`π\`  Time`, value: ms(db.giveaway.duree), inline: true }, { name: `\`π·οΈ\`  Channel`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`π΅οΈ\` Imposed winner`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`π\` Voice presence`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`π\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });     
                    update(message, db)
                } else {
                var users = message.guild.members.cache.get(msg.content)
                if(!users)  return  message.channel.send(`\`${getNow().time}\` π΅οΈ Incorrect User.`)
                db.giveaway.gagnant = users.id
                message.channel.send(`\`${getNow().time}\` π΅οΈ You have changed the predefined winner to \`${users.user.username}\``)
                m.edit({ embed: { author: { name: `π Launch a giveaway on ${message.guild.name}`}, color: db.color, description: `\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`, fields: [ {name: `\`π\`  Time`, value: ms(db.giveaway.duree), inline: true }, { name: `\`π·οΈ\`  Channel`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`π΅οΈ\` Imposed winner`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`π\` Voice presence`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`π\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });         
                update(message, db)
                }
            });
        });
    } else if(r.emoji.name === 'π') {
        message.channel.send(`\`${getNow().time}\` :x: **Options temporarily disabled.**`)
    } else if(r.emoji.name === 'π') {
        message.channel.send(`\`${getNow().time}\` π Please write what you would like to give.`).then(mp => {
            mp.channel.awaitMessages(dureefiltrer, { max: 1, time: 30000, errors: ['time'] })
            .then(cld => {
            var msg = cld.first();
            db.giveaway.gain = msg.content
            message.channel.send(`\`${getNow().time}\` π The next giveaway the prize to be won will be \`${db.giveaway.gain}\`.`)
            m.edit({ embed: { author: { name: `π Launch a giveaway on ${message.guild.name}`}, color: db.color, description: `\`π\` Change the duration \n \`π·οΈ\` Edit Channel \n \`π΅οΈ\` Define an imposed winner \n \`π\` Change the requirement to be vocal \n \`π\` Modifier le gain \n \`β\` Start the giveaway \n \n > Actual Configuration:`, fields: [ {name: `\`π\`  Time`, value: ms(db.giveaway.duree), inline: true }, { name: `\`π·οΈ\`  Channel`, value: `<#${db.giveaway.channel}>`, inline: true}, { name: `\`π΅οΈ\` Imposed winner`, value: `${db.giveaway.gagnant}`, inline: true }, { name: `\`π\` Voice presence`, value: `${presence[db.giveaway.voice]}`, inline: true }, { name: `\`π\` Gain`, value: `${db.giveaway.gain}`, inline: true }   ] } });        
            update(message, db)
            });
        });
    } else if(r.emoji.name === 'β') {
        var channel = message.guild.channels.cache.get(db.giveaway.channel)
        if(!channel) return message.channel.send(`\`${getNow().time}\` :x: **Erreur rencontrΓ©e**: please redefine the giveaway channel.`)
        message.channel.send(`\`${getNow().time}\` β Giveaway launched in ${channel}.`)
    
       var timestamp = Date.now() + db.giveaway.duree
        var embed = new MessageEmbed()
        .setTitle(db.giveaway.gain)
        .setDescription(`React with :tada: to participate!
        Giveaway Time: **${ms(db.giveaway.duree)}**
        Launched by: ${message.author}`)
        .setColor(3553599)
        .setFooter(`End of the giveaway at`)
        .setTimestamp(timestamp)
        .setFooter(`kodb`)
        var msg = await channel.send(embed)
        msg.react("π")
    
        setTimeout(() => {
            db.giveaway.last = msg.id
            update(message, db)
        if (msg.reactions.cache.get("π").count <= 1) {
            message.channel(`\`${getNow().time}\` :x: **Erreur rencontrΓ©e**: no winner`)
        }
        if(db.giveaway.gagnant !== false) {
            winner = message.guild.members.cache.get(db.giveaway.gagnant)
            if(!winner) return winner = msg.reactions.cache.get("π").users.cache.filter((u) => !u.bot).random();
        } else if(db.giveaway.voice === true) {
            winner = msg.reactions.cache.get("π").users.cache.filter((u) => !u.voice).random()
        } else {
            winner = msg.reactions.cache.get("π").users.cache.filter((u) => !u.bot).random()
        }
        var embed = new MessageEmbed()
        .setTitle(db.giveaway.gain)
        .setDescription(`
        Winner: ${winner}
        Launched by: ${message.author}`)
        .setColor(3553599)
        .setFooter(`End of the giveaway at`)
        .setFooter(`kodb`)
        .setTimestamp(Date.now())
        msg.edit(embed)
        channel.send(`Congrulation, <@${winner.id}> you have win the **${db.giveaway.gain}**`)
        }, db.giveaway.duree);
    }

});
    await m.react("π")
    await m.react("π·οΈ")
    await m.react("π΅οΈ")
    await m.react("π")
    await m.react("π")
    await m.react("β")
})

};


module.exports.help = {
    name: "giveaway",
    aliases: ['gstart','giveawaystart'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration des giveaways.",
  };