import { getOptionsURL } from '../helpers'
import { QuoteService } from './QuoteService'

export enum QuoteElementDataAttribute {
  Container = 'data-sanersocialmedia-quote-container',
  IsDark = 'data-is-dark',
  IsLight = 'data-is-light',
  Quote = 'data-quote',
  QuoteText = 'data-quote-text',
  QuoteAuthor = 'data-quote-author',
  Footer = 'data-footer',
  OptionsLink = 'data-options-link',
}

export default class ElementService {
  createStyleElement(css: string): HTMLStyleElement {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    return style
  }

  createQuoteElement(dark: boolean): HTMLElement {
    const randomQuote = new QuoteService().getRandomQuote()

    const quoteContainer = document.createElement('div')
    quoteContainer.setAttribute(QuoteElementDataAttribute.Container, '')
    if (dark)
      quoteContainer.setAttribute(QuoteElementDataAttribute.IsDark, '')
    else quoteContainer.setAttribute(QuoteElementDataAttribute.IsLight, '')

    const quote = document.createElement('div')
    quote.setAttribute(QuoteElementDataAttribute.Quote, '')

    const quoteText = document.createElement('div')
    quoteText.setAttribute(QuoteElementDataAttribute.QuoteText, '')
    quoteText.textContent = randomQuote.text

    const quoteAuthor = document.createElement('div')
    quoteAuthor.setAttribute(QuoteElementDataAttribute.QuoteAuthor, '')
    quoteAuthor.textContent = `— ${randomQuote.author}`

    quote.appendChild(quoteText)
    quote.appendChild(quoteAuthor)

    const footer = document.createElement('div')
    footer.setAttribute(QuoteElementDataAttribute.Footer, '')

    const optionsLink = document.createElement('a')
    optionsLink.textContent = 'Saner Social Media Extension'
    optionsLink.href = getOptionsURL()
    optionsLink.target = '_blank'
    optionsLink.setAttribute(QuoteElementDataAttribute.OptionsLink, '')

    footer.appendChild(optionsLink)
    quoteContainer.appendChild(quote)
    quoteContainer.appendChild(footer)

    return quoteContainer
  }
}
