import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config(process.env.CLOUDINARY_URL!);

export type DataMessage = {
  message: string;
};
export const config = {
  //* Esto le dice a next que no le haga parse al body
  api: {
    bodyParser: false,
  },
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataMessage>
) {
  switch (req.method) {
    case "POST":
      return UploadFiles(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  // //*Leer el archivo de la carpeta temporal
  // const data= fs.readFileSync( file.filepath)
  // fs.writeFileSync(`./public/${file.originalFilename}`,data)
  // //*Borrar architvo temporal
  // fs.unlinkSync(file.filepath)
  // return

  try {
    //*Leer el archivo de la carpeta temporal
    const data = await cloudinary.uploader.upload(file.filepath);
    //console.log(data.secure_url)
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return "Error al cargar imagen";
  }
};


//!Version Promise, no se puede hacer async/await por el alcance de las variables.
const parseFiles = (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });

      if (err) {
        //*Para que salga d ela funcion
        return reject(err);
      }
      //*Se procesa los archivos de manera individual
      const filePath=await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};






//*Se procesa los archivos de manera individual
const UploadFiles = async (
  req: NextApiRequest,
  res: NextApiResponse<DataMessage>
) => {
  //*parseFiles tiene que ser definida como una promesa
  const imageUrl=await parseFiles(req);

  return res.status(200).json({ message: imageUrl });
};
