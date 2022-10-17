import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <a className="footer-logo" href="https://rs.school/js/"></a>
        </div>
        <time className="year" dateTime="2022">
          2022
        </time>
        <div className="footer-team">
          <a className="anton-link" href="https://github.com/alivar391"></a>
          <a className="anastasia-link" href="https://github.com/arzhanik-anastasia"></a>
          <a className="diana-link" href="https://github.com/niadi26"></a>
        </div>
      </div>
    </footer>
  );
};
