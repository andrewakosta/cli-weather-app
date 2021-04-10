require('dotenv').config(); 
const { readInput, inquirerMenu, pausa, listPlacesAsMenu } = require("./helpers/inquirer");
const Serches = require("./models/searches");

const main = async()=>{
    let option;
    const Searches = new Serches();
    do {
        option = await  inquirerMenu();
        
        switch (option) {
            case 1:
                const placeToserach = await readInput("City: ");

                const places  = await Searches.city(placeToserach);
                const id = await listPlacesAsMenu(places);

                const placeSelected = places.find(place => place.id === id)
                const weather = await Searches.getWeatherByLatAndLong(placeSelected.lat, placeSelected.log);
                
               
                console.log('\n Place Imformation \n'.yellow);
                console.log(' City: '.yellow.bold + placeSelected.name);
                console.log(' Latitud: '.yellow.bold + placeSelected.lat);
                console.log(' Longitud: '.yellow.bold + placeSelected.log);
                console.log(' Temperature: '.yellow.bold + weather.temp);
                console.log(' Minima: '.yellow.bold + weather.min);
                console.log(' Maxima: '.yellow.bold + weather.max);
                console.log(' Weather status: '.yellow.bold+ weather.desc);

                break;
        
            default:
                break;
        }
        if(option !== 0 ) await pausa()
        console.clear();
        
    } while (option !== 0);
}

main()