import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { initialData } from "../../database/products";
import { ItemCounter } from "../products/ItemCounter";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
interface Props {
  editable: boolean;
}
export const CardList = ({ editable }: Props) => {
  return (
    <>
      {productsInCart.map((product, ix) => {
        return (
          <Grid container spacing={2} key={ix} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={"/product/slug"} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    {/* /public/products */}
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component="img"
                      sx={{ borderRadios: "5px" }}
                    ></CardMedia>
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display={"flex"} flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla <strong>M</strong>
                </Typography>

                {/* Condicional */}
                {editable ? (
                  <ItemCounter />
                ) : (
                  <Typography variant="h6">3 items</Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems={"center"}
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
              {/* Editable */}
              {editable && (
                <Button variant="text" color="secondary">
                  {" "}
                  remover
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};