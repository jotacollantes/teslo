//!Cualquier cosa que pase por el directorio sera procesado

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { loadGetInitialProps } from "next/dist/shared/lib/utils"
import { dbUsers } from "../../../database"



export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    

    CredentialsProvider({
      name:'Credentials',
      credentials:{
      email:{label:'Correo:',type:'email',placeholder:'correo@google.com'},
      password:{label:'Contraseña:',type:'password',placeholder:'contraseña'}
      },
      async authorize(credentials,req){
        
        // Add logic here to look up the user from the credentials supplied

      //! Lo que dbUsers.checkUserEmailPassword retorna {name:'Juan',email:'juan@collantes.ec',role:'admin'}  as any
      
      return await dbUsers.checkUserEmailPassword(credentials!.email,credentials!.password) as any


       
      }}),
    


  ],

   //!Customs Pages
   pages:{
    signIn:'/auth/login',
    newUser:'/auth/register'
   },

   session:{
    maxAge: 2592000, //30dias
    strategy:'jwt',
    updateAge: 86400
   },

  
  callbacks:{
    async jwt(params){
      const {token,user,account} =params
      //console.log('callback jwt:',{token,user,account})
      if(account){
        //*añado la propiedad token.accesToken
        token.accessToken=account.access_token;
        console.log('callback jwt entra al  access token:',token.accessToken)
      }

      switch (account?.type) {
        case 'oauth':
          //console.log('entro a oauth')
          token.user=await dbUsers.oAuthToDbUser(user?.email||'',user?.name||'')
          break;
        
          case 'credentials':
            //*añado la propiedad token.user
            token.user=user
            break;
        
      
        default:
          break;
      }
      //* Envio el token a la session
      //console.log('callback jwt final:',{token})
      return token;
    },
    //*Los datos del JWT son pasados a la session
    async session(params){
      const {session,user,token} =params 
      //let newSession
      //console.log('session',{session,token,user})
      //console.log('token:',token)
      //session.accessToken=token.accessToken
      session.user=token.user! 
      //newSession={...session}
      
      //console.log('sesion:',session)
      return {
        ...session,
        accessToken:token.accessToken
      };
    }

  }

})