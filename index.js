const {select } = require ('@inquirer/prompts')

const start = async () => {
    
    while (true){
     
        const opcao = await select ({
            message: "Menu > ",
            choices: [{
                name:"cadastrar meta",
                value:"cadastrar"
            },
            {
                name:"listar meta",
                value:"listar"
            },
            {
                name: "sair",
                value:"sair"
            }
        
        ]
        })

        switch(opcao){
            case "cadastrar":
                console.log("Vamos cadastrar")
                break
            case "listar":
                console.log("Vamos listar")
                break 
            case "sair":
                console.log("ate a proxima")
                return
        }
    }
}

start ();