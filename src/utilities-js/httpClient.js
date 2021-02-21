const isDefined = (entry) => entry[1] !== undefined;

const getFullUrlWithParams = ({ url, params }) => {
	if (params !== undefined) {
		const definedParams = Object.fromEntries(Object.entries(params).filter(isDefined));
		const urlParams = new URLSearchParams(definedParams);
		const urlParamsString = urlParams.toString();
		if (urlParamsString !== '') {
			return `${url}?${urlParamsString}`;
		}
	}
	return url;
};

export const makeRequest = async ({ url, method, params, body }) => {
	const fullUrl = getFullUrlWithParams({ url, params });
	const rawResponse = await fetch(fullUrl, {
		headers: { 'Content-Type': 'application/json' },
		method,
		body: JSON.stringify(body),
	});
	if (!rawResponse.ok) {
		const response = await rawResponse.text();
		throw new Error(`${method} ${url} failed. Response: ${response}`);
	}

	const response = await rawResponse.json();
	return response;
};
