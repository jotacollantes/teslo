import Head from "next/head";
import React from "react";
import { NavBar } from '../ui';
import { SideMenu } from '../ui/SideMenu';

interface Props {
  title: string;
  pageDescription: string;
  //Para compartir en redes
  imageFullUrl?: string;
  children: JSX.Element | JSX.Element[];
}
export const ShopLayout = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {
        imageFullUrl ? <meta name="og:image" content={imageFullUrl} /> : ""
        // Tambien se puede hacer asi:
        // imageFullUrl  && (<meta name="og:image" content={imageFullUrl} />)
        }
      </Head>
      <nav>
        {/* Navbar */}
        <NavBar/>

      </nav>
      {/* TODO: Sidebar */}
      <SideMenu/>
      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        {children}
      </main>

      <footer>{/* TODO: Footer */}</footer>
    </>
  );
};
