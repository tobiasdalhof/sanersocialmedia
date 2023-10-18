import { getOptionsURL } from '~/chrome'
import { getRandomQuote } from '~/quotes'

export enum WidgetDataAttribute {
  Container = 'data-sanersocialmedia-widget-container',
  IsDark = 'data-is-dark',
  IsLight = 'data-is-light',
  HideOptionsLink = 'data-hide-options-link',
  Quote = 'data-quote',
  QuoteText = 'data-quote-text',
  QuoteAuthor = 'data-quote-author',
  Footer = 'data-footer',
  OptionsLink = 'data-options-link',
}

interface createWidgetOptions {
  isDark: boolean
}

export default class WidgetService {
  createWidget(options: createWidgetOptions): HTMLElement {
    const randomQuote = getRandomQuote()

    const quoteContainer = document.createElement('div')
    quoteContainer.setAttribute(WidgetDataAttribute.Container, '')
    if (options.isDark)
      quoteContainer.setAttribute(WidgetDataAttribute.IsDark, '')
    else quoteContainer.setAttribute(WidgetDataAttribute.IsLight, '')

    const quote = document.createElement('div')
    quote.setAttribute(WidgetDataAttribute.Quote, '')

    const quoteText = document.createElement('div')
    quoteText.setAttribute(WidgetDataAttribute.QuoteText, '')
    quoteText.textContent = randomQuote.text

    const quoteAuthor = document.createElement('div')
    quoteAuthor.setAttribute(WidgetDataAttribute.QuoteAuthor, '')
    quoteAuthor.textContent = `— ${randomQuote.author}`

    quote.appendChild(quoteText)
    quote.appendChild(quoteAuthor)

    const footer = document.createElement('div')
    footer.setAttribute(WidgetDataAttribute.Footer, '')

    const optionsLink = document.createElement('a')
    optionsLink.textContent = 'Saner Social Media Extension'
    optionsLink.href = getOptionsURL()
    optionsLink.target = '_blank'
    optionsLink.setAttribute(WidgetDataAttribute.OptionsLink, '')

    footer.appendChild(optionsLink)

    quoteContainer.appendChild(quote)
    quoteContainer.appendChild(footer)

    return quoteContainer
  }
}
