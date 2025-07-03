import { getServerUrl, getCookie } from '../utils/function.js';

export const getPost = postId => {
    const result = fetch(`${getServerUrl()}/posts/${postId}`, {
        headers: {
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        noCORS: true,
    });
    return result;
};

export const deletePost = async postId => {
    const result = await fetch(`${getServerUrl()}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
    });
    return result;
};

export const writeComment = async (pageId, comment) => {
    const result = await fetch(`${getServerUrl()}/posts/${pageId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        body: JSON.stringify({ commentContent: comment }),
    });
    return result;
};

export const getComments = async postId => {
    const result = await fetch(`${getServerUrl()}/posts/${postId}/comments`, {
        headers: {
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        noCORS: true,
    });
    return result;
};

// 좋아요처리
export const likePost = async postId => {
    const result = await fetch(`${getServerUrl()}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        noCORS: true,
    });

    if (!result.ok) {
        throw new Error('Failed to like post');
    }

    return result.json();
};

// 좋아요취소
export const unlikePost = async (postId) => {
    const result = await fetch(`${getServerUrl()}/posts/${postId}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        noCORS: true,
    });

    if (!result.ok) {
        throw new Error('Failed to unlike post');
    }

    return result.json();
};


export const toggleLike = async postId => {
    const result = await fetch(`${getServerUrl()}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            session: getCookie('session'),
            userid: getCookie('userId'),
        },
        noCORS: true,
    });

    if (!result.ok) {
        throw new Error('Failed to toggle like');
    }

    return result.json();
};

