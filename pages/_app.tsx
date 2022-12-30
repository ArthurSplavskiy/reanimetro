import {PageTransition} from '@components/PageTransition';
import {AppProps} from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Reanimetro</title>
				{/* <meta property='og:url' content='/'></meta> */}
				<meta
					property="og:locale"
					content="uk_UK"
				></meta>
			</Head>
			<Component {...pageProps} />
			<PageTransition />
		</>
	);
}

export default MyApp;
