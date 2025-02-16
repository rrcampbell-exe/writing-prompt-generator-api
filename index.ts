import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router.js'

dotenv.config()

const app: Application = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080

app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    /^(https?:\/\/)?(www\.)?writing-prompt-generator\.com$/
  ]
}))

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`Be inspired! Writing prompts are now available on port http://localhost:${PORT} 📝`)
})
