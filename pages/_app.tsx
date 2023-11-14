import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import "@/styles/globals.css";

import SiteLayout from "@/components/layout/SiteLayout";

type TAppProps = {
  Component: FC;
  pageProps: {
    session: any;
    [key: string]: any;
  };
};

const App: FC<TAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Turista</title>
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </SessionProvider>
  );
};

export default App;
