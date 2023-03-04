import counterStore from '@/stores';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReduxProvider store={counterStore}>
					<Component {...pageProps} />
				</ReduxProvider>
			</QueryClientProvider>
		</>
	);
}
