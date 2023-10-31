import Header from "../Header/Header";
import { Link } from 'react-router-dom';
import auth from "../../utils/Auth";
import useValidation from "../hook/validation";

function Login({ isLoad, setIsLoad, setCurrentUser, navigate, requestError, setRequestError }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    currentInputName,
  } = useValidation();

  const handleAuthorization = (userData, e) => {
    setIsLoad(true);
    auth.loginUser(userData)
      .then(data => {
        localStorage.setItem('jwt', data.token);
        const { name, email, _id } = data;
        if (_id) {
          setCurrentUser(oldState => ({ name, email, loggeIn: true }));
          navigate('/movies');
          e.target.reset();
        };
      })
      .catch(() => setRequestError('Неверный email или пароль'))
      .finally(() => { setIsLoad(false) });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    handleAuthorization(values, e);
  };

  return (
    <main className="page page_full-heigth-1row">
      <section className="login-form">
        <Header theme={{ default: true }} />
        <h1 className="login-form__title">Рады видеть!</h1>

        <form id="auth-form" onSubmit={handleSubmitForm} className="login-form__form">
          <div className="login-form__input-row">
            <label className="login-form__input-label">E-mail</label>
            <input type="email"
              className={`login-form__input ${errors.email ? "login-form__input_error" : ""}`}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              name='email'
              placeholder='Введите email'
              onChange={handleChange}
              required/>
          </div>

          <div className="login-form__input-row">
            <label className="login-form__input-label">Пароль</label>
            <input type="password"
              name="password"
              className={`login-form__input ${errors.email ? "login-form__input_error" : ""}`}
              minLength={4}
              maxLength={24}
              placeholder='Введите пароль'
              onChange={handleChange}
              required/>
            <span className="login-form__span_error">
              {errors[currentInputName]
                ? currentInputName
                : ""
                ? requestError
                : requestError
              }
            </span>
          </div>
        </form>

        <div className="login-form__wrapper">
          <button type="submit" form="auth-form" disabled={(isLoad || !isValid) ? true : false} className="login-form__submit-btn">
            Войти
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
