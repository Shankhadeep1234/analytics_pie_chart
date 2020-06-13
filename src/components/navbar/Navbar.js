import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const OHNavbar = () => {
  const urls = [
    {
      text: 'Live',
      url: '',
      isExternal: true,
    },
  ];

  const renderUrls = () =>
    urls.map(({ text, url }, index) => (
      <Nav.Link key={index} href={url}>
        {text}
      </Nav.Link>
    ));

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">{renderUrls()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default OHNavbar;
