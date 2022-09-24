import { CRUXRequestBody, CRUXResponse, CRUXError, FormFactor, Mode } from '../types';

/**
 * request is sent to worker to hide the key for CRUX API
 * worker will only accept requests for localhost or crux.pages.dev
 */
export async function getData(url: string, formFactor: FormFactor, mode: Mode) {
	const body: CRUXRequestBody = { formFactor };

	if (mode === 'origin') {
		body.origin = url;
	} else {
		body.url = url;
	}

	const resp = await fetch('https://crux.manantank.workers.dev', {
		method: 'POST',
		body: JSON.stringify(body),
	});

	const data = await resp.json();

	return data as CRUXResponse | CRUXError;
}
