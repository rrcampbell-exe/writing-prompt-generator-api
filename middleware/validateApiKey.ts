import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const WPG_API_KEY = process.env.WPG_API_KEY as string

const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    return next()
  }
  
  const apiKey = req.headers['x-wpg-api-key'] as string

  if (apiKey && apiKey === WPG_API_KEY) {
    next()
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid API Key' })
  }
}

export default validateApiKey
