import { useTranslation } from 'react-i18next';
import { ScrollButton } from '../../components/ScrollButton/ScrollBtn';
import './welcomePage.css';
export function WelcomePage() {
  const { t } = useTranslation();
  return (
    <div className="welcome__page-bg">
      <div className="welcome__page">
        <ScrollButton />
        <h1 className="welcome__title">{t('welcomePage.Productivity Planner')}</h1>
        <h3 className="welcome__subtitle">
          {t('welcomePage.Set goals and actually conquer them')}
        </h3>
        <div className="welcome__desc">{t('welcomePage.description')}</div>
        <div className="welcome__rs-info">
          <h2 className="welcome__about-project-title">{t('welcomePage.About Project Title')}</h2>
          <div className="welcome__about-project">{t('welcomePage.About Project')}</div>
          <h2 className="welcome__rs-info-title">
            {t('welcomePage.RSS.Online course Development with React')}
          </h2>
          <h3 className="welcome__rs-info-subtitle">
            {t('welcomePage.RSS.Free course from The Rolling Scopes community')}
          </h3>
          <a
            href="https://wearecommunity.io/events/react-rss-2022q1"
            className="btn welcome__rs-info-btn"
          >
            {t('signInPage.Sign Up')}
          </a>
          <h4>{t('welcomePage.RSS.Who is this course for?')}</h4>
          <p className="rss-event">
            {t('welcomePage.RSS.The course is intended')}{' '}
            <span className="rss-bold">
              JavaScript, TypeScript, Git, GitHub, NPM, Webpack, CSS3 / HTML5, Chrome DevTools,
              Figma, REST API.
            </span>
          </p>
          <div className="rss-advantages">
            <div className="rss-advantage__card">
              <div className="rss-icon rss-free"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.Free education')}</h5>
                <p>
                  {t('welcomePage.RSS.Principle')}
                  {t('welcomePage.RSS.We share our knowledge')}
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <div className="rss-icon rss-time"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.Training term')}</h5>
                <p>{t('welcomePage.RSS.Webinars are held')}</p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <div className="rss-icon rss-everyone"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.For everyone')}</h5>
                <p>{t('welcomePage.RSS.Everyone')}</p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <div className="rss-icon rss-certificate"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.Certificate')}</h5>
                <p>{t('welcomePage.RSS.Certificate of successful')}</p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <div className="rss-icon rss-materials"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.Materials')}</h5>
                <p>
                  {t('welcomePage.RSS.All materials')}
                  <a href="https://www.youtube.com/c/RollingScopesSchool"> YouTube</a> and
                  <a href="https://github.com/rolling-scopes-school/"> GitHub.</a>
                </p>
              </div>
            </div>
            <div className="rss-advantage__card">
              <div className="rss-icon rss-chat"></div>
              <div className="rss-info__block">
                <h5 className="rss-advantage__card-title">{t('welcomePage.RSS.Chat')}</h5>
                <p>
                  {t('welcomePage.RSS.Open chat')}
                  <a href="https://discord.gg/zyRcphs3px"> https://discord.gg/zyRcphs3px</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome__about">
          <h3 className="welcome__subtitle">{t('welcomePage.About us')}</h3>
          <div className="cards__teams">
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/anton-png.png" alt="team-anton" />
              <div className="team__info">
                <h6>{t('welcomePage.Anton Tananka')}</h6>
                <p>{t('welcomePage.Team-lead')}</p>
                <a href="https://alivar391.github.io/rsschool-cv/">{t('welcomePage.More in CV')}</a>
              </div>
            </div>
            <div className="card__team">
              <img className="card__team-img" src="./assets/jpg/diana-png.png" alt="team-diana" />
              <div className="team__info">
                <h6>{t('welcomePage.Diana Byben')}</h6>
                <p>{t('welcomePage.Frontend Developer')}</p>
                <a href="https://dianabyben-cv.netlify.app">{t('welcomePage.More in CV')}</a>
              </div>
            </div>
            <div className="card__team">
              <img
                className="card__team-img"
                src="./assets/jpg/anastasia-png.png"
                alt="team-anastasia"
              />
              <div className="team__info">
                <h6>{t('welcomePage.Anastasia Arzhanik')}</h6>
                <p>{t('welcomePage.Frontend Developer')}</p>
                <a href="https://arzhanik-anastasia.github.io/rsschool-cv/">
                  {t('welcomePage.More in CV')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
