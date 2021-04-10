const inquirer = require('inquirer');
require('colors');


const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'Que deseas hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Search city`,
            },
            {
                value: 2,
                name: `${'2'.green}. History`,
            },
            {
                value: 0,
                name: `${'0'.green}. Exit`,
            }
        ],
    }
]

exports.inquirerMenu = async () => {
    console.log('=======================================  '.green);
    console.log('             Make your choice            '.white)
    console.log('=======================================\n'.green);

    const { option } = await inquirer.prompt(menuOpt);
    return option
}

exports.pausa = async () => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green}`
    }];
    await inquirer.prompt(question);
}

exports.readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value'
                }
                return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question);
    return desc;
}

exports.listTaskAsMenu = async (tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });
    choices.unshift({
        value:'0',
        name:'0. '.green + 'Cancel'
    })
    const questions = [
        { 
            type:'list',
            name:'id',
            message:'Remove task',
            choices
        }
    ]
    const {id} = await inquirer.prompt(questions)
    return id;
}

exports.confirm  = async(message ='')=>{
    const question = [{
        type:'confirm', 
        name:'ok',
        message
    }]

    const {ok} =  await inquirer.prompt(question);
    return ok;
}

exports.showTasksAsCheckbox = async (tasks =[]) =>{
    const choices = tasks.map((task, index)=>{
        return {
            value: task.id,
            name: task.desc,
            checked: task.doneOn ? true : false
        }
    })
     const question = [
         {
             type:'checkbox',
             name:'ids',
             message: 'Mark as done', 
             choices
         }
     ]

     const {ids} = await inquirer.prompt(question);
     return ids;
}