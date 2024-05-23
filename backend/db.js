import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';



const app = express();
app.use(cors({
    origin:['http://localhost:5173'],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())

app.use(session({
    secret: 'my-secret-key', // A Secret Key used to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    } // set the session cookie properties
}))



const db = mysql.createConnection({
    host: 'localhost',
    user: 'new_root',
    password: 'root',
    database: 'signup'
})

app.get('/', (req,res)=>{
    if(req.session.username){
        return res.json({Authorised: true, username: req.session.username})
    }else{
        return res.json({Authorised: false})
    }
})

app.post('/signup', (req,res)=>{
    const sql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)"
    const values = 
    [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err,result) => {
        if(err) return res.json(err,{Message: 'Error in Node'})
            return res.json(result)
    })

})
app.post('/login', (req,res)=>{
    const sql = "SELECT * FROM user WHERE email = ? and password = ? "
    db.query(sql, [req.body.email, req.body.password], (err,result) => {
        if(err) return res.json(err,{Message: 'Error in Server'})
        if(result.length > 0){
            req.session.username = result[0].username;
            console.log(req.session.username)
            return res.json({login:true})
        }else{
            return res.json({login: false})
        }
    })

})

app.listen(3000, ()=>{
    console.log("Server is litening to Port 3000")
})