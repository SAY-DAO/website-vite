import React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

/**
 * Navbar: keeps original DOM, ids and classNames but uses react-router for internal links.
 *
 * Requirements:
 * - App must be wrapped in <BrowserRouter> higher up.
 * - Keep your style.css loaded so classes/ids style correctly.
 */
export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const toggle = (v) => () => setOpen(v);

  // helper for NavLink className to preserve 'nav-link' and add 'active' when route matches
  const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <>
      <section className="container" id="Header">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light">
          {/* responsive (small) logo */}
          <a id="logoresponsive" className="navbar-brand" href="index.html">
            <p
              id="dao-logo"
              style={{ color: '#a1a1a1', fontSize: '2em', fontWeight: 200 }}
            >
              SAY DAO
            </p>
          </a>

          {/* mobile toggler (keeps data-toggle/data-target attrs) */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            onClick={toggle(true)}
          >
            <span className="navbar-toggler-icon">
              <MenuIcon />
            </span>
          </button>

          {/* keep collapse id and structure exactly as original for CSS/js compatibility */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* big logo (desktop) */}
            <a id="logo" className="navbar-brand" href="index.html">
              <p
                id="dao-logo"
                style={{ color: '#a1a1a1', fontSize: '2.5em', fontWeight: 200 }}
              >
                SAY DAO
              </p>
            </a>

            <ul className="navbar-nav">
              {/* EN responsive - kept as anchor (static file) */}
              <li id="langresponsive">
                <a href="en/index.html">EN</a>
              </li>

              {/* Internal links now use NavLink from react-router */}
              <li className="nav-item">
                <NavLink to="/" className={navLinkClass} end>
                  خانه
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/whatis" className={navLinkClass}>
                  اول سلام
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className={navLinkClass}>
                  درباره ما
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={navLinkClass}>
                  ارتباط با ما
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/reports" className={navLinkClass}>
                  گزارش‌ها
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="https://docs.saydao.org" target="_blank" className={navLinkClass}>
                  مستندات
                </NavLink>
              </li>
              {/* App dropdown kept as original markup.
                  It uses external dapp link inside dropdown-item */}
              <li className="nav-item">
                <div className="btn-group">
                  <button
                    className="dropdown-toggle btn nav-btn"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    اپلیکیشن
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-divider" />
                    <a
                      className="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                      href="https://dapp.saydao.org"
                      style={{ textAlign: 'center' }}
                    >
                      دپلیکیشن
                      {' '}
                      <sub>(نسخه دوم)</sub>
                    </a>
                  </div>
                </div>
              </li>

              {/* EN (desktop) as anchor to static en index */}
              <li id="lang">
                <a href="en/index.html">EN</a>
              </li>
            </ul>
          </div>
        </nav>
      </section>

      {/* Mobile drawer: uses NavLink for internal items to enable client-side routing */}
      <Drawer anchor="left" open={open} onClose={toggle(false)}>
        <Box sx={{ width: 280 }} role="presentation" onClick={toggle(false)}>
          <List>
            <ListItem>
              <a
                id="logoresponsive"
                className="navbar-brand"
                href="index.html"
                style={{ textDecoration: 'none' }}
              >
                <p
                  id="dao-logo"
                  style={{
                    color: '#a1a1a1',
                    fontSize: '1.6em',
                    fontWeight: 200,
                  }}
                >
                  SAY DAO
                </p>
              </a>
            </ListItem>

            <ListItem>
              <ListItemButton component="a" href="en/index.html">
                EN
              </ListItemButton>
            </ListItem>

            <ListItem>
              {/* client-side nav for home */}
              <ListItemButton component={NavLink} to="/" exact="true">
                خانه
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={NavLink} to="/whatis">
                اول سلام
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={NavLink} to="/about">
                درباره ما
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton component={NavLink} to="/contact">
                ارتباط با ما
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://docs.saydao.org"
                target="_blank"
                rel="noreferrer"
              >
                مستندات
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://dapp.saydao.org"
                target="_blank"
                rel="noreferrer"
              >
                دپلیکیشن (نسخه دوم)
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
