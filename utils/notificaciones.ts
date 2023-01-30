import Swal from "sweetalert2"

export const confirmacion=()=>{
    Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: 'Cliente Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
}

export const alerta=()=>{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    //footer: '<a href="">Why do I have this issue?</a>'
  })
}