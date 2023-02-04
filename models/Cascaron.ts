import mongoose, { Schema, model, Model } from "mongoose";
const modeloSchema = new Schema({
  name: { type: String, required: true },
 

   
  },
{timestamps:true});

const Modelo: Model<any>=mongoose.models.Modelo|| model('Modelo',modeloSchema)
export default Modelo