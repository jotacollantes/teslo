import React, { useEffect, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext,authReducer } from './';
import { tesloApi } from '../../api/tesloApi';

import axios from 'axios';
import Cookie from "js-cookie";
//import { useRouter } from 'next/router';

export interface AuthState{
    isLoggedIn: boolean;
    user?: IUser;
    
}


interface Props{
children:JSX.Element|JSX.Element[]
}

//Inicializamos
const INITIAL_STATE:AuthState={
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider = ({children}:Props) => {
const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)



useEffect(() => {
    
    checkToken()
   
 }, []);

const checkToken=async()=>{

   

    try {

        
        
        const  {data}= await tesloApi.get('/user/validate-jwt', { withCredentials: true })
        const {token,user}=data
        //* Grabamos el token en la cookie token
        Cookie.set('token',token)
        dispatch({type:'[Auth] - Login',payload:user})
       

    //*Los errores 400 entran por el catch
    } catch (error) {
        //router.replace('/auth/login')
        Cookie.remove('token')
    }
    
}







const loginUser=async(email:string,password:string):Promise<boolean>=>{

    try {
        const  {data}= await tesloApi.post('/user/login',{email,password})
    const {token,user}=data
    //* Grabamos el token en la cookie token
    Cookie.set('token',token)
    dispatch({type:'[Auth] - Login',payload:user})
    return true

    //*Los errores 400 entran por el catch
    } catch (error) {
        return false
    }
    
}

const registerUser = async ( name:string, email:string, password:string ):Promise<{hasError: boolean;message?: any;}> => {
  

    try {
      const { data } = await tesloApi.post("/user/register", {
        name: name,
        email: email,
        password: password,
      });
      const { token, user } = data;
      //console.log({ token, user });
      Cookie.set('token',token)
      //Cuando se crea el usario tambien se hace el login
    dispatch({type:'[Auth] - Login',payload:user})
    //Todo return
    return {
        hasError:false
                }
    //* En este caso de registro de usuario pueden existir 2 tipos de errores, los enviados por AXIOS producto de las validaciones que se ejecutan al momento de crear al usuario como por ejemplo que el correo ya existe, etc. o un error de conexion o algo fuera de la comunicacion con la api
    } catch (error) {
        //* Aqui preguntamos si es un error de axios.
        if (axios.isAxiosError(error))
        {
            return {
                hasError:true,
                message: error.response?.data.message
            }
        }
        //*En este punto si es cualquier otro tipo de error distinto de axios
         return {
            hasError:true,
                message: 'No se pudo crear al usuario'
         }
     
      
    }
  };

return (
<AuthContext.Provider value={{...state,
//metodos
loginUser,registerUser
}}>
    {children}
</AuthContext.Provider>
)
}