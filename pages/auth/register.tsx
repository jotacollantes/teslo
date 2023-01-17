import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();


  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const {registerUser,urlDestination} = useContext(AuthContext)
  const router =useRouter()
  const onCreateUser = async ({ name, email, password }: FormData) => {
    setShowError(false);

      const {hasError,message}=await registerUser( name, email, password )

      if (hasError) 
      {
        console.log(message)
        setShowError(true);
        setErrorMessage(message!)
        setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
      }

      //router.replace('/')
      router.replace(urlDestination)
  };
  return (
    <AuthLayout title={"Crear Usuario"}>
      <form onSubmit={handleSubmit((data) => onCreateUser(data))} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Creacion de Usuario
              </Typography>

              {showError && (
                <Chip
                  //label="Usuario ya existe"
                  label={errorMessage}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: "flex" }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombres"
                variant="outlined"
                //variant="filled"
                fullWidth
                {...register("name", {
                  required: "Name es requerido",
                  minLength: {
                    value: 2,
                    message: "Nombre debe de ser de 2 o mas caracteres",
                  },
                })}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="outlined"
                fullWidth
                {...register("email", {
                  required: "Correo es requerido",
                  //!Aqui React hook form con su propiedad validate, le transmite el argumento email
                  validate: (email) => validations.isEmail(email),
                })}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                {...register("password", {
                  required: "Contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "Contraseña debe de ser de 8 o mas caracteres",
                  },
                })}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />
            </Grid>
            {/*
            <Grid item xs={12}>
              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                fullWidth
              />
            </Grid>
            */}
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Crear Usuario
              </Button>
            </Grid>

            <Grid item xs={12} display={"flex"} justifyContent="end">
              <NextLink href={"/auth/login"} passHref legacyBehavior>
                <Link underline="always"> Ya tienes Cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
