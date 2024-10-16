const express = require('express');
const db = require('../database');
const router = express.Router();
const upload = require('../config/multer');
const multer = require('multer');
const path = require('path');

const app = express();

const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');


router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get('/', (req, res) => {
    const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const category = req.query.category ? req.query.category.toLowerCase() : '';

    let sql = `SELECT * FROM products WHERE 1=1`;
    let queryParams = [];

    
    if (searchTerm) {
        sql += ` AND (LOWER(p_name) LIKE ? OR LOWER(p_description) LIKE ?)`;
        queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    if(category) {
        sql+=` AND LOWER(p_category) = ? `;
        queryParams.push(category);
    }

    if (minPrice !== null) {
        sql += ` AND p_price >= ?`;
        queryParams.push(minPrice);
    }

    if (maxPrice !== null) {
        sql += ` AND p_price <= ?`;
        queryParams.push(maxPrice);
    }

    db.query(sql, queryParams, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/:p_id',(req,res)=>{
    const sql=`select * from products where p_id=?`;
    db.query(sql,[req.params.p_id],(err,result)=>{
        if(err) throw err;
        res.json(result[0]);
});
});

router.get('/test-categories', (req, res) => {
    db.query(`SELECT * FROM products`, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.json(result); 
    });
});


router.get('/categories', (req, res) => {
    console.log('Categories route hit');
    res.json(['Category 1', 'Category 2']); 
});


const productValidation = (req,res,next) =>{
    const {p_name,p_price,p_category}=req.body;
    if(!p_name || !p_price || !p_category){
        return res.status(400).json({error : `Product's name,price and category is required !`});
    }
    next();
};

router.post('/',authenticateToken,authorizeAdmin,upload.single('p_image'),productValidation,(req,res)=> {
const{p_name, p_price, p_description, p_category}=req.body;
const p_image = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null; 
const sql=`insert into products(p_name, p_image, p_price, p_description, p_category) values (?,?,?,?,?)`;
db.query(sql,[p_name, p_image, p_price, p_description, p_category],(err,result)=>{
    if(err) throw err;
    res.status(201).json({p_id:result.insertId, p_name, p_image, p_price,p_description, p_category});
});
});

router.put('/:p_id', authenticateToken, authorizeAdmin, upload.single('p_image'), productValidation, (req, res) => {
    const { p_name, p_price, p_description, p_category } = req.body;

   
    let p_image;


    const updateProduct = () => {
        const sql = `UPDATE products SET p_name=?, p_image=?, p_price=?, p_description=?, p_category=? WHERE p_id=?`;
        db.query(sql, [p_name, p_image, p_price, p_description, p_category, req.params.p_id], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Product updated successfully' });
        });
    };

   
    if (req.file) {
       
        p_image = `http://localhost:3000/uploads/${req.file.filename}`;
        updateProduct(); 
    } else {
      
        const sqlSelect = `SELECT p_image FROM products WHERE p_id = ?`;
        db.query(sqlSelect, [req.params.p_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching existing product image' });
            }
            if (results.length > 0) {
                p_image = results[0].p_image; 
                updateProduct(); 
            } else {
                return res.status(404).json({ error: 'Product not found' });
            }
        });
    }
});



router.delete('/:p_id',authenticateToken,authorizeAdmin,(req,res)=>{
    const sql=`Delete from products where p_id=?`;
    db.query(sql,[req.params.p_id],(err,result)=>{
        if(err) throw err;
        res.json({message : 'Product deleted'});
    });
});
module.exports= router;