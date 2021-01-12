import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const options = { method, headers: {} }

  // headers: { 'x-people-auth': process.env.PG_AUTH_TOKEN },

  if (method === 'POST') {
    options['body'] = body
    options.headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(`${process.env.API_BASE}/people`, options)
    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    res.status(400).end()
  }
}
