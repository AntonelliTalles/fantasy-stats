import api from './api'

export async function asyncGetPlayers() {
  const response = await api.get('/players')
  return response.data
}
