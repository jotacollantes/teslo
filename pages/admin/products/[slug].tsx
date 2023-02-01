import React, { FC, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IProduct } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';


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

    //React hook form
    const {register,handleSubmit,formState:{errors},getValues,setValue,watch}= useForm<FormData>({defaultValues:product})//!Le asigno los valores que se mostraran en el formulario a cargar

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
    



    const onDeleteTag = ( tag: string ) => {

    }

    const onSubmitForm=(formData:FormData)=>{
        
            console.log({formData})
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
                                    return val.trim().includes(' ') ? 'No puede tener espacuios en blanco': undefined
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
                            helperText="Presiona [spacebar] para agregar"
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
                                product.tags.map((tag) => {

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
                            >
                                Cargar imagen
                            </Button>

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                            />

                            <Grid container spacing={2}>
                                {
                                    product.images.map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/products/${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error">
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
    
    const product = await dbProducts.getProductBySlug(slug.toString());

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