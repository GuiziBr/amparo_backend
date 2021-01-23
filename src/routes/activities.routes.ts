import { parseISO } from 'date-fns'
import { Router } from 'express'
import ListActivitiesByPatientService from '../service/ListActivitiesByPatientService'
import CreateActivityService from '../service/CreateActivityService'
import validateDocument from '../middlewares/validateDocument'
import activityAssembler from '../assemblers/activityAssembler'

const activitiesRouter = Router()

activitiesRouter.get('/:document', validateDocument, async (request, response) => {
  const { document } = request.params
  const listActivitiesByPatient = new ListActivitiesByPatientService()
  const activities = await listActivitiesByPatient.execute({ document })
  return response.json(activityAssembler(activities))
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
