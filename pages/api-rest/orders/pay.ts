import { idID } from "@mui/material/locale";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IPaypal } from "../../../interfaces";
import { Order } from "../../../models";

type Data = {
  message: string | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

      break;

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

//! Funcion para obtener el token desde paypal
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  //!Para generar un token en base 64 con la concatenacion de la clave public + secret
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  //!Para enviar en formato Base64 x-www-form-urlencoded
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


  //TODO Validar session del usuario
  //TODO Validar Mongo ID

  //!Llamo a la funcion getPaypalBearerToken para obtener el token
  const paypalBearerToken = await getPaypalBearerToken();

  //!SI el token es null se envia mensaje al usuario
  if (!paypalBearerToken) {
    res.status(400).json({ message: "No se pudo generar token" });
  }
  //!Obtengo el idtransaction y el id de mongo que vienen en el body del http request
  const { transactionid, orderid } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionid}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  //!Valido si la transaccion esta completa
   if (data.status !== 'COMPLETED'){
    res.status(400).json({ message: 'Pago no fue completado' });
  }
  db.connect()


  //!Creo dbOrder que va a mapear el modelo Orden
  //!BUsco la orden
  const dbOrder= await Order.findById(orderid)
  if (!dbOrder){
    await db.disconnect()
    res.status(400).json({ message: 'Orden no existe' });
  }

   //!Valido si los montos son iguales en el backend y en la data enviada desde paypal
  //*los values en la data (JSON) enviados desde paypal vienen en string.
  if (dbOrder?.total !== Number(data.purchase_units[0].amount.value))
  {
    await db.disconnect()
    res.status(400).json({ message: 'Los montos de paypal y de la bd no coinciden' });
  }

   //* en este punto la orden si existe por eso uso el dbOrder!.
   //*Procedemos a actualizar el registro
  dbOrder!.transactionId=transactionid
  dbOrder!.isPaid=true

  //!Actualizo los datos en dbOrder
  await dbOrder!.save()
  await db.disconnect()
  

  res.status(200).json({ message: "Orden Pagada" });
};
