import React from 'react';
import StaggeredMenu from './StaggeredMenu/StaggeredMenu';
import logo from '../assets/logo.png';

const menuItems = [
  { label: 'About', ariaLabel: 'Learn about Hackatopia', link: '#about' },
  { label: 'Tracks', ariaLabel: 'Explore innovation domains', link: '#domains' },
  { label: 'Timeline', ariaLabel: '24-hour event timeline', link: '#timeline' },
  { label: 'Coordinators', ariaLabel: 'Central event coordinators', link: '#coordinators' },
  { label: 'Location', ariaLabel: 'Venue and location map', link: '#map' },
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com/hackatopia' },
];

const Navbar = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#00e5ff"
      changeMenuColorOnOpen={true}
      colors={['#00e5ff', '#ff2ea6', '#09031c']}
      logoUrl={logo}
      accentColor="#00e5ff"
      isFixed={true}
    />
  );
};

export default Navbar;