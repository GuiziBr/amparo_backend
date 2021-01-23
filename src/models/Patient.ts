import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('patients')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  document: string

  @Column()
  name: string
}

export default Patient
