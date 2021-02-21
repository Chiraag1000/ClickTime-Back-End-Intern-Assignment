const isDefined = (entry: [string, string] | [string, undefined]): entry is [string, string] =>
	entry[1] !== undefined;

export type Method = 'GET' | 'POST' | 'PATCH';
export type Params = Record<string, string | undefined>;
export type Body = Record<string, unknown>;
type UrlWithParams<T extends Params> = { url: string; params?: T };

const getFullUrlWithParams = <TParams extends Params>({ url, params }: UrlWithParams<TParams>) => {
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

export const makeRequest = async <TReturn, TParams extends Params, TBody extends Body>({
	url,
	method,
	params,
	body,
}: {
	body?: TBody;
	method: Method;
} & UrlWithParams<TParams>): Promise<TReturn> => {
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
