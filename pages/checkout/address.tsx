import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
import Cookie from 'js-cookie';


type FormData = {
  firstname: string;
  lastname: string;
  address:string;
  address2?:string;
  zip:string;
  city:string;
  country:string;
  phone:string;

};

const AddressPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: {
    firstname:'',
    lastname:'',
    address:'',
    address2:'',
    zip:'',
    city:'',
    country:'',
    phone:''
   }});

  const onSendAddress = async (data: FormData) => {
   
     //!Grabamos la cookie
     Cookie.set('address',JSON.stringify(data))
     return;
     
  };

  return (
    <ShopLayout title={""} pageDescription={""}>
      <Typography>Direccion</Typography>

        <form onSubmit={handleSubmit((data) => onSendAddress(data))} noValidate>
          <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
          label="Nombre"
          variant="filled"
          fullWidth
          {...register("firstname", {
            required: "Name es requerido",
            minLength: {
              value: 2,
              message: "Nombre debe de ser de 2 o mas caracteres",
            },
          })}
          error={errors.firstname ? true : false}
          helperText={errors.firstname?.message}
          
          >

          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          label="Apellido"
          variant="filled"
          fullWidth
          {...register("lastname", {
            required: "Last Name es requerido",
            minLength: {
              value: 2,
              message: "Last Name debe de ser de 2 o mas caracteres",
            },
          })}
          error={errors.lastname ? true : false}
          helperText={errors.lastname?.message}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          label="Direccion"
          variant="filled"
          fullWidth
          {...register("address", {
            required: "Address es requerido",
            minLength: {
              value: 2,
              message: "Address debe de ser de 2 o mas caracteres",
            },
          })}
          error={errors.address ? true : false}
          helperText={errors.address?.message}
          >

          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Direccion 2  (opcional)"
            variant="filled"
            fullWidth
            {...register("address2")}
            // error={errors.address ? true : false}
            // helperText={errors.address?.message}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Codigo Postal"
            variant="filled"
            fullWidth
            {...register("zip", {
              required: "Zip es requerido",
              // minLength: {
              //   value: 3,
              //   message: "Address debe de ser de 3 o mas caracteres",
              // },
            })}
            error={errors.address ? true : false}
            helperText={errors.address?.message}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          label="Ciudad"
          variant="filled"
          fullWidth
          {...register("city", {
            required: "city es requerido",
            // minLength: {
            //   value: 2,
            //   message: "Address debe de ser de 2 o mas caracteres",
            // },
          })}
          error={errors.city ? true : false}
          helperText={errors.city?.message}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled"
            label="Pais"
            defaultValue="ECU"
            //value={'ECU'}
            {...register("country")}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
          label="Telefono"
          variant="filled"
          fullWidth
          {...register("phone", {
            required: "Phone es requerido",
            // minLength: {
            //   value: 3,
            //   message: "Address debe de ser de 3 o mas caracteres",
            // },
          })}
          error={errors.address ? true : false}
          helperText={errors.address?.message}
          ></TextField>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display="flex" justifyContent={"center"}>
        <Button
        type="submit"
        color="secondary"
        className="circular-btn"
        size="large">
          Revisar Pedido
        </Button>
      </Box>
        </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token } = req.cookies;

//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token!);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
