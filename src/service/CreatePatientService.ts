import { getRepository } from 'typeorm'
import Patient from '../models/Patient'
import AppError from '../errors/AppError'

interface Request {
  name: string
  document: string
}

class CreatePatientService {
  public async execute({ name, document }: Request): Promise<Patient> {
    const patientsRepository = getRepository(Patient)
    const existingPatient = await patientsRepository.findOne({ where: { document }})
    if (existingPatient) throw new AppError('Patient already exists')
    const patient = patientsRepository.create({ name, document })
    await patientsRepository.save(patient)
    return patient
  }
}

export default CreatePatientService
