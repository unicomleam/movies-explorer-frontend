function AboutProject() {
  return (
    <section id="aboutProject" className="aboutProject">
      <h2 className='aboutProject__description'>О проекте</h2>
      <ul className="aboutProject__list">
        <li>
          <h3 className="aboutProject__title">Дипломный проект включал&nbsp;5 этапов</h3>
          <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </li>
        <li>
          <h3 className="aboutProject__title">На&nbsp;выполнение диплома ушло&nbsp;5 недель</h3>
          <p className="aboutProject__text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="aboutProject__container">
        <p className="aboutProject__line aboutProject__line_green">1 неделя</p>
        <p className="aboutProject__line">4 недели</p>
        <p className="aboutProject__line-name">Back-end</p>
        <p className="aboutProject__line-name">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;
