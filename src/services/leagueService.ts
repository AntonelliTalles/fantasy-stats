import { League } from '../types/league'
import api from './api'

export async function asyncGetLeagues(): Promise<League[]> {
  const response = await api.get<League[]>('/leagues')
  return response.data
}
