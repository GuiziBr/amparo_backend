import { isBefore } from 'date-fns'
import { getRepository } from 'typeorm'
import Activity from '../models/Activity'
import Patient from '../models/Patient'
import AppError from '../errors/AppError'

interface Request {
  patient: string
  description: string
  schedule: Date,
  status: 'open' | 'delayed' | 'closed'
}

class CreateActivityService {
  public async execute({
    patient, description, schedule, status,
  }: Request): Promise<Activity> {
    if (!['open', 'delayed', 'closed'].includes(status)) throw new AppError('Invalid status', 100)
    if (isBefore(schedule, new Date())) throw new AppError('Schedule date should be in the future', 101)
    const patientRepository = getRepository(Patient)
    const existingPatient = await patientRepository.findOne({ where: { document: patient }})
    if (!existingPatient) throw new AppError('Patient not found', 102, 404)
    const activityRepository = getRepository(Activity)
    const activity = activityRepository.create({
      patient_id: existingPatient.id,
      description,
      schedule,
      status,
    })
    await activityRepository.save(activity)
    return activity
  }
}

export default CreateActivityService
