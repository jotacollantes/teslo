import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IUser } from "../../../interfaces";
import { User } from "../../../models";
import encriptador from "bcryptjs";
import { jwt } from "../../../utils";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      //res.status(201).json({ email,password })
      return loginUser(req, res);
      break;

    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const usuario: IUser = await User.findOne({ email: email }).lean();
  await db.disconnect();
  if (!usuario) {
    return res.status(400).json({ message: "Correo no existe" });
  }

  //! SI el usuario existe, verifico con compareSync, el password viene si o si desde la base de datos por eso al final uso usuario.password!
  if (!encriptador.compareSync(password, usuario.password!)) {
    return res.status(400).json({ message: "Contraseña invalida" });
  }
  const { _id, role, name } = usuario;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  });
};