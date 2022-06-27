const Thing = require('../models/Thing');
const fs = require('fs');

exports.thingId = (req, res, next, id) =>{
    Thing.findById(id).exec((err, thing) =>{
        if (err || !thing) {
            return res.status(400).json({
                error: "Le produit n'a pas été trouvé"
            });
        }
        req.thing = thing;
        //console.log(req.thing);
        next();
    });
};

exports.createThing = (req, res)=>{
    //console.log(req.body.thing);

    //const thingObject = JSON.parse(req.body.thing)
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.userId,
        price: req.body.price
    });

    thing.save()
        .then(()=> res.status(201).json({message: "Objet enregistré !"}))
        .catch(error => res.status(400).json({error}));
};

exports.updateThing = (req, res) => {
    //const thing = req.file
    //console.log(thing);

    try {
        if (req.file) {
            Thing.findOne({_id : req.params.thingId})
            .then(thing => {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.updateOne({_id : req.params.thingId}, {...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, _id : req.params.id})
                        .then(() => res.status(200).json({message: 'Objet modifié !'}))
                        .catch(error => res.status(400).json({error}));
                })
                
            })
            .catch(error => res.status(500).json({error}));
        }
        else{
            Thing.updateOne({_id : req.params.thingId}, {...req.body, _id : req.params.id})
                .then(() => res.status(200).json({message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({error}));
        }
    } catch (error) {
        res.status(400).json({error: 'tous les champs sont requis'})
    }

};

exports.deleteThing = (req, res) => {
    Thing.findOne({_id: req.params.thingId})
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id : req.params.thingId})
                    .then(() => res.status(200).json({message: "Objet supprimé"}))
                    .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error => res.status(500).json({error}));
    
    
};

exports.getOneThing = (req, res)=>{
    Thing.findOne({_id: req.params.thingId})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}))
};

exports.getThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}))
};



