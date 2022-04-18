import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../store';
import Header from '../Components/Header/Header';
import HeaderMenu from '../Components/HeaderMenu/HeaderMenu';
import { appWithTranslation } from 'next-i18next';
import App from 'next/app';

const WrappedApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Vsion</title>
				<link rel='icon' href='/favicon.ico' />
				{/* <link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/> */}
				<meta name='robots' content='index' />
				<meta name='viewport' content='width=device-width' />
			</Head>
			<Header />
			<HeaderMenu />
			<Component {...pageProps} />
		</>
	);
};

WrappedApp.getInitialProps = wrapper.getInitialAppProps(
	(store) => async (context: any) => {
		const { ctx } = context;
		return {
			pageProps: {
				...(await App.getInitialProps(context)).pageProps,
				pathname: ctx.pathname,
			},
		};
	}
);

export default wrapper.withRedux(appWithTranslation(WrappedApp));
