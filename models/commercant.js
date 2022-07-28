import { Schema, model } from 'mongoose';
import { randomBytes, createHash } from 'crypto';

const commercantSchema = new Schema({
    first_name : {
        type: String,
        required: [true, 'Entrez votre prenom svp'],
        maxlength: [30, 'Le prenom ne doit pas exceder 30 caracteres']
    },
    last_name : {
        type: String,
        required: [true, 'Entrez votre prenom svp'],
        maxlength: [30, 'Le nom ne doit pas exceder 30 caracteres']
    },
    email : {
        type: String,
        required: [true, 'Entrez votre email svp'],
        unique: true,
    },
    password : {
        type: String,
        minlength: [6, 'Veuillez entrer plus de 6 caracteres'],
        select: false, //Pas afficher le password
    },
    avatar : {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'costumer',
        required: true
    },
})

//Archiver le password avant de le sauvegarder 
commercantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Fonction de comparaison de password
commercantSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Retourner un JWTToken 
commercantSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Generate reset password token
commercantSchema.methods.getResetPasswordToken = function () {
    //Générer le token 
    const resetToken = randomBytes(20).toString('hex');

    //Hasher le password à renouveler
    this.resetPasswordToken = createHash('sha256').update(resetToken).digest('hex');

    //Le temps d'expiration
    this.resetPasswordExpire = Date.now() * 30 * 60 * 1000;

    return resetToken;
}


export default model('Commercant', commercantSchema);