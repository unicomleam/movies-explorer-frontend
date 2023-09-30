function Footer() {
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer">
      <h2 className="footer__description">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h2>
      <div className="footer__container">
        <ul className="footer__list">
          <li>
            <a href='https://practicum.yandex.ru/' target='_blank' rel="noopener noreferrer" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href='/' target='_blank' rel="noopener noreferrer" className="footer__link">
              Github
            </a>
          </li>
        </ul>
        <p className="footer__year">&copy; {getYear()}</p>
      </div>
    </footer>
  )
}

export default Footer;
