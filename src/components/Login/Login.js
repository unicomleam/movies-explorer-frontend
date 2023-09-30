import Header from "../Header/Header";
import { Link } from 'react-router-dom';

function Login({ login }) {
  return (
    <main className="page page_full-heigth-1row">
      <section className="login-form">
        <Header theme={{ default: true }} />
        <h1 className="login-form__title">Рады видеть!</h1>

        <form className="login-form__form">
          <div className="login-form__input-row">
            <label className="login-form__input-label">E-mail</label>
            <input type="email"
              className="login-form__input"
              id='login__input_email'
              name='email'
              placeholder='Введите email'
              required/>
          </div>

          <div className="login-form__input-row">
            <label className="login-form__input-label">Пароль</label>
            <input type="password"
              name="password"
              id='login__input_password'
              className="login-form__input"
              minLength={4}
              maxLength={24}
              placeholder='Введите пароль'
              required/>
          </div>
        </form>

        <div className="login-form__wrapper">
          <button type="submit" onClick={login} className="login-form__submit-btn">
            <Link to='/' className="link">Войти</Link>
          </button>
          <div className="login-form__transition">
            <p className="login-form__transition-text">Ещё не зарегистрированы?</p>
            <Link to='/signup' className="login-form__transition-link">Регистрация</Link>
          </div>
        </div>
      </section>
      
    </main>
  )
}

export default Login;
