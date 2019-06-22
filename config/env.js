//PORT LISTENING SERVER
process.env.PORT = process.env.PORT || 3000

//Server
process.env.PRODUCTION = false

//VARIABLES DATABASE
process.env.DB_HOST = process.env.DB_HOST || "ec2-23-23-195-205.compute-1.amazonaws.com"
process.env.DB_DATABASE = process.env.DB_DATABASE || "d1pqh8mlom488f"
process.env.DB_USERNAME = process.env.DB_USERNAME || "xvxhwarcjquwwy"
process.env.DB_PASSWORD = process.env.DB_PASSWORD || "183de43800d7a9e6b0cfad455783b15383ff8260c92647250de71824f17b8bfc"
process.env.DB_DIALECT = process.env.DB_DIALECT || "postgres"

//DATA ADMIN
process.env.ADMIN_ROLE = "admin"
process.env.ADMIN_NAME = "Juan Pablo"
process.env.ADMIN_LASTNAME = "Camargo Lasso"
process.env.ADMIN_PASSWORD = "1234Juan"
process.env.ADMIN_EMAIL = "jpcamargol@unbosque.edu.co"
process.env.ADMIN_TELEPHONE = "3223737426"
process.env.ADMIN_IDDOCUMENT = "1233691706"
process.env.ADMIN_IDUSER = 1
process.env.ADMIN_IDROL = 1

//VARIABLES MAIL
process.env.MAIL_SERVICE = "gmail"
process.env.MAIL_USER = "example@gmail.com"
process.env.MAIL_PASSWORD = "1234Admin"


//JWT
process.env.SEED = process.env.SEED || "r27-@B_tQ6C+dx2MpsTP$F8*k+3J+Q"