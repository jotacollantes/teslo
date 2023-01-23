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
import React, { useContext } from "react";
import { CartContext } from "../../context";
import { ItemCounter } from "../products/ItemCounter";
import { ICartProduct, IOrderItem } from "../../interfaces";

interface Props {
  editable: boolean;
  products?:IOrderItem[]
}
export const CardList = ({ editable,products }: Props) => {
  const {cart,addProductToCart,updateCartQuantity,removeItem} = useContext(CartContext)


  const onNewCartQuantityValue=(product:ICartProduct,newQuantityValue:number)=>{
    product.quantity=newQuantityValue
    updateCartQuantity(product)
  }

  const onRemoveItem =(product:ICartProduct)=>{
      removeItem(product)
  }

  const productsToShow= products ? products : cart
  return (
    <>
      {productsToShow.map((product, ix) => {
        return (
          <Grid container spacing={2} key={ix} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    {/* /public/products */}
                    <CardMedia
                      image={`/products/${product.image}`}
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
                  Talla <strong>{product.size}</strong>
                </Typography>

                {/* Condicional */}
                {editable ? (
                  <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={
                    //!Envio como parametro el value que me emite el prop updateQuantiy y el product que estoy iterando dentro del map
                    (value)=>onNewCartQuantityValue(product as ICartProduct,value)
                  } />
                ) : (
                  <Typography variant="h6">{product.quantity} {product.quantity ===1 ? 'Item' :  'Items'}</Typography>
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
              <Typography variant="subtitle1">{`$${product.price * product.quantity}`}</Typography>
              {/* Editable */}
              {editable && (
                <Button
                variant="text"
                color="secondary"
                onClick={()=>onRemoveItem(product as ICartProduct)}
                >
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
