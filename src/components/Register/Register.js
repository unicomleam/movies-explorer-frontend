import Header from "../Header/Header";
import { Link } from 'react-router-dom';
import auth from "../../utils/Auth";
import useValidation from "../hook/validation";

function Register({ isLoad, setCurrentUser, setIsLoad, navigate, requestError, setRequestError }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    currentInputName,
  } = useValidation();

  const handleRegistration = (userData) => {
    setIsLoad(true);

    auth.registerUser(userData)
      .then(() => {
        return auth.loginUser(userData)})
      .then(data => {
        const { name, email, _id } = data;

        if (_id) {
          localStorage.setItem('jwt', data.token);
          setCurrentUser(oldState => ({ name, email, loggeIn: true }));
          navigate('/movies');
        };
      })
      .catch(() => setRequestError('Пользователь с таким email уже зарегистрирован'))
      .finally(() => setIsLoad(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegistration(values);
  };

  return (
    <main className="page page_full-heigth-1row">
      <section className="register-form" >
        <Header theme={{ default: true }} />
        <h1 className="register-form__title">Добро пожаловать!</h1>

        <form id="auth-form" onSubmit={handleSubmit} className="register-form__form">
          <div className="register-form__input-row">
            <label className="register-form__input-label">Имя</label>
            <input type="text"
              className={`register-form__input ${errors.name ? "register-form__input_error" : ""} `}
              name="name"
              minLength={2}
              maxLength={24}
              placeholder="Введите имя"
              onChange={handleChange}
              required />
          </div>

          <div className="register-form__input-row">
            <label className="register-form__input-label">E-mail</label>
            <input type="email"
              className={`register-form__input ${errors.email ? "register-form__input_error" : ""} `}
              name="email"
              placeholder="Введите email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              onChange={handleChange}
              required/>
          </div>

          <div className="register-form__input-row">
            <label className="register-form__input-label">Пароль</label>
            <input type="password"
              className={`register-form__input ${errors.password ? "register-form__input_error" : ""} `}
              name="password"
              minLength={4}
              maxLength={24}
              placeholder="Введите пароль"
              onChange={handleChange}
              required />
            <span className="register-form__span_error">
              {errors[currentInputName]
                ? currentInputName
                : ""
                ? requestError
                : requestError
            }
            </span>
          </div>
        </form>

        <div className="register-form__wrapper">
          <button type="submit" form="auth-form" disabled={(isLoad || !isValid) ? true : false}  className="register-form__submit-btn">Зарегистрироваться</button>
          <div className="register-form__transition">
            <p className="register-form__transition-text">Уже зарегистрированы?</p>
            <Link to='/signin' className="register-form__transition-link">Войти</Link>
          </div>
        </div>
      </section>
      
    </main>
  )
}

export default Register;
