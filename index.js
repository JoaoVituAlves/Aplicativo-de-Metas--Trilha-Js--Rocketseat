const {select,input,checkbox } = require ('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas 

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


const cadastrarMeta = async () => {
    const meta = await input ({ message: "digite a meta:"})
    if(meta.length == 0){
        mensagem = 'a meta nao pode ser vazia'
        return

    }
    metas.push({
        value: meta, checked:false})

    mensagem = " Meta cadastrada com sucesso"
}

const listarMetas = async () => {
    if(metas.length == 0 ){
        mensagem = "Nao existem metas"
        return 
    }




    const respostas = await checkbox({
    message:"use as setas para mudar de meta, use o espaço para maracar ou desmarcar e o enter para finalizar a etapa",
    choices:[...metas], 
    instructions: false,
    }) 
    
    metas.forEach((m) => {
        m.checked = false
    
    })
    
    if(respostas.length==0){
        mensagem = "nenhuma meta selecionada"
        return
    }



    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    mensagem = 'meta concluida(s)'
}

const metasRealizadas = async () => { 
    
    if(metas.length == 0 ){
    mensagem = "Nao existem metas"
    return 
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })


   if(realizadas.length ==0){
    mensagem = "Nao existem metas realizadas"
    return
    }

    await select ({
        message: "Metas realizadas" + realizadas.length,
        choices:[...realizadas]
    })

}

const metasAbertas = async () => {
    if(metas.length == 0 ){
        mensagem = "Nao existem metas"
        return 
        }
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })


   if(abertas.length ==0){
    mensagem = "Nao existem metas abertas"
    return
    }

    await select ({
        message: "Metas abertas"+ abertas.length,
        choices:[...abertas]
    })

}

const deletarMetas = async () => {

    if(metas.length == 0 ){
        mensagem = "Nao existem metas"
        return 
        }
        
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itensDeletar = await checkbox({
    message:"use as setas para mudar de meta, use o espaço para maracar ou desmarcar e o enter para finalizar a etapa",
    choices:[...metasDesmarcadas], 
    instructions: false,
    })
    
    if(itensDeletar.length ==0){
        mensagem = "Nenhum item a deletar"
        return
    }

    itensDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value !=item
        })
    })
    mensagem = "Meta(s) deletada(s) com sucesso"
}
const mostrarMensagem = () =>{
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
        
    }
}
const start = async () => {
    await carregarMetas()
    while (true){
        mostrarMensagem()
        await salvarMetas()
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
                name:"deletar metas ",
                value:"deletar"
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
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("ate a proxima")
                return
        }
    }
}

start ();