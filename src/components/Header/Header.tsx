import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../data/constants';
import { useScrollHeader } from '../../hooks/useScrollHeader';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollHeader();
  const { token, signout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signout();
    setMenuOpen(false);
    navigate('/');
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="container header__inner">
        <Logo variant="header" showSlogan className="header__logo" onClick={() => setMenuOpen(false)} />

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} id="main-nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          {token ? (
            <>
              <Link to="/portal" className="btn btn--ghost btn--sm" onClick={() => setMenuOpen(false)}>
                Portal
              </Link>
              <button type="button" className="btn btn--primary btn--sm" onClick={handleSignOut}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">Entrar</Link>
              <Link to="/matricula" className="btn btn--primary btn--sm">Matricule-se</Link>
            </>
          )}
          <button
            type="button"
            className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
