import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  //   if (request.nextUrl.pathname.match('/checkout/address') ||request.nextUrl.pathname.match('/checkout/summary')) {
  //     const token=request.cookies.get('token')?.value
  //     return NextResponse.next()
  //  }
  //console.log('ENTRO AL MIDDLEWARE')
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    console.log('NO HAY SESION')
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  //console.log('HAY SESION  Y CONTINUA')
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/checkout/address", "/checkout/summary"],
};
