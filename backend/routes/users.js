const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();


const authenticateToken = require('../middleware/authenticateToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');


const userValidation = (req,res,next) =>{
    const {u_email,u_password}=req.body;
    if(!u_email || !u_password){
        return res.status(400).json({error : `Email and password is required !`});
    }
    next();
};


router.get('/',(req,res)=>{
    const sql=`select * from users`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
    });


router.get('/:u_id',(req,res)=>{
    const sql=`select * from users where u_id=?`;
    db.query(sql,[req.params.u_id],(err,result)=>{
        if(err) throw err;
        res.json(result[0]);
});
});



router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const [existingUser] = await db.promise().query(`SELECT * FROM users WHERE u_email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "The user already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = { u_email: email, u_password: passwordHash, role: role || 'user' };

        await db.promise().query(`INSERT INTO users SET ?`, newUser);
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.promise().query(`SELECT * FROM users WHERE u_email = ?`, [email]);
        const user = users[0];
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.u_password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.u_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:u_id',authenticateToken,authorizeAdmin,(req,res)=>{
    const sql=`Delete from users where u_id=?`;
    db.query(sql,[req.params.u_id],(err,result)=>{
        if(err) throw err;
        res.json({message : 'User deleted'});
    });
});
module.exports = router;
