const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Client = require('../models/client').default;
//Customer Creation
exports.newClient = catchAsyncErrors(async (req, res, next) => {

    const { first_name, last_name, number, adress ,commercant } = req.body;

    const client = await Client.create({
        first_name,
        last_name,
        number,
        adress,
        commercant
    })
    res.status(200).json({
        success: true,
        client
    })
})

exports.getAllClientCommercant = catchAsyncErrors(async (req, res, next) => {
    console.log("commercant : ",req.params.id)
    const client = await Client.find({commercant:req.params.id});

    if (!client) {
        return next(new ErrorHandler(`Cette Client n'existe pas`, 401))
    }
    res.status(200).json({
        success: true,
        client
    })
})

// // recuperation de la liste des clients
// exports.getClients = catchAsyncErrors(async (req, res, next) => {

//     const clients = await Client.find()

//     res.status(200).json({
//         success: true,
//         clients
//     })
//     next()
// })
