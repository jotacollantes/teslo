import mongoose, { Schema, model, Model } from "mongoose";
import {  Interface} from "../interfaces";

const modeloSchema = new Schema({
  name: { type: String, required: true },
 

   
  },
{timestamps:true});

const Modelo: Model<Interface>=mongoose.models.Modelo|| model('Modelo',modeloSchema)
export default Modelo