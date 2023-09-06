import student from '../../../images/main/student.png';

function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
      <h2 className="aboutMe__description">Студент</h2>
      <div className="aboutMe__wrapper">
        <img className="aboutMe__photo" alt="фотография студента" src={student} />
        <div className="aboutMe__column">
          <h3 className="aboutMe__title">Виталий</h3>
          <p className="aboutMe__subtitle">Фронтенд-разработчик, 35 лет</p>
          <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена&nbsp;
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href='/' target='_blank' rel="noopener noreferrer" className="aboutMe__link">Github</a>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
