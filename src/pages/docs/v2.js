import React from 'react';
import Highlight from 'react-highlight';
import DocumentationLayout from '../../layouts/Documentation';
import javaExample from '../../assets/response/v2/java.jsonc';
import bedrockExample from '../../assets/response/v2/bedrock.jsonc';
import sampleIcon from '../../assets/response/icon.png';

export default function DocumentationV2() {
	return (
		<DocumentationLayout version="v2">
			<div className="postman-run-button mt-5 is-block" data-postman-action="collection/fork" data-postman-var-1="12464026-ccd5d862-d399-4ff7-a4dc-19fdbd3cd8d3" data-postman-collection-url="entityId=12464026-ccd5d862-d399-4ff7-a4dc-19fdbd3cd8d3&entityType=collection&workspaceId=ce0bc9a0-bbc1-4857-bbbe-83fe699bda22" />
			<h2 className="title is-header">Overview</h2>
			<p>mcstatus.io believes that anybody should be able to retrieve the status of any Minecraft server using a simple and efficient manner. This is why we prioritize a detailed and continuously updated documentation on how to interact with our service from yours. Please make sure to read this documentation thoroughly to prevent any errors that may be a mistake on your part.</p>
			<p>All methods documented are using the REST API, which is supported in all major programming languages and browsers. Body data sent and received from/to the server are using JSON formatting for standardization reasons. You should familiarize yourself with this data encoding before attempting to use our service. If you have any questions, concerns or encounter any problems after attempting a solution, please feel free to contact us by sending an email to <a href="mailto:api@mcstatus.io">api@mcstatus.io</a>.</p>
			<p>All server statuses are cached for up to <span className="has-text-weight-bold">5 minutes</span> from the previous network fetch.</p>
			<h2 className="title is-header mt-6 mb-3">Java Status</h2>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/status/java/&lt;address&gt;</code></p>
			<Highlight className="language-json p-3">{javaExample}</Highlight>
			<h2 className="title is-header mt-6 mb-3">Bedrock Status</h2>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/status/bedrock/&lt;address&gt;</code></p>
			<Highlight className="language-json p-3">{bedrockExample}</Highlight>
			<h2 className="title is-header mt-6 mb-3">Favicon</h2>
			<p><span className="tag is-success">GET</span> <code>https://api.mcstatus.io/v2/favicon/&lt;address&gt;</code></p>
			<img src={sampleIcon.src} alt="Sample icon of Hypixel" width="128" height="128" />
		</DocumentationLayout>
	);
}