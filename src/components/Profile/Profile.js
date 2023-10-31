import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import useValidation from "../hook/validation";
import auth from '../../utils/Auth';

function Profile({ isLoad, setIsLoad, setCurrentUser, navigate, setClearValues }) {
  const { name, email } = useContext(CurrentUserContext);
  const [ responseError, setResponseError ] = useState(null);
  const [ responseSuccess, setResponseSuccess ] = useState(null);
  const {
    values,
    setValues,
    errors,
    isValid,
    setIsValid,
    handleChange,
  } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoad(true);

    auth.updateUserInfo({ name: values['name'], email: values['email'], })
      .then(data => {
        setCurrentUser({ ...data, loggeIn: true })
        setResponseSuccess('Данные изменены')
        setIsValid(true)
      })
      .catch(err => { setResponseError('Пользователь с таким email уже зарегистрирован') })
      .finally(() => setIsLoad(false));
  };

  const handleLogout = () => {
      setClearValues();
      navigate("/", {replace: true});
  };

  useEffect(() => {
    if (name === values['name'] && email === values['email']) {
      setIsValid(false);
    }
  }, [values]);

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
      });
    }
  }, [name, email, setValues]);

  return (
    <div className="page page_full-heigth">
      <Header theme={{ default: false }} />

      <main className='profile'>
      <section>
        <h1 className="profile__title">{`Привет, ${name}!`}</h1>
        <form id="profile__form" className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input
              type="text"
              placeholder="Введите имя"
              name="name"
              id="profile-input-name"
              className={`profile__input ${errors.name ? 'profile__input_error' : ''}`}
              value={values?.name || ''}
              minLength={2}
              maxLength={30}
              onChange={handleChange}/>
          </label>
          <span className="profile__divider"/>
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input
              type="email"
              placeholder="Введите почту"
              name="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              id="profile-input-name"
              className={`profile__input ${errors.email ? 'profile__input_error' : ''}`}
              value={values?.email || ''}
              onChange={handleChange}/>
          </label>
          <span className={`profile__result ${responseSuccess ? 'profile__result_success' : responseError ? 'profile__result_error' : ''}`}>
            {(responseSuccess ?? '') || (responseError ?? '')}
          </span>
        </form>
        <div className="profile__wrapper">
          <button type="submit" form="profile__form" disabled={(isLoad || !isValid) ? true : false} className="profile__btn-submit">Редактировать</button>
          
          <button type='button' className="profile__btn-exit" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </section>
      </main>
    </div>
  )
}

export default Profile;
