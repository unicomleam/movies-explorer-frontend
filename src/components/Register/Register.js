import Header from "../Header/Header";
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="page page_full-heigth-1row">
      <section className="register-form">
        <Header theme={{ default: true }} />
        <h2 className="register-form__title">Добро пожаловать!</h2>

        <form className="register-form__form">
          <div className="register-form__input-row">
            <label className="register-form__input-label">Имя</label>
            <input type="text" className="register-form__input" required />
          </div>

          <div className="register-form__input-row">
            <label className="register-form__input-label">E-mail</label>
            <input type="email" className="register-form__input" required />
          </div>

          <div className="register-form__input-row">
            <label className="register-form__input-label">Пароль</label>
            <input type="password" className="register-form__input" required />
          </div>
        </form>

        <div className="register-form__wrapper">
          <button type="submit" className="register-form__submit-btn">Зарегистрироваться</button>
          <div className="register-form__transition">
            <p className="register-form__transition-text">Уже зарегистрированы?</p>
            <Link to='/signin' className="register-form__transition-link">Войти</Link>
          </div>
        </div>
      </section>
      
    </div>
  )
}

export default Register;
