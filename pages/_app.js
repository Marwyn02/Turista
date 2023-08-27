import SiteLayout from "@/components/layout/SiteLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}
