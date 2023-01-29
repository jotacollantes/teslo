import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IUser } from '../../../interfaces'
import { User } from '../../../models'
import { isValidObjectId } from 'mongoose';


type Data ={message: string}|IUser[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {


switch (req.method) {
    case 'GET':
        return getUsers(req,res)
        
    case 'POST':
        
      return updateUser(req,res)
    default:
        return res.status(400).json({ message: 'Bad Request' })
}

    
}

const getUsers=async(req: NextApiRequest, res: NextApiResponse<Data>) =>{
    await db.connect
    const users = await User.find().select('-password').lean()
    await db.disconnect
    //*Tengo que definir el type para users del tipo IUser[] en la response
    return res.status(200).json(users)

}
const updateUser=async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    const {userId='',role=''}=req.body
    if (!isValidObjectId){
        return res.status(400).json({ message: 'Id Invalido' })
    }

    const validRoles=['admin','super-admin','SEO']
    if(validRoles.includes(role))
    {
        return res.status(400).json({ message: `Rol Invalido. Roles validos ${validRoles}` })
    }

    await db.connect
    const user = await User.findById(userId)
    
    
    if (!user){
        return res.status(404).json({ message: 'Usuario no existe' })
    }

    user.role=role;
    user.save()
    await db.disconnect

    //*Tengo que definir el type para users del tipo IUser[] en la response
    return res.status(200).json({message: "Usuario Actualizado"})
}

