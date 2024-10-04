import { Router } from 'express'
import { MeasureController } from '../controllers/measure.controller'

const routes = Router()
const measureController = new MeasureController()

routes.post('/upload', measureController.uploadImageMiddleware, measureController.uploadImage.bind(measureController))
routes.patch('/confirm', measureController.confirm.bind(measureController))
routes.get('/:customerCode/list', measureController.getByCustomerCode.bind(measureController))

export default routes