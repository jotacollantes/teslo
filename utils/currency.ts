export const formateo=(value:number)=>{

    const formatter= new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        minimumFractionDigits:2,
        maximumFractionDigits:2

    })

    return formatter.format(value)

}