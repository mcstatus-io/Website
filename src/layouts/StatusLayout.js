import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

export default function StatusLayout({ host, bedrock, children }) {
	const { push } = useRouter();

	const form = useFormik({
		initialValues: {
			host,
			bedrock
		},
		validationSchema: Yup
			.object()
			.shape({
				host: Yup.string().min(1).matches(/^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*(:\d{1,5})?$/).required(),
				bedrock: Yup.boolean().required()
			})
			.required(),
		onSubmit: ({ host, bedrock }) => push(`/status/${bedrock ? 'bedrock' : 'java'}/${host.toLowerCase()}`)
	});

	return (
		<>
			<div className="box">
				<form onSubmit={form.handleSubmit}>
					<div className="columns">
						<div className="column is-flex-grow-1">
							<div className="field">
								<div className="control is-fullwidth">
									<input type="text" className={`input ${form.errors.host ? 'is-danger' : ''}`} id="host" placeholder="play.hypixel.net OR play.hypixel.net:25565" value={form.values.host} spellCheck="false" autoComplete="false" onChange={form.handleChange} onBlur={form.handleBlur} />
								</div>
							</div>
							<label className="checkbox">
								<input type="checkbox" className="mr-2" id="bedrock" checked={form.values.bedrock} onChange={form.handleChange} />
								<span>Bedrock server</span>
							</label>
						</div>
						<div className="column is-flex-grow-0">
							<button type="submit" className="button is-fullwidth is-link" disabled={!form.isValid}>Submit</button>
						</div>
					</div>
				</form>
			</div>
			{children}
		</>
	);
}

StatusLayout.propTypes = {
	host: PropTypes.string,
	bedrock: PropTypes.bool,
	children: PropTypes.any
};

StatusLayout.defaultProps = {
	host: '',
	bedrock: false
};