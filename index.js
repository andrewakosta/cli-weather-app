const { readInput } = require("./helpers/inquirer")

const main = async()=>{
    const value = await readInput("Enter any value");
    console.log(value);
}

main()