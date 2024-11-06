import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import { appConfig } from "../config";
import { AuthContextProvider } from "../contexts/auth-context";
import useNprogress from "../hooks/use-nprogress";
import { theme } from "../theme";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Suspense } from "react";
config.autoAddCss = false
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page); 
  useNprogress();

  return (
    <>
      <Head>
        <title>{appConfig.title}</title>
        <meta name="description" content={appConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
       <ChakraProvider theme={theme}>
<Provider  store={store}>
        <AuthContextProvider>{getLayout(<Component {...pageProps} />)}</AuthContextProvider> 
        </Provider>
      </ChakraProvider>
     
    </>
  );
}
