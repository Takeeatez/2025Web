import { padTo2Digits, getServerUrl } from '../../utils/function.js';

const BoardItem = (
    postId,
    date,
    postTitle,
    hits,
    imgUrl,
    writer,
    commentCount,
    like,
    postContent,
    isLikedByMe
) => {
    // 파라미터 값이 없으면 리턴
    if (
        !date ||
        !postTitle ||
        hits === undefined ||
        like === undefined ||
        commentCount === undefined ||
        !writer
    ) {
        return;
    }

    // 날짜 포맷 변경 YYYY-MM-DD hh:mm:ss
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const liked = isLikedByMe === true || isLikedByMe === 1 || isLikedByMe === '1';
    const formattedDate = `${year}-${padTo2Digits(month)}-${padTo2Digits(day)} ${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

    const DEFAULT_PROFILE_IMAGE = '../public/image/profile/default.jpg';
    const profileImagePath = imgUrl === null ? DEFAULT_PROFILE_IMAGE : `${getServerUrl()}${imgUrl}`;
    // const API_HOST = getServerUrl();

    // isLikedByme가 개큰문제ㅇㅇ
    // TEMP DEBUG LOG:
    console.log('isLikedByMe:', isLikedByMe, 'liked:', liked);
    return `
    <a href="/html/board.html?id=${postId}">
        <div class="boardItem">
            <h2 class="title">${postTitle}</h2>
            <p class="preview">${postContent && postContent.length > 100 ? postContent.slice(0, 100) + '...' : postContent || ''}</p>
            <div class="info">
                <h3 class="views like-wrapper" data-post-id="${postId}">
                <i class="like-icon ${liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" style="cursor:pointer;" data-liked="${liked ? 'true' : 'false'}"></i>
                  <b class="like-count">${like ?? 0}</b>
                </h3>
                <h3 class="views"><i class="fa-regular fa-comment-dots"></i> <b>${commentCount}</b></h3>
                <h3 class="views"><i class="fa-regular fa-eye"></i> <b>${hits}</b></h3>
                <p class="date">${formattedDate}</p>
            </div>
            <div class="writerInfo">
            <picture class="img">
                <img src="${`${profileImagePath}`}" alt="img">
            </picture>
            <h2 class="writer">${writer}</h2>
        </div>
        </div>
    </a>
`;
};

export default BoardItem;

document.addEventListener('click', async (e) => {
  const likeWrapper = e.target.closest('.like-wrapper');
  if (likeWrapper) {
    e.preventDefault();
    const postId = parseInt(likeWrapper.getAttribute('data-post-id'), 10);
    const icon = likeWrapper.querySelector('.like-icon');
    const countEl = likeWrapper.querySelector('.like-count');

    try {
      const boardRequest = await import('../../api/boardRequest.js');
      const result = await boardRequest.toggleLike(postId);

      if (result && typeof result.likeCount === 'number' && typeof result.liked === 'boolean') {
        const liked = result.liked === true || result.liked === 'true' || result.liked === 1 || result.liked === '1';

        countEl.textContent = result.likeCount;
        if (liked) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
          icon.setAttribute('data-liked', 'true');
        } else {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
          icon.setAttribute('data-liked', 'false');
        }
      }
    } catch (err) {
      console.error('좋아요 오류:', err);
    }
  }
});