import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import styles from './ProductSlideShow.module.css'


//!Como siempre seran varias imagenes siempre se deben de definir como un arreglo
interface Props{
    images:string[]
}

export const ProductSlideShow = ({images}:Props) => {
  return (
    <Slide easing='ease' duration={7000} indicators>
        {
            images.map((image)=>{
                //const url=`/products/${image}`
                return (
                    //styles['each-slide'] se coloca como una propiedad computada ya que js no acepta el - como parte de una propiedad
                    <div className={styles.eachSlide} key={image}>
                        <div style={{
                            //backgroundImage:`url(${url})`,
                            backgroundImage:`url(${image})`,
                            backgroundSize:'cover'

                        }}>

                        </div>

                    </div>
                )
            
            })
        }

    </Slide>
  )
}
