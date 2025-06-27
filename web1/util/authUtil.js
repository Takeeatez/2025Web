const dbConnect = require('../database/index.js');
const { STATUS_CODE, STATUS_MESSAGE } = require('./constant/httpStatusCode.js');

// 사용자가 로그인된 상태인지 확인하는 인증 필터
const isLoggedIn = async (req, res, next) => {
    const { session } = req.headers;
    // 사용자 Id 추출
    const userId =
        req.headers.userid && !Number.isNaN(req.headers.userid)
            ? parseInt(req.headers.userid, 10)
            : null;

    try {
        // 유효성 검사
        if (!userId) {
            const error = new Error(STATUS_MESSAGE.REQUIRED_AUTHORIZATION);
            error.status = STATUS_CODE.UNAUTHORIZED;
            return next(error);
        }

        // DB에서 세션 값 조회
        const userSessionData = await dbConnect.query(
            `SELECT session_id FROM user_table WHERE user_id = ?;`,
            [userId],
            res
        );

        if (
            // 세션 값 비교
            !userSessionData ||
            userSessionData.length === 0 ||
            session !== userSessionData[0].session_id
        ) {
            const error = new Error(STATUS_MESSAGE.REQUIRED_AUTHORIZATION);
            error.status = STATUS_CODE.UNAUTHORIZED;
            return next(error);
        }

        // 최종 인증 성공
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = isLoggedIn;