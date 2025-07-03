import { getServerUrl, getCookie } from '../utils/function.js';

export const getPosts = (offset, limit) => {
    const result = fetch(
        `${getServerUrl()}/posts?offset=${offset}&limit=${limit}`,
        {
            headers: {
                'Content-Type': 'application/json',
                session: getCookie('session'),
                userid: getCookie('userId'),
            },
            noCORS: true,
        },
    );
    return result;
};