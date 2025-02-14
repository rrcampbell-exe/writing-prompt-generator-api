import { expect, test, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import router from './index.js'
import dotenv from 'dotenv'

// load environment variables
dotenv.config()

// create an instance of the express app and use the router
const app = express()
app.use(express.json())
app.use('/api', router)

// mock fetch function
global.fetch = vi.fn()

// ensure the API keys are set before each test
beforeEach(() => {
  if (!process.env.OPEN_AI_API_KEY || !process.env.WPG_API_KEY) {
    throw new Error('OPEN_AI_API_KEY or WPG_API_KEY is not set in the environment variables')
  }
})

// test the /prompts endpoint with valid genre and theme
test('GET /api/prompts with valid genre and theme', async () => {
  const mockResponse = {
    choices: [
      {
        message: {
          content: 'In a world where magic exists, a young wizard must find the lost spellbook before the next full moon or lose their powers forever.'
        }
      }
    ]
  }

  vi.mocked(fetch).mockResolvedValueOnce({
    json: async () => mockResponse,
    ok: true
  } as Response)

  const response = await request(app)
    .get('/api/prompts?genre=fantasy&theme=magic')
    .set('x-wpg-api-key', process.env.WPG_API_KEY as string)

  expect(response.status).toBe(200)
  expect(response.body.response).toBe(mockResponse.choices[0].message.content)
})

// test the /prompts endpoint with rate limit error
test('GET /api/prompts with rate limit error', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    json: async () => ({ error: { code: 'rate_limit_exceeded' } }),
    ok: false
  } as Response)

  const response = await request(app)
    .get('/api/prompts?genre=fantasy&theme=magic')
    .set('x-wpg-api-key', process.env.WPG_API_KEY as string)

  expect(response.status).toBe(429)
  expect(response.body.error).toBe('Easy, eager writer. Please wait a few seconds before asking for another prompt.')
})

// test the /prompts endpoint with invalid response structure
test('GET /api/prompts with invalid response structure', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    json: async () => ({}),
    ok: true
  } as Response)

  const response = await request(app)
    .get('/api/prompts?genre=fantasy&theme=magic')
    .set('x-wpg-api-key', process.env.WPG_API_KEY as string)

  expect(response.status).toBe(500)
  expect(response.body.error).toBe('The writing prompt generator has cramped up. Please try again later.')
})

// test the /prompts endpoint with missing API key
test('GET /api/prompts with missing API key', async () => {
  process.env.WPG_API_KEY = ''

  const response = await request(app).get('/api/prompts?genre=fantasy&theme=magic')

  expect(response.status).toBe(403)
  expect(response.body.error).toBe('Forbidden: Invalid API Key')
})
