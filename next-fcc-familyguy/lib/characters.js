import { endpoint } from '@/utils/endpoint'

export async function getAllCharacters() {
  const data = await fetch(`${endpoint}/characters`)
  if (!data.ok) {
    throw new Error('Falied to fetch data')
  }
  return data.json()
}

export async function getCharacterBySlug() {}
