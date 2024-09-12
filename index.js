const {select,input,checkbox } = require ('@inquirer/prompts')

let meta = {
    value:'Tomar 3l agua por dia',
    checked: false,
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input ({ message: "digite a meta:"})
    if(meta.length == 0){
        console.log('a meta nao pode ser vazia')
        return

    }
    metas.push({value: meta, checked:false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
    message:"use as setas para mudar de meta, use o espaço para maracar ou desmarcar e o enter para finalizar a etapa",
    choices:[...metas], 
    instructions: false,
    }) 
    
    metas.forEach((m) => {
        m.checked = false
    
    })
    
    if(respostas.length==0){
        console.log("nenhuma meta selecionada")
        return
    }



    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log('meta concluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })


   if(realizadas.length ==0){
    console.log("Nao existem metas realizadas")
    return
    }

    await select ({
        message: "Metas realizadas" + realizadas.length,
        choices:[...realizadas]
    })

}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })


   if(abertas.length ==0){
    console.log("Nao existem metas abertas")
    return
    }

    await select ({
        message: "Metas abertas"+ abertas.length,
        choices:[...abertas]
    })

}

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
                name:"Metas Realizadas ",
                value:"realizadas"
            },
            {
                name:"Metas abertas ",
                value:"abertas"
            },
            {
                name: "sair",
                value:"sair"
            }
        
        ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break

            case "listar":
                await listarMetas()
                break 
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log("ate a proxima")
                return
        }
    }
}

start ();