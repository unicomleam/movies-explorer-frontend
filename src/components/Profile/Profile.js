import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';

function Profile() {
  const { name, email } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
  }

  function handleChange() {
    console.log('yes change');
  }

  function handleLogout() {
    console.log('yes logout');
  }

  return (
    <div className="page page_full-heigth">
      <Header theme={{ default: false }} />

      <main className="profile">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <form id="profile__form" className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input
              type="text"
              placeholder="Имя"
              name="profile-input-name"
              id="profile-input-name"
              className="profile__input"
              value={name}
              minLength={2}
              maxLength={30}
              onChange={handleChange}/>
          </label>
          <span className="profile__divider"/>
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input
              type="email"
              placeholder="Почта"
              name="profile-input-name"
              id="profile-input-name"
              className="profile__input"
              value={email}
              onChange={handleChange}/>
          </label>
        </form>
        <div className="profile__wrapper">
          <button type="submit" form="profile__form" className="profile__btn-submit">Редактировать</button>
          <button className="profile__btn-exit" onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </main>
    </div>
  )
}

export default Profile;
