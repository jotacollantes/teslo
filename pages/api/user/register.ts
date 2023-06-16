import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";
import encriptador from "bcryptjs";
import { jwt, validations } from "../../../utils";

type TypeUserResponse = {
  email: string;
  role: string;
  name: string;
};

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: TypeUserResponse;
    };

type TypeBody = {
  email: string;
  password: string;
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      //res.status(201).json({ email,password })
      return createUser(req, res);
      break;

    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
}

const createUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const { email = "", password = "", name } = req.body as TypeBody;

  //* Validaciones antes de consultar en la base de datos
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Contraseña debe de ser de 8 caracteres o mas" });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: "Nombre debe de ser de 2 caracteres o mas" });
  }

  //Todo validarEmail

  if(!validations.isValidEmail(email)){
    return res
    .status(400)
    .json({ message: "Correo no es valido" });
  }
  //*******************************************************/

  await db.connect();
  const usuario: IUser = await User.findOne({ email: email }).lean();

  if (usuario) {
    await db.disconnect(); // Me desconecto porque me salgo de la funcion.
    return res.status(400).json({ message: "Usuario ya existe" });
  }

  //!Creamos el nuevo usuario
  const newUser = new User({
    email: email.toLowerCase(),
    password: encriptador.hashSync(password),
    role: "client",
    name,
  });
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revise los logs enb consola" });
  }

  const { _id } = newUser; // Solo necesito el _id, el email y el name me vienen por req.body

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      role: "client",
      name,
    },
  });
};