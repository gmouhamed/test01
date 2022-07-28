import { Schema, model } from 'mongoose';
import validator from "validator";

const pretSchema = new Schema({
    commercant: {
        type: Schema.Types.ObjectId,
        ref: 'Commercant',
        required: [true, 'Donner l\'id du Commercant si vous plait'],
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        unique:true,
        required: [true, 'Donner l\'id du Client si vous plait'],
    },
    montant: {
        type: Number,
        required: [true, 'Donner le montant si vous plait'],
    },
    
    date: {
        type: String,
        default: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    },
    
})

export default model('Pret', pretSchema)