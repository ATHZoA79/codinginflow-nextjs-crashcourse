import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Container } from "react-bootstrap";
import styles from "@/styles/app.module.css";
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Coding in Flow | NextJS for Beginner</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="@/public/favicon.ico" type="image/x-icon" />
      </Head>
      <NavBar />
      <Container className={styles.appContainer}>
        <Component {...pageProps} />
      </Container>
    </div>
  )
}
