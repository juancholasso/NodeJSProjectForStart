import flashMessages from '../imports/FlashMessages.js';
import ExampleController from '../controllers/ExampleController';
import fs from 'fs';
/**
 * Services for app web
 */

class ExampleService{

    constructor(){
       this.exampleController = new ExampleController;
    }

    async sendMail(req, res){
        try{
            await this.exampleController.sendMail();
            flashMessages.showSuccessMessage(req, "Exito!", "Mensaje Enviado!");
            req.session.save(()=>{ res.redirect('/home') });
        }
        catch(err){
            flashMessages.showErrorMessage(req, "Error!", "El mensaje no se pudo enviar, por favor revise las credenciales.!");
            req.session.save(()=>{ res.redirect('/home') });
        }
    }
   
    async uploadFile(req, res){
        try{
            let storagePath = 'storage/users/'+req.session.user;
            fs.mkdirSync(storagePath, { recursive: true });
            fs.writeFileSync(storagePath+'/'+req.files.foo.name, req.files.foo.data);
            flashMessages.showSuccessMessage(req, "Exito!", "El archivo se ha guardado exitosamente en el servidor!");
            req.session.save(()=>{ res.redirect('/home') });
        }
        catch(err){
            console.log(err)
            flashMessages.showErrorMessage(req, "Error!", "El archivo no se pudo guardar!");
            req.session.save(()=>{ res.redirect('/home') });
        }
    }
}

module.exports = ExampleService;
