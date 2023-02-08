import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Highlight from './Highlight';
import ChevronDown from '!!@svgr/webpack!../assets/icons/chevron-down.svg';
import ChevronUp from '!!@svgr/webpack!../assets/icons/chevron-up.svg';

export default function APIUsage({ address, data, type }) {
	const [isExpanded, setExpanded] = useState(false);

	return (
		<div className="mt-3 rounded interactive-box">
			<div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!isExpanded)}>
				<p className="font-bold">API Usage</p>
				{
					isExpanded
						? <ChevronUp />
						: <ChevronDown />
				}
			</div>
			{
				isExpanded
					? <div className="p-4 border-t border-t-neutral-300 dark:border-t-neutral-700">
						<p>
							<span className="bg-green-600 text-sm px-2 py-1 rounded text-white">GET</span>
							<code className="ml-2 break-words">https://api.mcstatus.io/v2/status/{type}/{address}</code>
						</p>
						<Highlight source={JSON.stringify(data, null, '    ')} className="mt-4 bg-neutral-800 dark:border dark:border-neutral-700 rounded" />
						<p className="mt-3">Learn more about this response by viewing it in the <Link href={`/docs#${type}-status`} className="link">API documentation</Link>.</p>
					</div>
					: null
			}
		</div>
	);
}

APIUsage.propTypes = {
	address: PropTypes.string.isRequired,
	data: PropTypes.any.isRequired,
	type: PropTypes.string.isRequired
};