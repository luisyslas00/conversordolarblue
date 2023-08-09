//Elementos HTML

const formulario = document.getElementById("formulario")
const inputMonto = document.getElementById("monto")
const selectDivisa = document.getElementById("divisa")
const valorDolar = document.getElementById("valorDolar")
const montoTotal = document.getElementById("montoTotal")
const pFecha = document.getElementById("fecha")

let total= 0
let valorDolarBlue = 0
//Eventos

formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(inputMonto.value)
    console.log(selectDivisa.value)
    peticionDolar()
    total = conversor(valorDolarBlue,selectDivisa.value,inputMonto.value)
    renderizarMontoTotal(total,selectDivisa.value)
})

//Peticiones

function peticionDolar(){
    fetch('https://criptoya.com/api/dolar')
    .then(response => response.json())
    .then(data =>{
        valorDolarBlue = data["blue"]
        renderizarDolar(valorDolarBlue)
        const fechaPeticion = parseInt(data["time"] + "000")
        const fecha = new Date(fechaPeticion).toLocaleString()
        console.log(data["time"])
        pFecha.innerText = fecha
    })
}

peticionDolar()

setInterval(()=>{
    peticionDolar()
},300000)

//Funciones

function conversor(valor,conversion,monto){
    if(conversion==="1"){
        const resultado=valor*monto
        return resultado
    }else{
        const resultado=monto/valor
        return resultado
    }
}

//Pintar en DOM

function renderizarDolar(valor){
    valorDolar.innerText = valor
}

function renderizarMontoTotal(total,divisa){
    if(divisa==="1"){
        montoTotal.innerText = `${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total)} pesos`
    }else if(divisa==="2"){
        montoTotal.innerText = `${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(total)} dólares`
    }
}