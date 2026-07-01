import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Replicate the contact form schema for testing
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

describe('Contact Form Validation', () => {
  it('should accept valid contact data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'Hello, I have a question about your services.'
    }
    const result = contactSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject empty name', () => {
    const invalidData = {
      name: 'A',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'Hello, I have a question about your services.'
    }
    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined()
    }
  })

  it('should reject invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'not-an-email',
      subject: 'General Inquiry',
      message: 'Hello, I have a question about your services.'
    }
    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined()
    }
  })

  it('should reject empty subject', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: '',
      message: 'Hello, I have a question about your services.'
    }
    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.subject).toBeDefined()
    }
  })

  it('should reject too short message', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'General Inquiry',
      message: 'Hi'
    }
    const result = contactSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined()
    }
  })

  it('should reject empty form', () => {
    const emptyData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    const result = contactSchema.safeParse(emptyData)
    expect(result.success).toBe(false)
  })
})
