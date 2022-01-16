import React from 'react';
import Menu from '@material-ui/icons/Menu';
import FavoritesBorder from '@material-ui/icons/FavoriteBorder';
import Map from '@material-ui/icons/Map';
import Search from '@material-ui/icons/Search';
import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-right">
        <div className="burger-menu-icon">
          <Menu />
        </div>
      </div>
      <div className="header-left">
        <div className="map-search-icon">
          <Map />
        </div>
        <div className="favorites-icon">
          <FavoritesBorder />
        </div>
        <div className="search-icon">
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
