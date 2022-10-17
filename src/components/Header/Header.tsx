import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './header.css';
import { useTranslation } from 'react-i18next';
import { TOKEN } from '../../constants/constants';
import { IUserFromToken } from '../../pages/UpdateUserPage/UpdateUserPage';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tokenState = useAppSelector((state) => state.userInfo.token.token);
  const token = (tokenState || TOKEN()) as string;
  let userName = 'user';
  if (token) {
    const decodedToken: IUserFromToken = jwt_decode(token);
    userName = decodedToken.login;
  }
  const [scroll, setScroll] = useState(false);
  const changeStyle = () => {
    if (window.scrollY >= 70) {
      setScroll(true);
    } else if (window.scrollY < 40) {
      setScroll(false);
    }
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const logoutUser = () => {
    dispatch(setToken({ token: null }));
    localStorage.clear();
    navigate('/welcome', { replace: true });
  };

  window.addEventListener('scroll', changeStyle);

  return (
    <header className={!scroll ? 'header' : 'header active'}>
      <div className="header__home-button">
        <Link to="/welcome">
          <img
            src="./../assets/png/home-icon-silhouette.png"
            alt="home-button"
            className="header__icon"
          />
        </Link>
        {TOKEN() && (
          <Link to="/">
            <div className="link__board"> {t('header.Go to main Page')}</div>
          </Link>
        )}
      </div>

      <div className="header__button-block">
        {!TOKEN() && (
          <div>
            <Link to="/signin">
              <span className="header__action-button">
                <img
                  src="./../assets/png/enter.png"
                  alt="login-button"
                  className="header__icon-small"
                />
                {t('header.login')}
              </span>
            </Link>
            <Link to="/signup">
              <span className="header__action-button">{t('header.signup')}</span>
            </Link>
          </div>
        )}
        {TOKEN() && (
          <div className="header__user-name-block">
            <Link to="/update-user">
              <span className="header__action-button  header__username">
                <img
                  src="./../assets/png/user-profile.png"
                  alt="login-button"
                  className="header__icon-small"
                />
                {userName}
              </span>
            </Link>
            <span className="header__action-button" onClick={logoutUser}>
              <img
                src="./../assets/png/logout.png"
                alt="login-button"
                className="header__icon-small"
              />
              {t('header.logout')}
            </span>
          </div>
        )}
        <select className="header__change-lang" onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="ru">РУС</option>
        </select>
      </div>
    </header>
  );
}
