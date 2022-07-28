const ErrorHandler = require('../utils/errorHandler').default
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken').default
const Commercant = require('../models/commercant').default
//Connexion d'un commerçant
exports.loginCommercant = catchAsyncErrors( async (req, res, next) => {
    const { email, password} = req.body;

    console.log("email  : ",email);
    //Verifier si l'Commercant a entré mail et password

    if (!email || !password ) {
        return next(new ErrorHandler('Veuillez renseigner les champs email et password', 400));
    }
    //FInd Commercant dans la database
    const commercant = await Commercant.findOne({ email }).select('+password');
    if (!commercant) {
        return next( new ErrorHandler('Email incorrect', 401));
    }
    if(commercant.password!=password){
        return next( new ErrorHandler('Password incorrect', 401));
    }
    // const token = Commercant.getJwtToken();
    console.log("commercant : ",commercant)
     res.status(201).json({
        success: true,
        message: 'Bienvenu dans la votre portail',
    //     token,
        commercant
     })
     sendToken(commercant, 200, res)
})

exports.logout = catchAsyncErrors( async (req, res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Bye Bye à la prochaine"
    })
})