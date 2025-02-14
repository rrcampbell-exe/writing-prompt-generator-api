import { expect, test } from 'vitest'
import request from 'supertest'
import express from 'express'
import rateLimiter from './rateLimit.js'

// create an instance of the express app and use the rate limiter middleware
const app = express()
app.use(rateLimiter)
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Success' })
})

// test the rate limiter middleware
test('should allow requests under the rate limit', async () => {
  for (let i = 0; i < 9; i++) {
    const response = await request(app).get('/test')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Success')
  }
})

test('should block requests over the rate limit', async () => {
  for (let i = 0; i < 10; i++) {
    await request(app).get('/test')
  }

  const response = await request(app).get('/test')
  expect(response.status).toBe(429)
  expect(response.body.error).toBe("In a world where a writer pings the Writing Prompt Generator too frequently, they never actually get to writing. Please try again in a few hours. 😊")
})
