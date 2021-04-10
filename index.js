require('dotenv').config(); 
const { readInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Serches = require("./models/searches");

const main = async()=>{
    let option;
    const Searches = new Serches();
    do {
        option = await  inquirerMenu();
        
        switch (option) {
            case 1:
                const place = await readInput("City: ");
                const places  = await Searches.city(place);
                console.log(places);

                break;
        
            default:
                break;
        }
        if(option !== 0 ) await pausa()
        console.clear();
        
    } while (option !== 0);
}

main()