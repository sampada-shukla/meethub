import  { useState} from 'react';
import {
  LayoutDashboard,
  Play,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Users,
  Monitor,
  UserCheck,
  Download,
  Sparkles,
  AlertCircle,
  Clock,
  FileText,
  Key,
  Mic,
  UserX,
} from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../src/context/AuthContext';

import logoImage from "./components/assets/meethub.png";

import upgrade from "./components/assets/upgrade.png";
import lobby from "./components/assets/lobby.png";
import create_meeting_1 from "./components/assets/create_meeting_1.png";
import create_meeting_summary from "./components/assets/create_meeting_summary.png";
import meeting_code from "./components/assets/meeting_code.png";
import meeting_screen from "./components/assets/meeting_screen.png";
import recording from "./components/assets/recording.png";
import share_link from "./components/assets/share_link.png";
import join_meeting_code from "./components/assets/join_meeting_code.png";
import waiting from "./components/assets/waiting.png";
import join_meeting_screen from "./components/assets/join_meeting_screen.png";
import remove_meeting from "./components/assets/remove_meeting.png";
import transcriptor from "./components/assets/transcriptor.png";
import recent_meetings from "./components/assets/recent_meetings.png";
import recent_meetings_data from "./components/assets/recent_meetings_data.png";
import join_meeting_summary from "./components/assets/join_meeting_summary.png";
import export_summary from "./components/assets/export_summary.png";
import live_mic_indicator from "./components/assets/live_mic_indicator.png";


import { TutorialVideo } from './components/TutorialVideo';
import  Footer from './components/Footer';


const screenshotBoxStyles = [
  {
    bg: '#e0ecff',     
    border: '#3b82f6',
    shadow: 'rgba(59,130,246,0.25)',
  },
  {
    bg: '#dcf7e6',     
    border: '#22c55e',
    shadow: 'rgba(34,197,94,0.25)',
  },
  {
    bg: '#ffedd5',     
    border: '#fb923c',
    shadow: 'rgba(251,146,60,0.25)',
  },
  {
    bg: '#ede9fe',     
    border: '#8b5cf6',
    shadow: 'rgba(139,92,246,0.25)',
  },
];
type TutorialStep = {
  number: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>
  iconColor: string;
  image: string;
  details?: string[] | undefined;
}
type TutorialSection = {
  sectionId: number;
  sectionTitle: string;
  sectionDescription: string;
  steps: TutorialStep[];
};  
  

export const tutorialSections = [
  /* =========================
     2. DASHBOARD
  ========================= */
  {
    sectionId: 1,
    sectionTitle: '📊 1: Dashboard Overview',
    sectionDescription:
      'Central hub to create or join meetings.',
    steps: [
      {
        number: 1,
        title: 'MeetHub Dashboard',
        description:
          'Dashboard displays Create Meeting and Join Meeting options along with system status.',
        icon: LayoutDashboard,
        iconColor: 'rgb(236, 72, 153)',
        image: lobby,
      },
    ],
  },

  /* =========================
     3. CREATE MEETING (HOST)
  ========================= */
  {
    sectionId: 2,
    sectionTitle: '🎙️ 2: Create Meeting (Host)',
    sectionDescription:
      'Upgrade plan, activate subscription, and host meetings with live transcription.',
    steps: [
      {
        number: 2,
        title: 'Upgrade Plan Required',
        description:
          'When a host clicks Create Meeting without an active plan, the system prompts the user to upgrade.Host completes payment and activates a subscription plan.',
        icon: AlertCircle,
        iconColor: 'rgb(249, 115, 22)',
        image: upgrade,
      },
       {
        number: 3,
        title: 'Create Meeting',
        description:
          'Host enters meeting name and optional title to create a new meeting.',
        icon: Users,
        iconColor: 'rgb(59, 130, 246)',
        image: create_meeting_1,
      },
      {
        number: 4,
        title: 'Meeting Code Generated',
        description:
          'A unique meeting code is generated for participants to join.',
        icon: Key,
        iconColor: 'rgb(168, 85, 247)',
        image: meeting_code,
      },
      {
        number: 5,
        title: 'Meeting Interface',
        description:
          'Host meeting interface showing participants list, meeting code, and ready-to-transcribe state.',
        icon: Monitor,
        iconColor: 'rgb(236, 72, 153)',
        image: meeting_screen,
      },
      
      {
        number: 6,
        title: 'Start Recording',
        description:
          'Host clicks Start Recording. Recording begins and real-time AI transcription starts.',
        icon: Mic,
        iconColor: 'rgb(239, 68, 68)',
        image: recording,
      },
      {
        number: 7,
        title: 'Share Meeting Link',
        description:
          'Share meeting link modal allowing copy link, WhatsApp sharing, and email invitation options.',
        icon: ExternalLink,
        iconColor: 'rgb(59, 130, 246)',
        image: share_link,
      },
      {
        number: 8,
        title: 'AI Generated Summary',
        description:
          'Once the meeting ends, the system automatically generates an AI-powered summary with key details, discussion points, participants, and system insights, ready to view, share, or export.',
        icon: Sparkles,
        iconColor: 'rgb(59, 130, 246)',
        image: create_meeting_summary,
      },
    ],
  },

  /* =========================
     4. JOIN MEETING (PARTICIPANT)
  ========================= */
  {
    sectionId: 3,
    sectionTitle: '👥 3: Join Meeting (Participant)',
    sectionDescription:
      'Participants join meetings using a meeting code.',
    steps: [
      {
        number: 9,
        title: 'Join Meeting',
        description:
          'This is for join meeting user can join meeting even if he don’t have any plan but mandatory to Login or Register',
        icon: UserCheck,        
        iconColor: 'rgb(34, 197, 94)',        
        image: join_meeting_code,
      },
      
      {
        number: 10,
        title: 'Waiting Room',
        description:
          'Participant waits in the waiting room until the host admits them.',
        icon: Clock,
        iconColor: 'rgb(249, 115, 22)',
        image: waiting,
      },
      {
        number: 11,
        title: 'Join Live Meeting',
        description:
          'Participant joins the meeting and can view real-time transcription.',
        icon: Users,
        iconColor: 'rgb(59, 130, 246)',
        image: join_meeting_screen,
      },
      {
        number: 12,
        title: 'Removed from Meeting',
        description:
          'If a participant is removed by the host or loses access, they are notified immediately and can request permission to rejoin or return to the lobby.',
        icon: UserX,
        iconColor: 'rgb(239, 68, 68)',
        image: remove_meeting,
      },
    ],
  },

  /* =========================
     5. LIVE TRANSCRIPTION
  ========================= */
  {
    sectionId: 4,
    sectionTitle: '📝 4: Live Transcription',
    sectionDescription:
      'AI-powered speech-to-text during meetings.',
    steps: [
      {
  number: 13,
  title: 'Live Mic Level & Recording Status',
  description:
    'During recording, the host can see real-time mic input levels, recording duration, and connection status. The mic level indicator ensures clear audio capture, while live transcription appears speaker-wise in the meeting feed.',
  icon: Mic,
  iconColor: 'rgb(34, 197, 94)',
  image: live_mic_indicator, 
},

      {
        number: 14,
        title: 'Real-Time Transcription',
        description:
          'Speaker-wise transcription appears live as participants speak.',
        icon: FileText,
        iconColor: 'rgb(168, 85, 247)',
        image: transcriptor,
      },
      
    ],
  },

  /* =========================
     6. AI SUMMARY & EXPORT
  ========================= */
  {
    sectionId: 5,
    sectionTitle: '🤖 5: AI Summary & Export',
    sectionDescription:
      'Automatic meeting summaries and export options.',
    steps: [
      {
        number: 15,
        title: 'AI Summary Generation',
        description:
          'When the host ends the meeting, AI generates an executive summary, key points, and action items.',
        icon: Sparkles,
        iconColor: 'rgb(236, 72, 153)',
        image: join_meeting_summary,
      },
      {
        number: 16,
        title: 'Export Summary',
        description:
          'Meeting summary can be exported as PDF, Word, or text.',
        icon: Download,
        iconColor: 'rgb(34, 197, 94)',
        image: export_summary,
      },
    ],
  },
  {
  sectionId: 6,
  sectionTitle: '📁 6: Recent Meetings & Insights',
  sectionDescription:
    'Review past meetings, access detailed records, and analyze summaries.',
  steps: [
    {
      number: 17,
      title: 'View Recent Meetings',
      description:
        'All completed meetings appear in the Recent Meetings dashboard with meeting name, duration, participants, and status for quick review.',
      icon: Clock,
      iconColor: 'rgb(59, 130, 246)',
      image: recent_meetings,
    },
    {
      number: 18,
      title: 'Meeting Details & Summary',
      description:
        'Opening a meeting displays complete details including meeting information, timeline, participants, and structured summary insights.',
      icon: FileText,
      iconColor: 'rgb(16, 185, 129)',
      image: recent_meetings_data,
    },
  ],
},

];

        
export default function TutorialPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
 
  const [popupSide, setPopupSide] = useState('right');


  

  return (
    <div style={{ minHeight: '100vh', background: 'white', position: 'relative' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, white, rgb(236, 254, 255), white)', opacity: 0.8 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section with Left-Right Layout */}
        <section style={{ padding: '3rem 1rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 1fr', 
              gap: '6rem', 
              alignItems: 'center' 
            }}>
              {/* LEFT: Text Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={logoImage} alt="work Eye Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                </div>
                
                <h1 style={{ fontSize: '3.25rem', fontWeight: 800,marginBottom: '1.5rem',lineHeight: '1.1',letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'rgb(6, 182, 212)',fontWeight: 900 }}>Explore Work Eye</span>{' '}
                  <span style={{ color: 'rgb(30, 41, 59)' }}>with Detailed Step-by-Step Tutorials</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem',color: 'rgb(75, 85, 99)',marginBottom: '2rem',lineHeight: '1.7',maxWidth: '42rem' }}>
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'rgb(6, 182, 212)', flexShrink: 0 }} />
                      <span style={{ fontSize: '1.1rem', color: 'rgb(55, 65, 81)' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Video Card */}
<motion.div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }}
  animate={{ y: [0, -14, 0] }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  <div
    style={{
      background: 'white',
      borderRadius: '1.75rem',
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      border: '1px solid rgb(243, 244, 246)',
      width: '100%',
      maxWidth: '640px', // 🔥 INCREASED SIZE
    }}
  >
    {/* VIDEO PREVIEW */}
    <div
      style={{
        position: 'relative',
        height: '300px', // 🔥 TALLER VIDEO AREA
        background:
          'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(207, 250, 254))',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '5.5rem',
              height: '5.5rem',
              background: 'rgb(6, 182, 212)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              border: 'none',
              cursor: 'pointer',
              margin: '0 auto 1.75rem',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgb(8, 145, 178)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgb(6, 182, 212)')
            }
          >
            <Play
              style={{
                width: '2.75rem',
                height: '2.75rem',
                color: 'white',
                marginLeft: '0.25rem',
              }}
              fill="white"
            />
          </button>

          <p
            style={{
              marginTop: '1.25rem',
              color: 'rgb(55, 65, 81)',
              fontWeight: 600,
              fontSize: '1.15rem',
            }}
          >
            Getting Started with MeetHub
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgb(107, 114, 128)',
              marginTop: '0.25rem',
            }}
          >
            Duration: 5:32
          </p>
        </div>
      </div>
    </div>

    {/* VIDEO INFO */}
    <div style={{ padding: '2.25rem' }}>
      <h3
        style={{
          fontSize: '1.5rem',
          color: 'rgb(30, 41, 59)',
          marginBottom: '0.75rem',
          fontWeight: 700,
        }}
      >
        Welcome to MeetHub Tutorial
      </h3>

      <p
        style={{
          color: 'rgb(75, 85, 99)',
          marginBottom: '1.75rem',
          lineHeight: '1.65',
        }}
      >
        Learn how to set up your account, configure tracking parameters, and
        start monitoring your assets in just a few minutes.
      </p>

      <button
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'rgb(30, 41, 59)',
          color: 'white',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 12px 18px -6px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgb(15, 23, 42)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgb(30, 41, 59)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Watch Full Tutorial Series
        <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>
    </div>
  </div>
</motion.div>
 </div>
          </div>
        </section>
        {/* Tutorial Section Header */}
<section
  style={{
    padding: '3rem 1rem 2.5rem',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)',
  }}
>
  <div
    style={{
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: '2.4rem',
        fontWeight: 800,
        color: '#0f172a',
        marginBottom: '0.75rem',
      }}
    >
      Complete Step-by-Step Tutorial
    </h2>

    <p
      style={{
        fontSize: '1rem',
        color: '#475569',
        maxWidth: '720px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      Master MeetHub with our comprehensive guide covering every feature
      from sign-up to advanced functionality
    </p>
  </div>
</section>
<section style={{ padding: '3rem 1rem' }}>
  <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
    {tutorialSections.map((section) => (
      <div key={section.sectionId} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1e293b' }}>
          {section.sectionTitle}
        </h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          {section.sectionDescription}
        </p>

        <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // 🔥 2 per row
    columnGap: '4rem',
    rowGap: '5rem',
    paddingTop: '3rem',
    paddingInline: '2rem',
    alignItems: 'center',
  }}
>


  {section.steps.map((step, stepIndex) => {
    const Icon = step.icon;
    const isHovered = hoveredCard === step.number;
    const boxStyle = screenshotBoxStyles[stepIndex % screenshotBoxStyles.length]
    const isSingleItem = section.steps.length === 1;


   

    return (
      <div
        key={step.number}
        onMouseEnter={() => setHoveredCard(step.number)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          position: 'relative',
          width: 'auto',
          flex: '1 1 0',
          minWidth: '420px',
          perspective: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Staggered Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7, 
            delay: (stepIndex * 0.12),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: false, margin: '-80px', amount: 0.3 }}
          style={{ height: '100%' }}
        >
          {/* 🔥 ADD THIS WRAPPER HERE */}
<div
  style={{
    position: 'relative',
    overflow: 'visible',
  }}
></div>

        <motion.div
          animate={{
            rotateY: isHovered ? -8 : 0,
            rotateX: isHovered ? 4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          style={{
            borderRadius: 0,
            overflow: 'visible',
            boxShadow: 'none',
              //? '0 40px 80px rgba(0,0,0,0.55)'
              //: '0 25px 50px rgba(0,0,0,0.35)',
            //background: '#000',
            //border: '8px solid #000',
          }}
        >
          <div
  style={{
    background: boxStyle.bg,
    border: `2px solid ${boxStyle.border}`,
    borderRadius: '1.75rem',
    padding: '1.25rem',
    boxShadow: `0 8px 20px ${boxStyle.shadow}`,
  }}
>
  {/* ❌ REMOVE white background */}
  <div
    style={{
      borderRadius: '1.1rem',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <motion.img
      src={step.image}
      alt={step.title}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        width: step.number == 18 ?'auto': '97%',          
        maxWidth: step.number == 18 ?'420px': '100%',
        height: 'auto',
        maxHeight: step.number == 18 ? '380px' : 'none',
        display: 'block',
        objectFit: 'contain',
        background: 'transparent',
      }}
    />
  </div>
</div>

        {/* Carousel Navigation Dots - Removed, now fully automatic */}
        </motion.div>


        {/* 🟨 POPUP DESCRIPTION */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              background: 'rgba(15, 23, 42, 0.95)',
              //backdropFilter: 'blur(12px)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 99999,
              pointerEvents: 'none',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            {/* 🔢 STEP NUMBER BADGE */}
    <div
      style={{
        position: 'absolute',
        top: '-14px',
        left: '-14px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: step.iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.05rem',
        fontWeight: 800,
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
      }}
    >
      {step.number}
    </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: step.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Icon color="white" size={22} />
            </div>

            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              {step.title}
            </h4>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
              }}
            >
              {step.description}
            </p>

           {('details' in step && Array.isArray(step.details) && step.details.length > 0) && (
  <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem' }}>
    {step.details.map((d: string, i: number) => (
      <li
        key={i}
        style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '0.35rem',
        }}
      >
        {d}
      </li>
    ))}
  </ul>
)}
</motion.div>
      </div>
    );
  })}
</div>
 </div>    
))}
  </div>
</section>
           
{/* CTA SECTION */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  }}
>
  <button
    onClick={() =>
      (window.location.href =
        'https://meethub.biz/738d1554-160f-4c00-8d4c-7d4ed4518724/dashboard')
    }
    style={{
      padding: '1.25rem 3.5rem',   
      background: 'rgb(30, 41, 59)',
      color: 'white',
      borderRadius: '1rem',        
      border: 'none',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.3,             
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgb(15, 23, 42)';
      e.currentTarget.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgb(30, 41, 59)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    Go to Dashboard
    <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
  </button>
</div>
<Footer/>
</div>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

    
  
