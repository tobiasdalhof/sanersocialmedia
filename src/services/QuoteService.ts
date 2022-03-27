import type { Quote } from '../types'
import quotes from '../quotes'

export class QuoteService {
  getRandomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
}
