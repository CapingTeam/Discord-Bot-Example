const fs = require("fs");
// -- Exporte les modules 
module.exports = async (client, guild) => {
let str_content = { 
    prefix: '.',
    color: "#af02ff",
    giveaway: {
        duree: "360000",
        channel: "743523912238760019",
        gagnant: false,
        voice: false,
        gain: "Nitro Classic",
        last: "704833402515488880"
    },
    statut: {
        role: "743523912238760019",
        state: "discord.gg/exemple",
        module: false
    },
    tempo: {
        category: "743523912238760019",
        channel: "704833402515488880",
        emoji: "🕙",
        module: false
    },
    logs: {
        serveur: false,
        vocal: false,
        role: false,
        message: false
    },
    membercounter: {
        guild: "555",
        total: "555",
        totalformat: "👥 Members: <count>",
        online: "555",
        onlineformat: "✅ Online: <count>",
        vocal: "555",
        vocalformat: "🎧 In Voice: <count>",
    },
    autorole: {
        role: "755705834842882089",
        module: false
    },
    mods: {
        logs: "755705834842882089",
        mute: "755705834842882089",
        muted: "755705834842882089",
        ban: "755705834842882089"
    }
};
let str_data = JSON.stringify(str_content);
// --


console.log(`[ New Guild ]`.green , " => ", `Guild: ${guild.name}`.cyan)

fs.readFile(`./serveur/${guild.id}.json`, async (err, data) => {
        if (err) await fs.writeFileSync(`./serveur/${guild.id}.json`, str_data);
});

};
