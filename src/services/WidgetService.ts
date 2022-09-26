import { getOptionsURL } from '../helpers'
import { QuoteService } from './QuoteService'

export enum QuoteWidgetDataAttribute {
  Container = 'data-sanersocialmedia-quote-container',
  IsDark = 'data-is-dark',
  IsLight = 'data-is-light',
  HideOptionsLink = 'data-hide-options-link',
  Quote = 'data-quote',
  QuoteText = 'data-quote-text',
  QuoteAuthor = 'data-quote-author',
  Footer = 'data-footer',
  OptionsLink = 'data-options-link',
}

interface CreateQuoteWidgetOptions {
  isDark: boolean
}

export default class WidgetService {
  createQuoteWidget(options: CreateQuoteWidgetOptions): HTMLElement {
    const randomQuote = new QuoteService().getRandomQuote()

    const quoteContainer = document.createElement('div')
    quoteContainer.setAttribute(QuoteWidgetDataAttribute.Container, '')
    if (options.isDark)
      quoteContainer.setAttribute(QuoteWidgetDataAttribute.IsDark, '')
    else quoteContainer.setAttribute(QuoteWidgetDataAttribute.IsLight, '')

    const quote = document.createElement('div')
    quote.setAttribute(QuoteWidgetDataAttribute.Quote, '')

    const quoteText = document.createElement('div')
    quoteText.setAttribute(QuoteWidgetDataAttribute.QuoteText, '')
    quoteText.textContent = randomQuote.text

    const quoteAuthor = document.createElement('div')
    quoteAuthor.setAttribute(QuoteWidgetDataAttribute.QuoteAuthor, '')
    quoteAuthor.textContent = `— ${randomQuote.author}`

    quote.appendChild(quoteText)
    quote.appendChild(quoteAuthor)

    const footer = document.createElement('div')
    footer.setAttribute(QuoteWidgetDataAttribute.Footer, '')

    const optionsLink = document.createElement('a')
    optionsLink.textContent = 'Saner Social Media Extension'
    optionsLink.href = getOptionsURL()
    optionsLink.target = '_blank'
    optionsLink.setAttribute(QuoteWidgetDataAttribute.OptionsLink, '')

    footer.appendChild(optionsLink)

    quoteContainer.appendChild(quote)
    quoteContainer.appendChild(footer)

    return quoteContainer
  }
}
