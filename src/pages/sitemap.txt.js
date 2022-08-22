import React from 'react';
import { exampleServers } from '../assets/servers';

class Sitemap extends React.Component {
	static async getInitialProps({ res }) {
		res.setHeader('Content-Type', 'text/plain');
		res.write([
			'/',
			'/about',
			'/docs/v1',
			'/docs/v2',
			...exampleServers.map((server) => `/status/${server.type}/${server.address}`)
		].join('\n'));
		res.end();
	}
}

export default Sitemap;