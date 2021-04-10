const { default: axios } = require("axios");


class Serches {

    constructor() {
        //Read DB
    }
    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoiYW5kcmV3YWtvc3RhIiwiYSI6ImNrbmMyamZjaTB6amoyeG9oOHd0N2xiZTQifQ.NOgpg4o9phJCoqLonketjg',
            'limit': 5,
            'language': 'es'
        }
    }
    async city(place = '') {
        //const res = await axios.get('?access_token=pk.eyJ1IjoiYW5kcmV3YWtvc3RhIiwiYSI6ImNrbmMyamZjaTB6amoyeG9oOHd0N2xiZTQifQ.NOgpg4o9phJCoqLonketjg&cachebuster=1618079405279&autocomplete=true&limit=5&language=es')
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        })
        const res = await instance.get();
        console.log(res.data);
        return true;
    }
}

module.exports = Serches;