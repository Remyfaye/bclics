import Layout from "@/components/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Sora } from "next/font/google";
import { Toaster } from "react-hot-toast";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const roboto = Sora({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {/* <Toaster> */}
        <Layout>
          <main className={roboto.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
        {/* </Toaster> */}
      </RecoilRoot>
    </SessionProvider>
  );
}
