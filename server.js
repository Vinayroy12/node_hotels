const express = require('express')
const app = express();
const db = require('./db')

require('dotenv').config();
//body parser is the niddleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());// it converts the json data into object and get stored in req.body


const MenuItem = require('./models/MenuItem')

app.get('/',  (req,res)=>{
    res.send('welcome to my hotel')
})

app.get('./menu',async (req,res)=>{
    try {
       const data = req .body;
       
       const newmenu = new MenuItem(data);

       const response = await newmenu.save();
       console.log('data saved');
       res.status(200).json(response);
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'internal server error'})
        
    }
})

const personRoutes = require('./routes/personRoutes')

app.use('/person',personRoutes)



const PORT =  process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running')
});