var express = require('express'), router = express.Router()
var passport = require('passport');
var authmiddle = require('../../middlewares/Authentication.js');
const jwt = require('jsonwebtoken');
var User = require('../../models/User');
var Role = require('../../models/Role');

router.post('/login', (req, res, next)=>{
    passport.authenticate('login', function(err, user, info){
        console.log(user)
        if(err){
            return res.status(500).json({error:"Internal server error"});
        }
        if(!user){
            return res.status(401).json({error:"User or password invalid"});
        }
        let token = jwt.sign({
            data: user
        }, process.env.SEED , { expiresIn: 60 * 10 });
        return res.status(200).json({token:token});
    })(req, res, next)
})

router.use('/profile', passport.authenticate('jwt', { session: false }));
router.use('/profile', authmiddle.decodeToken);

router.post(('/profile'),
    function(req, res) {
        res.send(req.payload)
    }
);

router.post('/prueba', authmiddle.decodeToken,
    async function(req, res) {
        let users = await User.findAll({
            include: [{
              model: Role,
              as: 'roles'
            }]
          });
        res.send(users)
    }
);

module.exports = router
