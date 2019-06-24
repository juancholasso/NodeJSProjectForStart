var TypePublication = require('./TypePublication.js');
var path = require('path');

function getTypePublicactions(){
    
}

function createTypePublication(req, res){
    try{
        TypePublication.create({
            type_publication: req.body.type_publication,
        })
        /**
        .then(() => {
            this.getPublicactions(req, res, "El tipo de publicacion se ha creado existosamente!", null);
        })
        .catch(
            () =>{
               this.getPublicactions(req, res, null,"El tipo de publicacion no se ha podido crear");
            }
        ) */
    }
    catch(err){
        res.send(err);
    }
}

function getTypePublication(id_publication, callback){
    try{
        TypePublication.findByPk(id_publication)
        .then(type_publication => {
            return callback(type_publication);
        })
    }
    catch(err){
        return err;
    }
}

function deleteTypePublication(req, res){
    try{
        TypePublication.destroy({
            where: {
                id_type_publication: req.params.id_type_publication
            }
        })/**
        .then(
            () => {
                this.getPublicactions(req, res, "El tipo de publicacion se ha eliminado exitosamente!", null);
            }
        )
        .catch(
            ()=>{
                this.getPublicactions(req, res, null, "El tipo de publicacion no se ha podido eliminar!");
            }
        ) */
    }
    catch(err){
        res.send(err);
    }
}

module.exports.getTypePublicactions = getTypePublicactions;
module.exports.createTypePublication = createTypePublication;
module.exports.getTypePublication = getTypePublication;
module.exports.deleteTypePublication = deleteTypePublication;