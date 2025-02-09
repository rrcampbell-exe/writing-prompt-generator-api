import { Router, Request, Response } from 'express';
import apiRoutes from './api/index.js'

const router = Router()

router.use('/api/v1', apiRoutes)

router.use((req: Request, res: Response) => {
  res.status(404).end()
})

export default router