import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

function Topbar() {
  return (
    <div className="topbar">
      <MenuIcon className="menu-icon" />
      <div className="atelier">ATELIER</div>
      <div className="search-cart">
        <SearchIcon className="search-icon" />
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default Topbar;
