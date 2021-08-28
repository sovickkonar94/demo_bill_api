const { PORT, DB } = require('./config/constants');

const express = require('express');
const { sequelize } = require('./models/index');
const base_router = require('./routes');
const logger = require('./config/logger');

const app = express();
app.use(express.json());

app.use(logger);
app.use('/api',base_router);

app.listen(PORT,async ()=>{
    try{
        await sequelize.authenticate();
        console.log(`DB connected : ${DB}`);
        console.log(`http://localhost:${PORT} running ...`)

    }catch(err){
        // stop the server
        console.log(err.message);
        process.exit(1);
    }
});