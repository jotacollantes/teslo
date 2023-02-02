import Swal from "sweetalert2"

export const confirmacion=(title:string)=>{
    Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
}

export const alerta=(title:string,text:string)=>{
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    //footer: '<a href="">Why do I have this issue?</a>'
  })
}