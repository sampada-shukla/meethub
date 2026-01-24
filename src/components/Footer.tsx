const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        padding: '32px 16px 24px',
        textAlign: 'center',
        background: 'transparent',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Links */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '28px',
          flexWrap: 'wrap',
          fontSize: '16px',
          color: '#9ca3af',
          marginBottom: '12px',
        }}
      >
        <a href="#" style={linkStyle}>Privacy Policy</a>
        <a href="#" style={linkStyle}>Terms of Service</a>
        <a href="#" style={linkStyle}>Cookie Policy</a>
        <a href="#" style={linkStyle}>Security</a>
      </div>

      {/* Copyright */}
      <div
        style={{
          fontSize: '15px',
          color: '#9ca3af',
        }}
      >
        © 2026 MeetTranscribe Pro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

const linkStyle = {
  color: '#9ca3af',
  textDecoration: 'none',
  fontWeight: 500,
};
