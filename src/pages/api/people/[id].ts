import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  // headers: { 'x-people-auth': process.env.PG_AUTH_TOKEN },
  const headers = { 'Content-Type': 'application/json' }
  const options = { method, headers }

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options['body'] = req.body
  }

  try {
    const response = await fetch(`${process.env.API_BASE}/people/${query.id}`, options)
    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    res.status(400).end()
  }
}
