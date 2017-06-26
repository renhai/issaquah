import React from 'react';

export default function Footer() {
  const footerStyle = {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#f5f5f5',
    color: '#777'
  };
  return (
    <footer className="footer" style={footerStyle}>
      <div className="container-fluid">
        <p style={{margin: '20px 0'}}>© Cui 2017</p>
      </div>
    </footer>
  );
}
