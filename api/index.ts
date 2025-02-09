import { Router, Request, Response } from 'express'
import { replaceHyphensWithSpaces } from '../utils/format-utils.js'
import rateLimiter from '../middleware/rateLimit.js'
import dotenv from 'dotenv'

dotenv.config()
 
const router = Router()
const API_KEY = process.env.OPEN_AI_API_KEY as string

const url = 'https://api.openai.com/v1/chat/completions'

const fetchPrompt = async (url: string, genre: string, theme: string) => {
  let finalPrompt
  const basePrompt = "writing prompt that introduces some context and features a character who must perform some task before a deadline or face consequences. The prompt should be a single sentence of no more than 50 words and follow a structure similar to 'In a world where (blank), (character) must (act) before (deadline) or (consequence).'"
  const genrePrompt = replaceHyphensWithSpaces(genre)
  const themePrompt = replaceHyphensWithSpaces(theme)

  finalPrompt = genrePrompt ? `Generate a ${genrePrompt} ${basePrompt}` : `Generate a ${basePrompt}`

  if (themePrompt) {
    finalPrompt += ` Ensure the prompt includes themes of ${themePrompt}.`
  }

  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      store: true,
      messages: [{
        role: 'user',
        content: finalPrompt
      }]
    })
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    const writingPrompt = data.choices[0].message.content
    return writingPrompt
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

router.get('/prompts', rateLimiter, async (req: Request, res: Response): Promise<void> => {
  const genre = req.query.genre as string
  const theme = req.query.theme as string

  try {
    const writingPrompt = await fetchPrompt(url, genre, theme)
    res.status(200).json({ response: writingPrompt })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
