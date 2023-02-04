import React, { ChangeEvent,useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IProduct } from '../../../interfaces';
import { CleaningServices, DriveFileRenameOutline, FolderOff, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { alerta, confirmacion } from '../../../utils/notificaciones';
import { tesloApi } from '../../../api/tesloApi';
import { Product } from '../../../models';
import { useRouter } from 'next/router';
import { isJsxClosingFragment } from 'typescript';
import { DataMessage } from '../../api/admin/upload';



const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']



//!INterfaz que define como va a lucir el formulario
//!Tanto la propiedad product con la interfaz IProduct y el el objeto formData con la interfaz FormData dato aunque no tienen la misma interfaz tienen que tener el mismo look
interface FormData {
    _id?:string,
    description: string,
    images: string[],
    inStock: number,
    price: number,
    sizes: string[],
    slug: string,
    tags: string[],
    title: string,
    type: string,
    gender: string,
    //*TODO: Agregar createdAt y updatedAt
    createdAt:string,
    updatedAt:string,
}

interface Props {
    product: IProduct;
}

const ProductAdminPage= ({ product }:Props) => {
   console.log(product)
   //*State para manejar los tags.
    const [newTagValue, setNewTagValue] = useState('')
    //*State para evitar el doble posteo
    const [isSaving, setIsSaving] = useState(false)
    //React hook form
    const {register,handleSubmit,formState:{errors},getValues,setValue,watch}= useForm<FormData>({defaultValues:product})//!Le asigno los valores que se mostraran en el formulario a cargar
    const fileInputRef=useRef<HTMLInputElement>(null)
    const router=useRouter()
    useEffect(() => {
        //!el watch crea un observable que se queda ejecutando aun si se se cambia de pagina. si se vuelve a la pagina habrá 2 observable por eso es que cuando se cambia de pagina o se desmonta el componente hay que eliminar el watch actual

        //*el observable se crea asignando el watch a subscription que es del tipo Subscription

      const subscription=watch((value,{name,type})=>{
            //console.log({value,name,type})
            if (name==="title"){
                const slugSugerido=value.title?.trim()
                                               .replaceAll(" ","_")
                                               .replaceAll("'","")
                                               .toLowerCase() 
                setValue('slug',slugSugerido!)   

            }
      })
    
      //* Hay que limpiar el watch actual
      return () => {
        subscription.unsubscribe()
      }
    }, [watch,setValue])
    


    const onNewTag = ()=>{
    
        const newTag= newTagValue.trim().toLocaleLowerCase()
        //!Para dejar vacio el input del tag
        setNewTagValue('')
        //!Actualizamos los tags
        const currentTags=getValues('tags')
        //!Valido si esta incluyendo el mismo tag salimos de la funcion
        if (currentTags.includes(newTag)){
            return;
        }
        //!Añadimos a currentags que es un arreglo el nuevo tag
        currentTags.push(newTag)
        //! como currentTags hace referencia a getValues no es necesario hacer el setValues()
        setValue('tags',currentTags,{shouldValidate:true})
        

    }

    const onDeleteTag = ( tag: string ) => {
        const deletedTags=getValues('tags').filter((t)=>t !==tag)
        setValue('tags',deletedTags,{shouldValidate:true})
    }
const onChangeSize=(size:string)=>{
        const currentSize=getValues('sizes') //a devolver un array de sizes

        //! Si incluye el size enviado como parametro a la funcion en el on change en currentSize es por que lo quiere eliminar.
        if (currentSize.includes(size))
        {
            return setValue('sizes',currentSize.filter( s => s!==size),{shouldValidate:true})
        }
        //* en este punto es para añadirlo, propago y le sumo la nueva size entre llaves por que es un arreglo [...currentSize,size]

        setValue('sizes',[...currentSize,size],{shouldValidate:true})
        

    }

    const onfilesSelected=async({target}:ChangeEvent<HTMLInputElement>)=>{
        if (!target.files || target.files.length ===0)
        {
            return;
        }
        //console.log(target.files)
        try {
         for (const file of target.files)
         {
            //FormData es un objeto de JavaScript que se tiene que crear por cada iteracion
            const formData= new FormData()
            //Añadimos la propiedad file al objeto formData
            formData.append('file',file)
            //console.log(file)
            const {data}= await tesloApi.post<DataMessage>('/admin/upload',formData)
            console.log('Data: ',data.message)
            setValue('images',[...getValues('images'),data.message],{shouldValidate:true})
         }
        }
        catch (error){

        }
        
     //console.log(getValues('images'))
    
    }
    //*Solo se elimina del frontend
    const onDeleteImage=(img:string)=>{
        const tempImages = getValues('images').filter(image=>image!==img)
        setValue('images',[...tempImages],{shouldValidate:true})

    }
    const onSubmitForm=async (formData:FormData)=>{
        
            console.log({formData})
            //!Primero validamos si hay al menos 2 imagenes.
            if (formData.images.length < 2)
            {
                alerta("Error al actualizar el producto","Al menos debe de tener 2 imagenes")
                return;
            }
            //!Para evitar el doble posteo
            setIsSaving(true)
            try {
                const {data}=await tesloApi(
                    {
                    url:'/admin/products',
                    //* SI tenemos un _id es una actualizacion y usamos el PUT
                    method: formData._id ? 'PUT': 'POST',
                    
                    data:formData
                   })
                console.log(data)
                
                
                
                //!SI el id no existe en el formData es porque es un producto nuevo
                if(!formData._id)
                {
                    //Todo Regargar el navegador
                    confirmacion("Producto creado  con exito")
                    router.replace(`/admin/products/${formData.slug}`)
                } 
                else {
                    setIsSaving(false)
                }
                confirmacion("Producto actualizado con exito")
                //setIsSaving(false)

            } catch (error) {
                setIsSaving(false)
                console.log(error)
            }


    }

    
    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editando: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit( (formData)=>
                {
                    //! formData tiene los datos en los campos del formulario
                    return onSubmitForm(formData)
                })}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth
                            multiline
                            rows={10}
                            
                            sx={{ mb: 1 }}
                            { ...register('description', {
                                required: 'Este campo es requerido'
                               
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Minimo valor 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            //fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Minimo valor 0' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('type') }
                                onChange={ (event)=>{
                                    //!Para que se haga el re-render debemos de especificar el argumento {shouldValidate:true}
                                    setValue('type',event.target.value,{shouldValidate:true})
                                } }
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('gender') } 
                                onChange={ (event)=>{
                                    //!Para que se haga el re-render debemos de especificar el argumento {shouldValidate:true}
                                    setValue('gender',event.target.value,{shouldValidate:true})
                                } }
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel
                                    key={size}
                                    control={<Checkbox checked={getValues('sizes').includes(size)}/>}
                                    label={ size }
                                    onChange={()=>{onChangeSize(size)}}
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug',
                                {
                                required: 'Este campo es requerido',
                                validate: (val)=>{
                                    return val.trim().includes(' ') ? 'No puede tener espacios en blanco': undefined
                                    }
                                
                                })
                            }
                            
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            //!Primero debo de ingresar los datos del input al estado
                            value={newTagValue}
                            onChange={(event)=> setNewTagValue(event.target.value)}
                            onKeyUp={(value)=>{
                                value.code==='Space' ? onNewTag() : undefined
                            }
                                
                                
                            }
                            
                            
                            
                            helperText="Presiona [spacebar] o [enter] para agregar"
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={()=>fileInputRef.current?.click()}
                            >
                                Cargar imagen
                            </Button>
                            <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept='image/png, image/gif, image/jpeg, image/jpg'
                            style={{display:'none'}}
                            onChange={(event)=>onfilesSelected(event)}
                            />

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{display : getValues('images').length <2 ? 'flex': 'none'}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    //image={ `/products/${ img }` }
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button
                                                    fullWidth color="error"
                                                    onClick={()=>onDeleteImage(img)}>
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    let product:IProduct|null
    //*SI es un producto nuevo entra por aqui.
    if (slug==='new')
    {
        //!Para cnvertirlo en un objeto literal de JS 
        const tempProduct= await JSON.parse(JSON.stringify(new Product() ))
        //*Borramos la propiedad _id
        delete tempProduct._id
        tempProduct.images=['img1','img2']
        product=tempProduct
    }
    else 
    {
        //*Va a actualizar un producto
        //*Esta consulta puede devolver un nulo , hay que especificarlo en el type de product.
        //!EN esata consulta se devuelve el _id
        product = await dbProducts.getProductBySlug(slug.toString());
    
    }
    
    //console.log('getServerSideProp: ',{product})    

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage;


