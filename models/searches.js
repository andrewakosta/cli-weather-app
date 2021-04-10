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
    get weatherAPIParams(){
        return {
            'appid':process.env.OPEN_WEATHER,
            'units':'metric',
            'lang':'en'
        }

    }
    async getWeatherByLatAndLong(lat, lon){
        try {
            const instance = axios.create({
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params:{...this.weatherAPIParams, lat, lon}
            })
            const res = await instance.get();
            const {weather, main} = res.data

            return {
                desc:weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp
            }
        } catch (error) {
            console.log(error.toString());
        }
    }
}

module.exports = Serches;