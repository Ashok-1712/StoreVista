const express = require('express');
const cors = require("cors");
const path = require('path');
const productRoutes = require(`./routes/products`);
const userRoutes = require(`./routes/users`);
const upload = require(`./config/multer`);


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post('/upload', upload.single('p_image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded: ${req.file.filename}`);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/products',productRoutes);
app.use('/users',userRoutes);




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
  


app.get('/', (req,res)=>{
    console.log("api running");
    res.send("API RUNNING");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`);
});