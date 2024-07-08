import { Router } from 'express'
import * as authorControllers from './author.controller.js'

const authorRouter = Router();

authorRouter.route('/')
    .post(authorControllers.addNewAuthor)
    .get(authorControllers.getAllAuthors);

authorRouter.route('/:id')
    .get(authorControllers.getAuthorById)
    .patch(authorControllers.updateAuthorByID)
    .delete(authorControllers.deleteAuthorByID)

export default authorRouter