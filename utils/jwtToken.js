//Créer et envoyer les token dans des cookies

const sendToken = (user, statusCode, res) => {

    //Créer un jwtToken
    const token = user.getJwtToken();

    //Options for cookie
    const options = {
        expires: new Date(
            Date.now + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

export default sendToken;