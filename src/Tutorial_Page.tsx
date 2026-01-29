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


import TutorialVideo  from './components/TutorialVideo';
import  Footer from './components/Footer';


type ScreenshotStyle = {
  bg: string
  border: string
  shadow: string
}

const getScreenshotStyle = (index: number) => {
  const GOLDEN_RATIO = 137.508
  const hue = (index * GOLDEN_RATIO) % 360

  return {
    bg: `hsl(${hue}, 85%, 96%)`,
    border: `hsl(${hue}, 70%, 55%)`,
    shadow: `hsla(${hue}, 70%, 55%, 0.25)`,
  }
}
type TutorialStep = {
  number: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
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
 export const tutorialSections: TutorialSection[] = [
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
  let colorIndex = 0

  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Import Google Fonts (Poppins and Inter)
  useEffect(() => {
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e0f7fa 0%, #ffffff 40%, #ffffff 100%)',
        position: 'relative',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(224,247,250,0.3) 0%, rgba(255,255,255,0) 50%)',
            opacity: 0.6,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section
          style={{
            padding: '3rem 1.5rem',
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              {/* LEFT: Text Content */}
              <div style={{ maxWidth: '650px' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '48px',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    lineHeight: '58px',
                    letterSpacing: '-0.025em',
                  }}
                >
                  
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <img src={logoImage} alt="work Eye Logo" style={{ width: '7.5rem', height: '7.5rem', objectFit: 'contain' }} />
                </div>

                  <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>Explore MeetHub</span>{' '}
                  <span style={{ color: '#0F172A' }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#475569',
                    marginBottom: '1.5rem',
                    lineHeight: '26px',
                  }}
                >
                  Learn how to streamline operations, boost productivity, and scale faster with comprehensive tutorials
                  covering setup, configuration, and advanced features.
                </motion.p>
                {/* Feature List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  {[
                    'Quick start guides for instant setup',
                    'Advanced feature walkthroughs',
                    'How it works steps for smooth onboarding',
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                    >
                      <div
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          borderRadius: '0.5rem',
                          background: 'rgba(6, 182, 212, 0.15)',
                          border: '2px solid rgb(6, 182, 212)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'rgb(6, 182, 212)' }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#475569',
                          lineHeight: '26px',
                        }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: Enhanced Video Card */}
              <motion.div
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <TutorialVideo />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tutorial Section Header */}
        <section
          style={{ padding: '2rem 1.5rem 1.5rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <h2
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '36px',
                fontWeight: 700,
                color: 'rgb(20, 47, 83)',
                marginBottom: '0.65rem',
                lineHeight: '46px',
              }}
            >
              Complete Step-by-Step Guide
            </h2>

            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                color: '#475569',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: '26px',
                fontWeight: 400,
              }}
            >
              Master MeetHub with our comprehensive guide covering every feature from sign-up to advanced
              functionality
            </p>
          </div>
        </section>

        {/* Tutorial Cards Section */}
        <section style={{ padding: '1.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* Single-step sections */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: '3rem',
                rowGap: '2rem',
                marginBottom: '3rem',
                alignItems: 'start',
              }}
            >
              {tutorialSections
                .filter((section) => section.steps.length === 1)
                .map((section) => (
                  <div
                    key={section.sectionId}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      height: '100%',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '36px',
                        fontWeight: 600,
                        color: 'rgb(20, 47, 83)',
                        marginBottom: '0.2rem',
                        lineHeight: '46px',
                        minHeight: '100px',
                      }}
                    >
                      {section.sectionTitle}
                    </h3>

                    <p
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#475569',
                        marginBottom: '2rem',
                        lineHeight: '26px',
                        minHeight: '78px',
                      }}
                    >
                      {section.sectionDescription}
                    </p>

                    {section.steps.map((step, stepIndex) => {
                      const boxStyle = getScreenshotStyle(colorIndex++)
                      const Icon = step.icon
                      const isHovered = hoveredCard === step.number

                      return (
                        <div
                          key={step.number}
                          onMouseEnter={() => setHoveredCard(step.number)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            position: 'relative',
                            width: '100%',
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: stepIndex * 0.08,
                              ease: 'easeOut',
                            }}
                            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
                            style={{ height: '100%' }}
                          >
                            <div
                              style={{
                                position: 'relative',
                                overflow: 'visible',
                                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                              }}
                            >
                              <div style={{ borderRadius: 0, overflow: 'visible', boxShadow: 'none' }}>
                                <div
                                  style={{
                                    background: boxStyle.bg,
                                    border: `2px solid ${boxStyle.border}`,
                                    borderRadius: '1.75rem',
                                    padding: '0.5rem',
                                    boxShadow: `0 4px 12px ${boxStyle.shadow}`,
                                  }}
                                >
                                  <div
                                    style={{
                                      borderRadius: '1.1rem',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      src={step.image}
                                      alt={step.title}
                                      style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        objectFit: 'cover',
                                        background: 'transparent',
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                  style={{
                                    position: 'fixed',
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '320px',
                                    background: 'rgba(15, 23, 42, 0.97)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '1.25rem',
                                    padding: '1.5rem',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                    color: 'white',
                                    zIndex: 999999,
                                    pointerEvents: 'none',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                  }}
                                >
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
                                      boxShadow: '0 5px 15px rgba(0,0,0,0.25)',
                                      fontFamily: '"Poppins", sans-serif',
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
                                      fontFamily: '"Poppins", sans-serif',
                                      fontSize: '18px',
                                      fontWeight: 600,
                                      marginBottom: '0.5rem',
                                    }}
                                  >
                                    {step.title}
                                  </h4>

                                  <p
                                    style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '14px',
                                      color: 'rgba(255,255,255,0.85)',
                                      lineHeight: '22px',
                                      fontWeight: 400,
                                    }}
                                  >
                                    {step.description}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      )
                    })}
                  </div>
                ))}
            </div>

            {/* Multi-step sections */}
            {tutorialSections
              .filter((section) => section.steps.length > 1)
              .map((section) => (
                <div key={section.sectionId} style={{ marginBottom: '1rem' }}>
                  <h3
                    style={{
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: '36px',
                      fontWeight: 600,
                      color: 'rgb(20, 47, 83)',
                      lineHeight: '46px',
                    }}
                  >
                    {section.sectionTitle}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#475569',
                      marginBottom: '1rem',
                      lineHeight: '26px',
                    }}
                  >
                    {section.sectionDescription}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      columnGap: '2rem',
                      rowGap: '2rem',
                      paddingTop: '1.5rem',
                      paddingInline: '0.5rem',
                      alignItems: 'stretch',
                    }}
                  >
                    {section.steps.map((step, stepIndex) => {
                      const boxStyle = getScreenshotStyle(colorIndex++)

                      const Icon = step.icon
                      const isHovered = hoveredCard === step.number

                      return (
                        <div
                          key={step.number}
                          onMouseEnter={() => setHoveredCard(step.number)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto',
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: stepIndex * 0.08,
                              ease: 'easeOut',
                            }}
                            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
                            style={{ height: '100%' }}
                          >
                            <div
                              style={{
                                position: 'relative',
                                overflow: 'visible',
                                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                              }}
                            >
                              <div style={{ borderRadius: 0, overflow: 'visible', boxShadow: 'none' }}>
                                <div
                                  style={{
                                    background: boxStyle.bg,
                                    border: `2px solid ${boxStyle.border}`,
                                    borderRadius: '1.75rem',
                                    padding: '0.5rem',
                                    boxShadow: `0 4px 12px ${boxStyle.shadow}`,
                                  }}
                                >
                                  <div
                                    style={{
                                      borderRadius: '1.1rem',
                                      overflow: 'hidden',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <img
                                      src={step.image}
                                      alt={step.title}
                                      style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        objectFit: 'cover',
                                        background: 'transparent',
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                  style={{
                                    position: 'fixed',
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '320px',
                                    background: 'rgba(15, 23, 42, 0.97)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '1.25rem',
                                    padding: '1.5rem',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                    color: 'white',
                                    zIndex: 999999,
                                    pointerEvents: 'none',
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word',
                                  }}
                                >
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
                                      boxShadow: '0 5px 15px rgba(0,0,0,0.25)',
                                      fontFamily: '"Poppins", sans-serif',
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
                                      fontFamily: '"Poppins", sans-serif',
                                      fontSize: '18px',
                                      fontWeight: 600,
                                      marginBottom: '0.5rem',
                                    }}
                                  >
                                    {step.title}
                                  </h4>

                                  <p
                                    style={{
                                      fontFamily: '"Inter", sans-serif',
                                      fontSize: '14px',
                                      color: 'rgba(255,255,255,0.85)',
                                      lineHeight: '22px',
                                      fontWeight: 400,
                                    }}
                                  >
                                    {step.description}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      )
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
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => (window.location.href = 'https://frontend-8x7e.onrender.com/')}
            style={{
              fontFamily: '"Poppins", sans-serif',
              padding: '1.25rem 3.5rem',
              background: 'rgb(30, 41, 59)',
              color: 'white',
              borderRadius: '1rem',
              border: 'none',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgb(15, 23, 42)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgb(30, 41, 59)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Go to Dashboard
            <ArrowRight style={{ width: '1.6rem', height: '1.6rem' }} />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  )
}

    
  
