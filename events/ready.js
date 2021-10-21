// ** IMPORTS ** //

// ** Main Code ** //

export default {
    name: "",
    execute: async (client) => {
        console.log(`[Client] Logged in as ${client.user.tag}`)

        // ** Leaderboard System ** //

        const sales = client.db.get('sales');

        if(!sales) {
            client.db.set('sales', {});
            client.guilds.cache.forEach(guild => guild.members.cache.forEach(m => { if(m.roles.cache.find(r => r.id === "892747262730579969") || m.roles.cache.find(r => r.id === "893219697623957564")) client.db.set(`sales.${m.user.id}.sales`, 0)}))
        }

    }
}