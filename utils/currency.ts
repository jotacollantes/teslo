//* Este Script tiene el formato que exportara cada una de los metodos como una propìeda de un objeto declarada ene l archivo de barril index.ts

export const formateo=(value:number)=>{

    const formatter= new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigits:2,
        maximumFractionDigits:2

    })

    return formatter.format(value)

}