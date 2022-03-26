import Color from 'color'
import type { Quote } from '../types'
import { findBackgroundColor, getOptionsURL } from '../helpers'
import quotes from '../quotes'

enum QuoteDataAttribute {
  Container = 'data-chrome-extension-quote-container',
  IsDark = 'data-is-dark',
  IsLight = 'data-is-light',
  Quote = 'data-quote',
  QuoteText = 'data-quote-text',
  QuoteAuthor = 'data-quote-author',
  Footer = 'data-footer',
  OptionsLink = 'data-options-link',
}

export class QuoteService {
  getRandomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  injectRandomQuote(parent: HTMLElement): HTMLElement {
    const randomQuote = this.getRandomQuote()
    const bgColor = new Color(findBackgroundColor(parent))
    const isDark = bgColor.isDark()

    const quoteContainer = document.createElement('div')
    quoteContainer.setAttribute(QuoteDataAttribute.Container, '')
    if (isDark) quoteContainer.setAttribute(QuoteDataAttribute.IsDark, '')
    else quoteContainer.setAttribute(QuoteDataAttribute.IsLight, '')

    const quote = document.createElement('div')
    quote.setAttribute(QuoteDataAttribute.Quote, '')

    const quoteText = document.createElement('div')
    quoteText.setAttribute(QuoteDataAttribute.QuoteText, '')
    quoteText.textContent = randomQuote.text

    const quoteAuthor = document.createElement('div')
    quoteAuthor.setAttribute(QuoteDataAttribute.QuoteAuthor, '')
    quoteAuthor.textContent = `— ${randomQuote.author}`

    quote.appendChild(quoteText)
    quote.appendChild(quoteAuthor)

    const footer = document.createElement('div')
    footer.setAttribute(QuoteDataAttribute.Footer, '')

    const optionsLink = document.createElement('a')
    optionsLink.textContent = 'Chrome Extension Settings'
    optionsLink.href = getOptionsURL()
    optionsLink.target = '_blank'
    optionsLink.setAttribute(QuoteDataAttribute.OptionsLink, '')

    footer.appendChild(optionsLink)
    quoteContainer.appendChild(quote)
    quoteContainer.appendChild(footer)
    parent.after(quoteContainer)

    return quoteContainer
  }

  removeInjectedQuotes() {
    const containers = document.querySelectorAll(`[${QuoteDataAttribute.Container}]`)
    containers.forEach(container => container.remove())
  }
}
