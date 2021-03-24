import { Provider as AuthProvider } from "next-auth/client"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
