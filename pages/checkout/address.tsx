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
  FormHelperText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

import { CartContext } from "../../context";
import { ShippingAddress } from "../../interfaces";



const getAddressFromCookies = (): ShippingAddress => {
  const cookieData = Cookie.get("address")
    ? JSON.parse(Cookie.get("address")!)
    : {};

  return cookieData;
};

const AddressPage = () => {
  const { updateAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingAddress>({
    defaultValues: getAddressFromCookies(),
    //{
    // firstname:'',
    // lastname:'',
    // address:'',
    // address2:'',
    // zip:'',
    // city:'',
    // country:'',
    // phone:''
    //}
  });

  const onSendAddress = async (data: ShippingAddress) => {
    //!Grabamos la cookie
    Cookie.set("address", JSON.stringify(data));

    updateAddress(data);
    router.push("/checkout/summary");
    return;
  };

  //Para el manejo del Select List

  //let { country: countrycode } = getAddressFromCookies();
  //     if (!countrycode){
  //   countrycode='ECU'
  // }

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
            ></TextField>
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
            ></TextField>
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
            {/* <FormControl fullWidth error={errors.country ? true : false}>
              <InputLabel>Pais</InputLabel>
              <Select
                variant="filled"
                label="Pais"
                defaultValue={countrycode ? countrycode : false}
                {...register("country", { required: "Pais es requerido" })}
              >
                {countries.map((pais, ix) => (
                  <MenuItem key={pais.code!} value={pais.code!}>
                    {pais.name!}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.country?.message}</FormHelperText>
            </FormControl> */}
             {/* <FormControl fullWidth> */}
             <TextField
                            // select
                            variant="filled"
                            label="País"
                            fullWidth
                            // defaultValue={ Cookies.get('country') || countries[0].code }
                            { ...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.country }
                            helperText={ errors.country?.message }
                        />
                            {/* {
                                countries.map( country => (
                                    <MenuItem 
                                        key={ country.code }
                                        value={ country.code }
                                    >{ country.name }</MenuItem>
                                ))
                            }
                        </TextField> */}
                    {/* </FormControl> */}
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
              error={errors.phone ? true : false}
              helperText={errors.phone?.message}
            ></TextField>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent={"center"}>
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
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
