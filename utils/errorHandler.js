// Classe de gestion d'erreur

class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)

    }
}

export default ErrorHandler