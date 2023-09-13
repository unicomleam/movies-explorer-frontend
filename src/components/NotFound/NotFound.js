import { Link } from "react-router-dom";

function NotFound () {
  return (
    <main>
      <section className="notFound">
        <h2 className="notFound__title">404</h2>
        <p className="notFound__text">Страница не найдена</p>
        <Link className="notFound__link" to={-1}>Назад</Link>
      </section>
    </main>
  )
}

export default NotFound;
