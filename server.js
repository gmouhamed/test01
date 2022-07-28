import app from './app';
import connectDatabase from './config/database';


import { config } from 'dotenv';

config({ path : 'config/config.env' })

//Connection à la base de données
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode `)
})