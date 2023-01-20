import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { signIn, getSession, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
//import { tesloApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { AuthContext } from "../../context";
import { validations } from "../../utils";
import { useRouter } from "next/router";
type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { loginUser, user, urlDestination } = useContext(AuthContext);
  //console.log(urlDestination)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log({prov});
      setProviders(prov);
    });
  }, []);

  //console.log(Object.values(providers))

  const onLoginUser = async ({ email, password }: FormData) => {
    //!No muestro el <Chip/>
    setShowError(false);

    //   const isValidLogin =await loginUser(email,password)
    //   if (!isValidLogin){
    //     setShowError(true)

    //  setTimeout(() => {
    //   setShowError(false)
    //  }, 3000);
    //     return;
    //   }

    //!En este punto todo salio bien y se rempleza la pagina del usuario donde estaba actualmente por la del index router.replace('/')
    //Todo navegar a la pantalla donde estaba el usuario
    //router.replace('/')

    // Todo: navegar a la pantalla que el usuario estaba

    //!Solo si es que el redirect a /auth/login viene desde /checkout/address, se usa query params.

    // let destination:string
    // if (router.query.p)
    // {
    //   destination = router.query.p?.toString() || '/';
    //   router.replace(destination);
    // }
    // else
    // {
    //   router.replace(urlDestination)
    // }
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title={"Login"}>
      {/* No validate es para que no use la validacion propia de html para el input type="email" */}
      <form onSubmit={handleSubmit((data) => onLoginUser(data))} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesion
              </Typography>

              {showError && (
                <Chip
                  label="Usuario no existe"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                  sx={{ display: "flex" }}
                />
              )}
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
                    value: 6,
                    message: "Contraseña debe de ser de 6 o mas caracteres",
                  },
                })}
                error={errors.password ? true : false}
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
              <NextLink
              //href={"/auth/register"}
              href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' } 
              passHref
              legacyBehavior>
                <Link underline="always"> No tienes Cuenta?</Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "github")
                {
                  return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
                }
                
                
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // console.log({session});

  const { p = "/" } = query;
  //const { path } = req.cookies;
  //console.log("Path:", path);
  if (session) {
    return {
      redirect: {
        //!Como puede ser array lo convierto en un string
        destination: p.toString(),
        //destination: path!,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
