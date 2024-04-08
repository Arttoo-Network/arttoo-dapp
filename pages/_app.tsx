import Navbar from '@components/default/Navbar';
import ResponsiveProvider from '@contexts/ResponsiveContext';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../theme/globals.css';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { Analytics } from "@vercel/analytics/react"
import { SolanaProvider } from '@contexts/Sol/SolanaProvider';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''


const CreateNextjsDapp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<link rel='apple-touch-icon' href='/icon.png'></link>

				<meta name='application-name' content='Create Nextjs Dapp' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='apple-mobile-web-app-title' content='Create Nextjs Dapp' />
				<meta
					name='description'
					content='Starter to create Dapps with Next, React and Ethers. No longer waste valuable time building your project structure. Start coding is easy as npx create-nextjs-dapp'
				/>

			</Head>

			<ResponsiveProvider>
					<div className='h-screen flex flex-col'>
						<APIProvider apiKey={apiKey}>
							<SolanaProvider>
							<Navbar />
							<div className='flex-1 relative'>
								<Component {...pageProps} />
							</div>
							<Analytics />
							</SolanaProvider>
						</APIProvider>
					</div>
			</ResponsiveProvider>
		</>
	);
};

export default CreateNextjsDapp;
