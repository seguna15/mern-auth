export const sendAccessToken = async (user, statusCode, res) => {
    const token = user.getJwtAccessToken();

    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    res.status(statusCode).cookie("mernAuthToken", token, options);
}