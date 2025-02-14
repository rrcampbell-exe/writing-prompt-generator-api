import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

// Rate limiting middleware
const rateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 3 * 60 * 60 * 1000, // 3 hours
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: "In a world where a writer pings the Writing Prompt Generator too frequently, they never actually get to writing. Please try again in a few hours. 😊"
  }
})

export default rateLimiter
