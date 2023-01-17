// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export const  middleware=async(request: NextRequest) =>{




  if (request.nextUrl.pathname.match('/checkout/address') ||request.nextUrl.pathname.match('/checkout/summary')) {
     const token=request.cookies.get('token')?.value
     //console.log('token valido')
    //  try {
    //   await isValidToken(token!)
    //   console.log('token valido')
    //  } catch (error) {
    //   console.log('token invalido')
    //  }

    return NextResponse.next()
  
   //return new Response(request)
  }
}