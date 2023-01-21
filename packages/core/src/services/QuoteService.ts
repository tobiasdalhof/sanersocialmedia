import type { Quote } from '../types'
import quotes from '../quotes'

export default class QuoteService {
  getRandomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
}
