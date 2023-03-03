import React, { useEffect, useReducer } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Ad from '../components/Ad';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Header from '../components/Header';
import Footer from '../components/Footer';
import APIUsage from '../components/APIUsage';
import Container from '../components/Container';
import StatusTable from '../components/StatusTable';

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_RESULT':
			return { ...state, result: action.result, cacheHit: action.cacheHit, error: null };
		case 'SET_ERROR':
			return { ...state, result: null, cacheHit: null, error: action.error };
		case 'SET_PROTOCOL_VERSIONS':
			return { ...state, protocolVersions: action.data };
		case 'RESET_ALL':
			return { ...state, result: null, cacheHit: null, error: null };
		default:
			return state;
	}
};

export default function StatusLayout({ type, address }) {
	const [data, dispatch] = useReducer(reducer, { result: null, cacheHit: null, protocolVersions: null });

	useEffect(() => {
		if (!address) return;

		dispatch({ type: 'RESET_ALL' });

		(async () => {
			try {
				const result = await fetch(`${process.env.NEXT_PUBLIC_PING_HOST ?? 'https://api.mcstatus.io/v2'}/status/${type}/${address}`);

				if (result.status === 200) {
					const body = await result.json();

					dispatch({ type: 'SET_RESULT', result: body, cacheHit: result.headers.get('X-Cache-Hit') == 'true' });
				} else {
					const body = await result.text();

					console.error(body);

					dispatch({ type: 'SET_ERROR', error: body });
				}
			} catch (e) {
				console.error(e);

				dispatch({ type: 'SET_ERROR', error: e.message ?? e.toString() });
			}

			try {
				const result = await fetch(`https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/${type === 'java' ? 'pc' : 'bedrock'}/common/protocolVersions.json`);

				if (result.status < 400) {
					const body = await result.json();

					dispatch({ type: 'SET_PROTOCOL_VERSIONS', data: body });
				} else {
					const body = await result.text();

					console.error(body);
				}
			} catch (e) {
				console.error(e);
			}
		})();
	}, [address]);

	return (
		<>
			<Head>
				<title>{`${address ?? 'Loading'} - Minecraft Server Status`}</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content={`${address ?? 'Loading'} - Minecraft Server Status`} />
				<meta name="description" content={data.result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${address ?? 'n/a'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/status/java/${address}`} />
				<meta property="og:title" content={`${address ?? 'Loading'} - Minecraft Server Status`} />
				<meta property="og:description" content={data.result?.motd?.clean?.replace?.(/ +/g, ' ')?.trim() ?? `Easily and quickly retrieve the status of ${address ?? 'n/a'} or any Minecraft server by using our tool. Just type or paste in the address and get full information about the server within a fraction of a second.`} />
				<meta property="og:image" content={data.result?.favicon ?? 'https://mcstatus.io/img/icon.png'} />
				<link rel="canonical" href={`https://mcstatus.io/status/java/${address}`} />
			</Head>
			<Navbar />
			<Container>
				<section>
					<hgroup>
						<Header size={1}>Minecraft Server Status</Header>
						<p className="text-2xl font-light mt-2">Quickly retrieve the status of any Minecraft server</p>
					</hgroup>
					<Search host={address} type={type} className="mt-5" />
				</section>
				<section>
					<div className="px-5 py-4 rounded mt-4 box">
						{
							data.error
								? <p className="text-red-400">{data.error}</p>
								: data.result
									? <StatusTable data={data} />
									: <div className="flex gap-3">
										<div className="w-1/4">
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
										</div>
										<div className="w-3/4">
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 opacity-70 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full mb-3" />
											<div className="block rounded bg-neutral-300 dark:bg-neutral-700 h-12 w-full" />
										</div>
									</div>
						}
					</div>
				</section>
				<section>
					{
						data.result
							? <APIUsage type={type} address={address} data={data.result} />
							: null
					}
				</section>
				<Ad className="mt-4" />
			</Container>
			<Footer />
			<Script type="application/ld+json" strategy="afterInteractive" id="google-structured">
				{`
[
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://mcstatus.io"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "${type === 'java' ? 'Java' : 'Bedrock'} Status",
				"item": "https://mcstatus.io/status/java"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "${address}",
				"item": "https://mcstatus.io/status/${type}/${address}"
			}
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"url": "https://mcstatus.io",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://mcstatus.io/status/java/{host}"
			},
			"query-input": "required name=host"
		}
	}
]
				`}
			</Script>
		</>
	);
}

StatusLayout.propTypes = {
	type: PropTypes.oneOf(['java', 'bedrock']),
	address: PropTypes.string
};