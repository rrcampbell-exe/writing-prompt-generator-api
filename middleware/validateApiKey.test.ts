import { expect, test } from 'vitest'
import request from 'supertest'
import express from 'express'
import validateApiKey from './validateApiKey.js'
import dotenv from 'dotenv'

// load environment variables from .env file
dotenv.config()

// create an instance of the express app and use the validateApiKey middleware
const app = express()
app.use(validateApiKey)
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Success' })
})

// test the validateApiKey middleware
test('should allow requests with valid API key', async () => {
  const response = await request(app)
    .get('/test')
    .set('x-wpg-api-key', process.env.WPG_API_KEY as string)

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('Success')
})

test('should block requests with invalid API key', async () => {
  const response = await request(app)
    .get('/test')
    .set('x-wpg-api-key', 'invalid-api-key')

  expect(response.status).toBe(403)
  expect(response.body.error).toBe('Forbidden: Invalid API Key')
})

test('should block requests with missing API key', async () => {
  const response = await request(app).get('/test')

  expect(response.status).toBe(403)
  expect(response.body.error).toBe('Forbidden: Invalid API Key')
})

test('should allow requests in development mode without API key', async () => {
  process.env.NODE_ENV = 'development'

  const response = await request(app).get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('Success')

  // restore the environment
  process.env.NODE_ENV = 'test'
})
