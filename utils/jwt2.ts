import jsonwebtoken from 'jsonwebtoken'
export const signToken= (_id:string,email:string)=>{

    if(!process.env.JWT_SECRET_SEED){
        throw new Error('No hay Semilla de error')
    }

    return jsonwebtoken.sign(
        //!Payload
        {_id,email},
        //!Seed
        process.env.JWT_SECRET_SEED,
        //!Opciones
        {expiresIn:'30d'}
        )
}

export const isValidToken=(token:string):Promise<string>=>{

    if(!process.env.JWT_SECRET_SEED){
        throw new Error('No hay Semilla de error')
    }

    return new Promise((resolve,reject)=>{
        try {
            jsonwebtoken.verify(
                token,
                process.env.JWT_SECRET_SEED!,// JWT_SECRET_SEED! siempre va a existir
                (err,payload)=>{
                    if (err) return reject("Token no es valido")
                    const {_id}=payload as {_id: string}
                    resolve(_id)
                }
                )
            
        } catch (error) {
            reject("Token no es valido")
        }

    })

}

