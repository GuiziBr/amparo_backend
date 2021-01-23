import { Router } from 'express'

import patientsRouter from './patients.routes'
import activitiesRouter from './activities.routes'

const routes = Router()

routes.use('/patients', patientsRouter)
routes.use('/activities', activitiesRouter)

export default routes
