import { Router } from 'express'
import * as bookControllers from './book.controller.js'

const bookRouter = Router();

bookRouter.route('/')
    .post(bookControllers.createANewBook)
    .get(bookControllers.getAllBooks);

bookRouter.route('/:id')
    .get(bookControllers.getBookById)
    .patch(bookControllers.updateBookByID)
    .delete(bookControllers.deleteBookByID)



export default bookRouter