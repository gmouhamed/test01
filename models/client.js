import { Schema, model } from 'mongoose';
const clientSchema = new Schema({
    commercant: {
        type: Schema.Types.ObjectId,
        ref: 'Commercant',
        required: [true, 'Donner l\'id du Commercant si vous plait'],
    },
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
    role: {
        type: String,
        default: 'personnel',
        required: true
    },
    number: {
        type: String,
    },
    adress: {
        type: String,
    },
})

export default model('Client', clientSchema)