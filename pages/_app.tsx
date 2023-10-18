import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
//   // Component: NextPageWithLayout;
// };

type AppPropsWithLayout = AppProps & {
  Component: any;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        {Component.auth ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );
}
