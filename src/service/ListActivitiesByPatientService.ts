import { getRepository } from 'typeorm'
import Patient from '../models/Patient'
import Activity from '../models/Activity'
import AppError from '../errors/AppError'

interface Request {
  document: string
}

class ListActivitiesByPatientService {
  public async execute({ document }: Request): Promise<Activity[] | []> {
    const patientsRepository = getRepository(Patient)
    const patient = await patientsRepository.findOne({ where: { document }})
    if (!patient) throw new AppError('Patient not found', 404)
    const activitiesRepository = getRepository(Activity)
    const activities = await activitiesRepository.find({ where: { patient_id: patient.id }})
    return activities
  }
}

export default ListActivitiesByPatientService
