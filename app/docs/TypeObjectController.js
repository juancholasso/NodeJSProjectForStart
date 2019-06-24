var TypeObject = require('./TypeObject.js');
var path = require('path');

function getTypeObjects(){
    
}

function createTypeObject(req, res){
    try{
        TypeObject.create({
            type_object:req.body.type_object,
        })
        /**
        .then(() => {
            this.getTypeObjects(req, res, "El tipo de objeto se ha creado existosamente!", null);
        })
        .catch(
            () =>{
               this.getTypeObjects(req, res, null,"El tipo de objeto no se ha podido crear");
            }
        ) */
    }
    catch(err){
        res.send(err);
    }
}

function getTypeObject(id_object, callback){
    try{
        TypeObject.findByPk(id_object)
        .then(object => {
            return callback(object);
        })
    }
    catch(err){
        return err;
    }
}

function deleteTypeObject(req, res){
    try{
        TypeObject.destroy({
            where: {
                id_type_object: req.params.id_type_object
            }
        })/**
        .then(
            () => {
                this.getTypeObjects(req, res, "El tipo de objeto se ha eliminado exitosamente!", null);
            }
        )
        .catch(
            ()=>{
                this.getTypeObjects(req, res, null, "El tipo de objeto no se ha podido eliminar!");
            }
        ) */
    }
    catch(err){
        res.send(err);
    }
}

module.exports.getTypeObjects = getTypeObjects;
module.exports.createTypeObject = createTypeObject;
module.exports.getTypeObject = getTypeObject;
module.exports.deleteTypeObject = deleteTypeObject;