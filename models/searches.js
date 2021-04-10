const { default: axios } = require("axios");


class Serches {

    constructor() {
        //Read DB
    }
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    async city(place = '') {

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: this.paramsMapbox
        })
        const res = await instance.get();
        return res.data.features.map(place => ({
            id: place.id,
            name: place.place_name,
            log: place.center[0],
            lat: place.center[1]
        }))
    }
}

module.exports = Serches;