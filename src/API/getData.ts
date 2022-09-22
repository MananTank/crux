import { CRUXRequestBody, CRUXResponse } from '../types';

type CRUXError = {
	error: {
		message: string;
	};
};

/**
 * request is sent to worker to hide the key for CRUX API
 * worker will only accept requests for localhost or crux.pages.dev
 */

export async function getData(requestBody: CRUXRequestBody) {
	const resp = await fetch('https://crux.manantank.workers.dev', {
		method: 'POST',
		body: JSON.stringify(requestBody),
	});

	return (await resp.json()) as CRUXResponse | CRUXError;
}
