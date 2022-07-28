//Creation d'un middleware pour voir si l'Commercant est connecte ou pas
import Commercant from '../models/Commercant'

import { verify } from 'jsonwebtoken'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from './catchAsyncErrors'

//Dans ce fichier on essaie de comparer le cookie unique de l'Commercant connecte pour voir si l'Commercant est bien 
//connect, 
export async function isAuthenticatedCommercant(req, res, next) {

    //Recuperation du token
    const token = req.headers["x-access-token"];

    if (!token) {
        return next(new ErrorHandler('Vous devez vous connecter pour acceder a ce page ', 401));
    }
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.CommercantId = decoded.id
        next();
    });
}

//Gestion des roles
export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.CommercantRole)) {
            return next(
                new ErrorHandler(`Role (${req.CommercantRole}) ne peut pas acceder à ces fonctionnalités `, 403))
        }
        next();
    }
}


