const fs = require('fs')
const { default: axios } = require("axios");


class Serches {

    constructor() {
        this.history = [];
        this.DB_PATH = './db/database.json';
        this.readDB();
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
    addHistory(place = ''){
        if(this.history.includes(place.toLowerCase())) return;

        this.history = this.history.splice(0,5);
        this.history.unshift(place.toLowerCase())
        this.saveDB()
    }
    saveDB(){
        const payload ={
            history:this.history, 
        }

        fs.writeFileSync(this.DB_PATH, JSON.stringify(payload))
        
    }
    readDB(){
        if(!fs.existsSync(this.DB_PATH))return;
        const data = JSON.parse(fs.readFileSync(this.DB_PATH, {encoding:'utf-8'}));
        this.history = data
    }
}

module.exports = Serches;