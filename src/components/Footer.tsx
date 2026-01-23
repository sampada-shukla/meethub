import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center mb-6">
          <a 
            href="#privacy" 
            className="text-neutral-500 hover:text-neutral-600 transition-colors text-sm whitespace-nowrap"
            style={{ color: '#a3a3a3', fontWeight: '500', textDecoration: 'none', margin: '0 1rem' }}
          >
            Privacy Policy
          </a>
          <a 
            href="#terms" 
            className="text-neutral-500 hover:text-neutral-600 transition-colors text-sm whitespace-nowrap"
            style={{ color: '#a3a3a3', fontWeight: '500', textDecoration: 'none', margin: '0 1rem' }}
          >
            Terms of Service
          </a>
          <a 
            href="#cookie" 
            className="text-neutral-500 hover:text-neutral-600 transition-colors text-sm whitespace-nowrap"
            style={{ color: '#a3a3a3', fontWeight: '500', textDecoration: 'none', margin: '0 1rem' }}
          >
            Cookie Policy
          </a>
          <a 
            href="#security" 
            className="text-neutral-500 hover:text-neutral-600 transition-colors text-sm whitespace-nowrap"
            style={{ color: '#a3a3a3', fontWeight: '500', textDecoration: 'none', margin: '0 1rem' }}
          >
            Security
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-center text-neutral-500 text-sm" style={{ color: '#737373', textAlign: 'center' }}>
          © 2026 MeetTranscribe Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}