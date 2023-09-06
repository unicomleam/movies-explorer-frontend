import { Link } from 'react-router-dom';

function Navigation({ isOpenBurger }) {
  return(
    <div className={`navigation ${isOpenBurger ? 'navigation_active' : ''}`}>
      <Link to='/' className='navigation__link navigation__link_home'>Главная</Link>
      <ul className='navigation__list'>
        <li>
          <Link to='/movies' className='navigation__link'>Фильмы</Link>
        </li>
        <li>
          <Link to='/saved-movies' className='navigation__link'>Сохраненные фильмы</Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__profile" />
    </div>
  )
}

export default Navigation;
