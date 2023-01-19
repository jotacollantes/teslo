import { db } from ".";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { IUser } from '../interfaces/user';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email: email });
  await db.disconnect();
  if (!user) {
    return null;
  }
  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;
  return {
    _id,
    email: email.toLowerCase(),
    role,
    name,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });
  
  if (user) {
    await db.disconnect();
    const { role, email, name, _id } = user;
    console.log('encontro la cuenta de github y se sale')
    return {
      _id,
      email,
      role,
      name,
    };
  }
  const newUser = new User({email:oAuthEmail,name: oAuthName,role:'client',password:'@'})
  await newUser.save()
  db.disconnect()
  const {_id,name,email,role} =newUser
  return {_id,name,email,role}
   

};
