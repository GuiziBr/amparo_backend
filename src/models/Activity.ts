import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm'

import Patient from './Patient'

@Entity('activities')
class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  patient_id: string

  @ManyToOne(() => Patient, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient

  @Column()
  description: string

  @Column('date')
  schedule: Date

  @Column()
  status: 'open' | 'delayed' | 'closed'
}

export default Activity
