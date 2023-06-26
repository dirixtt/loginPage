import express from "express";
import { create } from 'express-handlebars'
import AuthRoutes from './Routes/auth.js'
import ProductsRoutes from './Routes/products.js'
import mongoose from "mongoose";
import * as dotenv from "dotenv"
import flash from 'connect-flash'
import session from "express-session";
import varMiddleware from "./middleware/var.js";
import cookieParser from "cookie-parser";


dotenv.config()

const app = express()
const hbs = create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static("./views/public"));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
// app.use(express.cookieParser('keyboard cat'));
app.use(session({ secret: "Shaxzod", resave: false, saveUninitialized: false }));
app.use(flash())
app.use(varMiddleware)

app.use(AuthRoutes)
app.use(ProductsRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});



const PORT = process.env.PORT || 4100
app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))

