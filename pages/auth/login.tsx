import { ErrorOutline } from '@mui/icons-material';
import { Box, Grid, Typography, TextField, Button, Link, Chip, IconButton } from '@mui/material';
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
//import { tesloApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { AuthContext } from '../../context';
import {validations} from "../../utils"
import { useRouter } from 'next/router';
type FormData = {
  email: string,
  password: string,
};


const LoginPage = () => {
  const router =useRouter()
  const {loginUser,user} = useContext(AuthContext)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false)

  const onLoginUser=async({email,password}:FormData)=>{
    //!No muestro el <Chip/>
    setShowError(false)


      const isValidLogin =await loginUser(email,password)
      if (!isValidLogin){
        setShowError(true)
     //console.log(error)
     setTimeout(() => {
      setShowError(false)
     }, 3000);
        return;
      }
      //!En este punto todo salio bien y se rempleza la pagina del usuario donde estaba actualmente por la del index router.replace('/')
     //Todo navegar a la pantalla donde estaba el usuario 
     router.replace('/')
   }

  return (
    <AuthLayout title={"Login"}>
      {/* No validate es para que no use la validacion propia de html para el input type="email" */}
      <form onSubmit={handleSubmit((data)=>onLoginUser(data))} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesion
            </Typography>



            {
            showError && (<Chip
            label='Usuario no existe'
            color="error"
            icon={<ErrorOutline/>}
            className="fadeIn"
            sx={{display:'flex'}}
            />)
            
            }
            
          </Grid>



          <Grid item xs={12}>
            <TextField
            type="email"
            label="Correo"
            variant="outlined"
            fullWidth
            {
              ...register('email',
              {
                required:'Correo es requerido',
                //!Aqui React hook form con su propiedad validate, le transmite el argumento email
                validate:(email)=>validations.isEmail(email)
                
            }
              )
              
            }
            error={errors.email ? true :false}
            helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            type='password'
            label="Contraseña"
            variant="outlined"
            fullWidth
            {
              ...register('password',
              {
                required:'Contraseña es requerida',
                minLength:{
                  value:6,
                  message:"Contraseña debe de ser de 6 o mas caracteres"}
                })
              
            }
            error={errors.password ? true :false}
            helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display={"flex"} justifyContent="end">
            <NextLink href={"/auth/register"} passHref legacyBehavior>
              <Link underline="always"> No tienes Cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
      </form>
      
    </AuthLayout>
  );
};

export default LoginPage;
