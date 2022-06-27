const jwt = require('jsonwebtoken');


exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = {userId};
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }else{
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'requête invalide non autorisé'})
    }
}

exports.verifyItem = (req, res, next) => {
    let user = req.auth.userId;
    //console.log(user);
    let thing = req.thing.userId
    //console.log(thing);
    if (user !== thing) {
        return res.status(403).json({
            error: 'Accès refusé'
        })
    }
    next();
}

