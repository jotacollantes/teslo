import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from '../interfaces/products';



//! El fetcher lo vamos  a poner como provider en el /pages/_app
//const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json())

export const useProducts=(endPoint:string,config:SWRConfiguration={})=>{
    //! Como useSWR usa un tipo generico, se le puede establecer un interface
    //const { data, error, isLoading } = useSWR<IProduct[]>(`/api${endPoint}`, fetcher,config);
    //! Sin el fetcher porque lo vamos  a poner como provider en el /pages/_app
    const { data, error, isLoading } = useSWR<IProduct[]>(`/api${endPoint}`, config);
    return{
        //!Si existe la data se envia la data caso contrario se envia un arreglo vacio lo que significa que products siempre tendra un valor y no un undefined
        products: data ? data : [],
        error,
        isLoading
    }
}