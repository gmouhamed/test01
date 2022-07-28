const ErrorHandler = require('../utils/errorHandler').default

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Probleme de  serveur !!!';


    if (process.env.NODE_ENV === 'DEVELOPMENT'){
        return res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
       })
    }
    if (process.env.NODE_ENV === 'PRODUCTION'){

        let error = { ...err }

        error.message = err.message

        //Gestion d'erreur de mongo
        if (err.name === 'CastError') {
            const message = `Erreur de redirection Fall ${err.path}`;
            error = new ErrorHandler(message, 400)
        }

        
        //GEstion d'erreur Mongoose de validation d'id
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)  
        }


        //Gestion d'erreurs duplicatat de nom 
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }
        //Gestion de JwtError
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON web token invalid'
            error = new ErrorHandler(message, 400)  
        }
        //Gestion de temps d'expiration
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON web token est invalide  '
            error = new ErrorHandler(message, 400)  
        }
        


        return res.status(error.statusCode).json({
            success: false,
            message: error.message || "Internal Error!!!!!!!"

        })
    }
    
}