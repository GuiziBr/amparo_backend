import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getRepository } from 'typeorm'
import Activity from '../models/Activity'
import CreateActivityService from '../service/CreateActivityService'
import validateDocument from '../middlewares/validateDocument'
import listActivities from '../assemblers/activityAssembler'

const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response) => {
  const activitiesRepository = getRepository(Activity)
  const activitiesList = await activitiesRepository.find()
  return response.json(listActivities(activitiesList))
})

activitiesRouter.post('/', validateDocument, async (request, response) => {
  const {
    patient, description, schedule, status,
  } = request.body
  const parsedDate = parseISO(schedule)
  const createActivity = new CreateActivityService()
  const activity = await createActivity.execute({
    patient,
    description,
    schedule: parsedDate,
    status,
  })
  return response.json(activity)
})

export default activitiesRouter
