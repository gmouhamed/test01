const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Pret = require('../models/pret').default;
const Client = require('../models/client').default;
//Pret Creation
exports.newPret = catchAsyncErrors(async (req, res, next) => {

    const { client, montant ,commercant } = req.body;
    let pret;
    pret = await Pret.findOneAndUpdate({client:client},{$set:{montant:montant}})
    if(!pret){
         pret = await Pret.create({
            client,
            montant,
            commercant
        })
       console.log("pet if : ",pret);
    }

    res.status(200).json({
        success: true,
        pret
    })
    
})

exports.getPretCommercant = catchAsyncErrors(async (req, res, next) => {
    const pret = await Pret.find({commercant:req.params.id}).populate('client')

    if (!pret) {
        return next(new ErrorHandler(`Cette pret n'existe pas`, 401))
    }
    res.status(200).json({
        success: true,
        pret
    })
})
