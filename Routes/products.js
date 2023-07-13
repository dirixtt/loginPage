import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200)
    res.render('index', {
        title: "AI bot",
    
    })
})
router.get('/chat', (req, res) => {
    res.status(200)
    res.render('./chat-main/index', {
        title: "AI bot",
    
    })
})


router.get('/add', (req, res) => {
    res.render('add', {
        title: "Add",
        isAdd: true
    })
})
router.get('/products', (req, res) => {
    res.render('products', {
        title: "Products",
        isRegister: true
    })
})
export default router

