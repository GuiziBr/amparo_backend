interface Activity {
  id: string
  patient_id: string
  description: string
  schedule: Date
  patient: {
    id: string
    document: string
    name: string
  }
}

export default function activitiesByPatient(activities: Activity[]): Array<Omit<Activity, 'patient_id'>> {
  return activities.map(({ patient_id, ...rest }) => ({
    ...rest,
  }))
}
