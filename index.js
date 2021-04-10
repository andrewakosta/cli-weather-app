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

                console.log('\n Place Imformation \n'.yellow);
                console.log(' City: ' + placeSelected.name);
                console.log(' Latitud: ' + placeSelected.lat);
                console.log(' Longitud: ' + placeSelected.log);

                break;
        
            default:
                break;
        }
        if(option !== 0 ) await pausa()
        console.clear();
        
    } while (option !== 0);
}

main()