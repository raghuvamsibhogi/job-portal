import express from "express"
import { saveImage,getFeatureImages } from "../../controllers/common/features.js"
const featureRouter = express.Router()
featureRouter.post('/saveImage',saveImage)
featureRouter.get('/getImages',getFeatureImages)
export default featureRouter