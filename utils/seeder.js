// Just pour push les données json dans la base de données
import { config } from 'dotenv';
import connectDatabase from '../config/database';
//setting file
config({path : 'backend/config/config.env'});

connectDatabase();

const seedProducts = async() => {
    try{
        //Suppression des données existantes
        // Product.deleteMany();
        //console.log('Binngooooo les produits sont supprimés');

        //Presistance des données de product.json dans la connectDatabase
        await Product.insertMany(productsData);
        console.log('Jeuf waay lepp doug na si base de donnees');
    }
    catch(error){
        console.log(error.message);
        process.exit(); 
    }
}

seedProducts()