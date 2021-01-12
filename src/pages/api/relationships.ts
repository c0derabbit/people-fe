import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const headers = { 'Content-Type': 'application/json' }
  const options = { method, headers, body: JSON.stringify(body) }

  // headers: { 'x-people-auth': process.env.PG_AUTH_TOKEN },

  try {
    const response = await fetch(`${process.env.API_BASE}/relationships/`, options)
    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    res.status(400).end()
  }
}
