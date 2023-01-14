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
    case "GET":
      //res.status(201).json({ email,password })
      return checkJWT(req, res);
      break;

    default:
      res.status(400).json({ message: "Bad Request" });
      break;
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {token } = req.cookies
  //res.status(200).json({ token } as any);
  //TODO verificar si es un token valido.

  let userId=''
  try {
    userId=await jwt.isValidToken(token!)
  } catch (error) {
    return res.status(400).json({ message: "Token invalido"});
  }



  await db.connect();
  const usuario: IUser = await User.findById(userId).lean();
  await db.disconnect();
  if (!usuario) {
    return res.status(400).json({ message: "Usuario no existe" });
  }


  const { _id, role, name,email } = usuario;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  });
};