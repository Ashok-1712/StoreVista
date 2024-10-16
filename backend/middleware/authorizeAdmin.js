function authorizeAdmin(req,res,next){
    if(req.user.role !=='admin'){
        return res.status(403).json({message : "Admin access restricted"});
    }

    next();
}
module.exports = authorizeAdmin;