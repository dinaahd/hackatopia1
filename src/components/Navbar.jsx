import React from 'react';
import StaggeredMenu from './StaggeredMenu/StaggeredMenu';
import logo from '../assets/logo.png';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'About', ariaLabel: 'Learn about Hackatopia', link: '#about' },
  { label: 'Tracks', ariaLabel: 'Explore innovation domains', link: '#domains' },
  { label: 'Rules', ariaLabel: 'Hackathon rules & guidelines', link: '#rules' },
  { label: 'Timeline', ariaLabel: '24-hour event timeline', link: '#timeline' },
  { label: 'Sponsors', ariaLabel: 'Our partners & sponsors', link: '#sponsors' },
  { label: 'FAQ', ariaLabel: 'Frequently asked questions', link: '#faq' },
  { label: 'Contact', ariaLabel: 'Get in touch with organizers', link: '#contact' }
];

const socialItems = [
  { label: 'Discord', link: 'https://discord.gg' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Devfolio', link: 'https://devfolio.co' }
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