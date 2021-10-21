// ** IMPORTS ** //

// ** Main Code ** //

export default {
    name: "",
    execute: async (oldM, newM, client) => {
        const sales = client.db.get("sales");
        const sorted = Object.entries(sales).sort((a, b) => a[1].sales - b[1].sales).reverse();
        const current = sorted.filter(d => d[0] === newM.user.id).map(d => d[1]?.sales);

        if(newM.roles.cache.find(r => r.id === "892747262730579969") && !current.length) return client.db.set(`sales.${newM.user.id}.sales`, 0)
        
        if(!newM.roles.cache.find(r => r.id === "892747262730579969") && current.length) return client.db.delete(`sales.${newM.user.id}`);
    }
}