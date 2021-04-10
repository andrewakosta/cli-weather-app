const { readInput, inquirerMenu, pausa } = require("./helpers/inquirer")

const main = async()=>{
    let option;
    do {
        option = await  inquirerMenu();
        console.log(option);

        if(option !== 0 ) await pausa
        console.clear()
    } while (option !== 0);
}

main()