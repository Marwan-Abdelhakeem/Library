import express from 'express'
import './DB/db.con.js'
import authorRouter from './src/modules/author/author.routes.js'
import bookRouter from './src/modules/book/book.routes.js'

const app = express()
const port = 3000


app.use(express.json())

app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.use('/*',(req,res,next)=>{ res.status(404).json({message: 'Not found'}),next()})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))