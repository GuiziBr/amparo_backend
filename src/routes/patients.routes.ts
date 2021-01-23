import { Router } from 'express'
import { getRepository } from 'typeorm'
import Patient from '../models/Patient'
import CreatePatientsService from '../service/CreatePatientService'
import validateDocument from '../middlewares/validateDocument'

const patientsRouter = Router()

patientsRouter.get('/:document', validateDocument, async (request, response) => {
  const patientsRepository = getRepository(Patient)
  const { document } = request.params
  const patient = await patientsRepository.findOne({ where: { document }})
  return response.json(patient)
})

patientsRouter.post('/', validateDocument, async (request, response) => {
  const { name, document } = request.body
  const createPatient = new CreatePatientsService()
  const patient = await createPatient.execute({ name, document })
  return response.json(patient)
})

export default patientsRouter
