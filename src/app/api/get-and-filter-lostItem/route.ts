import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // סימולציה של בקשה לנתונים (למשל ממסד נתונים או API חיצוני)
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
      }

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' })
    }
  } else {
    // אם הפונקציה לא מתאימה לבקשה (למשל אם לא GET)
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}