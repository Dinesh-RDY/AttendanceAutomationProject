const { default: axios } = require("axios")

function getData() {
    return new Promise((resolve, reject) => {
        console.log('1');
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=5').then(res => console.log(1, res.data))
        console.log('2');
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=10').then(res => console.log(2, res.data))
        console.log('3');
        resolve();
    })
}

async function getData1() {
    await getData();
}

getData1();