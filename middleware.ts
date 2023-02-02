import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  //   if (request.nextUrl.pathname.match('/checkout/address') ||request.nextUrl.pathname.match('/checkout/summary')) {
  //     const token=request.cookies.get('token')?.value
  //     return NextResponse.next()
  //  }
  
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //!Hay que clonar el nextUrl y mutar nextUrl.pathname
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  //console.log('entro al middleware')
  if (!session) {
    console.log("Middleware: No hay session");
    //*EN este punto se evalua si el request  es por API
    if (req.nextUrl.pathname === "/api/admin/dashboard") {
      return NextResponse.json({ message: "Auth required" }, { status: 401 });
    }

    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  //console.log('HAY SESION  Y CONTINUA')
  //* En este punto si existe session

  //* En este punto se evalua si quieren entrar a /admin. Por default se evalua "Matching Paths"
  
  if (req.nextUrl.pathname.match("/admin")) {
    //console.log("Path: ",req.nextUrl.pathname.match("/admin"))
    const validateRoles = ["admin", "super-admin", "root"];
    //console.log("middleware role: ", session.user.role);
    if (!validateRoles.includes(session.user.role)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/checkout/address",
    "/checkout/summary",
    "/admin",
    "/admin/orders/:id*",
    "/api/admin/dashboard",
    "/api/admin/products",
  ],
};
