import express from 'express'
import searchProduct from '../../controllers/shop/search.js'
const SearchRouter = express.Router()
SearchRouter.get('/searchProduct',searchProduct)
export default SearchRouter