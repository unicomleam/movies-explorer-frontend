function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer" className="portfolio__link portfolio__line">
            Статичный сайт
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer" className="portfolio__link portfolio__line">
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer" className="portfolio__link">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
