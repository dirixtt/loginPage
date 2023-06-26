import { Router } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../services/token.js'
const router = Router()

router.get('/login', (req, res) => {
    if(req.cookies.token){
        res.redirect("/")
        return
    }
    res.render('login', {
        title: "Login | AI bot",
        isLogin: true,
        loginError: req.flash("loginError")
    })
})
router.get('/register', (req, res) => {
    if(req.cookies.token){
        res.redirect("/")
        return
    }
    res.render('register', {
        title: "Register | AI bot",
        isRegister: true,
        registerError: req.flash("registerError")
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash("loginError", 'All fields is required')
        res.redirect('/login')
        return
    }
    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash("loginError", 'User not found')
        res.redirect('/login')
        return
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        req.flash("loginError", 'Password or Email is wrong')
        res.redirect('/login')
        return
    }

    const token = generateToken(existUser._id)
    res.cookie("token", token,{httpOnly: true, secure: true})
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
})

router.post("/register", async (req, res) => {
    const { email, password, firstname, lastname } = req.body
    if (!email || !password || !firstname || !lastname) {
        req.flash("registerError", 'All fields is required')
        res.redirect('/register')
        return
    }

    const candidate = await User.findOne({email})

    if(candidate){
        req.flash('registerError', "User already exist")
        res.redirect("/register")
        return

    }

    const hashpass = await bcrypt.hash(password, 11)
    const userData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashpass
    }
    const user = await User.create(userData)
    const token = generateToken(user.id)
    res.cookie("token", token,{httpOnly: true, secure: true})
    console.log(token,"hi")
    res.redirect('/login')
})

export default router