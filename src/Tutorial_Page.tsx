
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import {
  ArrowUp, ArrowDown, ArrowRight, ArrowLeft,
  CheckCircle, UserPlus, 
  Users, 
  FileText, 
  ZoomIn, X,
  ChevronLeft, ChevronRight, Grid3X3, List,
  LayoutDashboard,  ExternalLink, AlertCircle,
  Clock, Key, Mic, UserX,  PhoneOff, Calendar,
  MessageSquare, CheckSquare, PictureInPicture,
  LogOut, UserCircle, User, LogIn, Video, Download,
} from 'lucide-react'

import TutorialVideo from './components/TutorialVideo'
import Footer from './components/Footer'

// ─── IMAGE IMPORTS — update paths to match your project ───────────────────────
import logoImage         from './components/assets/meethub.png'
import lobby             from './components/assets/lobby.png'
import meeting_screen    from './components/assets/meeting_screen.png'
import recording         from './components/assets/recording.png'
import share_link        from './components/assets/share_link.png'
import join_meeting_code from './components/assets/join_meeting_code.png'
import waiting           from './components/assets/waiting.png'
import join_meeting_screen from './components/assets/join_meeting_screen.png'
import remove_meeting    from './components/assets/remove_meeting.png'
import transcriptor      from './components/assets/transcriptor.png'
import live_mic_indicator from './components/assets/live_mic_indicator.png'
import company_dashboard from './components/assets/company_dashboard.png'
import upgrade_company   from './components/assets/upgrade_company.png'
import create_meeting    from './components/assets/create_meeting.png'
import end_meeting       from './components/assets/end_meeting.png'
import meeting_details   from './components/assets/meeting_details.png'
import company_summary   from './components/assets/company_summary.png'
import company_transcript from './components/assets/company_transcript.png'
import company_actions   from './components/assets/company_actions.png'
import company_export    from './components/assets/company_export.png'
import company_teams     from './components/assets/company_teams.png'
import windowImg         from './components/assets/window.png'
import leave_meeting     from './components/assets/leave_meeting.png'
import account           from './components/assets/account.png'
import add_staff         from './components/assets/add_staff.png'
import staff_add         from './components/assets/staff_add.png'
import account_company   from './components/assets/account_company.png'
import register          from './components/assets/register.png'
import login             from './components/assets/login.png'

// ─── BRAND COLOURS ────────────────────────────────────────────────────────────
const BRAND = {
  primary:   '#06B6D4',
  primaryLt: '#38BDF8',
  primaryDk: '#0891B2',
  accent:    '#7C3AED',
  dark:      '#0F172A',
  mid:       '#1E293B',
  surface:   '#F0FDFF',
  slate:     '#475569',
  muted:     '#94A3B8',
  success:   '#10B981',
  amber:     '#F59E0B',
  border:    'rgba(6,182,212,0.18)',
}

// ─── TUTORIAL DATA — MeetHub content ─────────────────────────────────────────

interface TutorialStep {
  number: number
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }>
  iconColor: string
  image: string
  details: string[]
}
const tutorialSections: Array<{ sectionId: number; sectionTitle: string; sectionTag: string; sectionDescription: string; sectionColor: string; steps: TutorialStep[] }> = [
  {
    sectionId: 1,
    sectionTitle: 'Registration & Login',
    sectionTag: 'Section 01',
    sectionDescription: 'Get started by creating your account or signing in — choose Individual or Company access to begin using MeetHub.',
    sectionColor: '#0284C7',
    steps: [
      {
        number: 1,
        title: 'Create Account',
        description: 'New users can register as an Individual for direct transcription access or as a Company to manage a team. Fill in your full name, email, and password to get started.',
        icon: UserPlus,
        iconColor: '#0284C7',
        image: register,
        details: [
          'Choose Individual (direct access) or Company account type',
          'Enter Full Name, Email, and Password (8+ chars with letters, numbers & symbols)',
          'Click "Create account" to register',
          'Already have an account? Sign in from the bottom link',
        ],
      },
      {
        number: 2,
        title: 'Sign In',
        description: 'Existing users can sign in with their registered email and password. Use "Remember me" to stay logged in, or reset your password if forgotten.',
        icon: LogIn,
        iconColor: '#0891B2',
        image: login,
        details: [
          'Enter your registered Email and Password',
          'Check "Remember me" to stay signed in',
          '"Forgot password?" link for quick recovery',
          'New user? Sign up from the bottom link',
        ],
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: 'Dashboard Overview',
    sectionTag: 'Section 02',
    sectionDescription: 'Your starting point — client users see this dashboard after login to access all meeting options.',
    sectionColor: '#7C3AED',
    steps: [
      {
        number: 3,
        title: 'MeetHub Dashboard',
        description: 'Welcome to your MeetHub dashboard — the central hub where you can create or join meetings, manage your account, and view recent meeting activity.',
        icon: LayoutDashboard,
        iconColor: '#7C3AED',
        image: lobby,
        details: [
          'Quick access to Create and Join meeting actions',
          'View account status and settings',
          'Access recent meetings history',
          'Centralized navigation for all features',
        ],
      },
      {
        number: 4,
        title: 'My Account',
        description: 'Manage personal information, view account status, configure security settings, and perform account actions.',
        icon: UserCircle,
        iconColor: '#BE185D',
        image: account,
        details: [
          'Update profile information and email',
          'View subscription and account status',
          'Change password and enable 2FA',
          'Logout or delete account options',
        ],
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: 'Join Meeting (Client Account)',
    sectionTag: 'Section 03',
    sectionDescription: 'Client account features: You can join meetings. To create meetings, please contact your company admin.',
    sectionColor: '#D97706',
    steps: [
      {
        number: 5,
        title: 'Join Meeting',
        description: 'As a client account user, you can join meetings by entering the meeting code provided by your company admin or host. Login is required to participate.',
        icon: Users,
        iconColor: '#D97706',
        image: join_meeting_code,
        details: [
          'Client account can join meetings',
          'Enter meeting code provided by host',
          'No plan or fees required',
          'Contact company admin to create meetings',
        ],
      },
      {
        number: 6,
        title: 'Waiting Room',
        description: 'After entering a meeting code, participants wait in a secure waiting room until the host approves their entry.',
        icon: Clock,
        iconColor: '#DC2626',
        image: waiting,
        details: [
          'Waiting room status message',
          'Host approval required',
          'Prevents unauthorized joining',
          'Real-time admission updates',
        ],
      },
      {
        number: 7,
        title: 'Join Live Meeting',
        description: 'Once admitted, participants enter the live meeting with real-time AI-powered transcription visible as speakers talk.',
        icon: Users,
        iconColor: '#059669',
        image: join_meeting_screen,
        details: [
          'Live meeting access',
          'Real-time transcription view',
          'Participant presence indicator',
          'Smooth join transition',
        ],
      },
      {
        number: 8,
        title: 'Live Mic Level & Recording Status',
        description: 'During recording, the host can see real-time mic input levels and recording duration.',
        icon: Mic,
        iconColor: '#9333EA',
        image: live_mic_indicator,
        details: [
          'Mic input monitoring',
          'Recording duration tracker',
          'Connection status indicator',
          'Audio quality assurance',
        ],
      },
      {
        number: 9,
        title: 'Real-Time Transcription',
        description: 'Speaker-wise transcription appears live as participants speak with automatic formatting and timeline synchronization.',
        icon: FileText,
        iconColor: '#0F766E',
        image: transcriptor,
        details: [
          'Live speaker identification',
          'Instant text generation',
          'Automatic formatting',
          'Timeline synchronization',
        ],
      },
      {
        number: 10,
        title: 'Persistent Meeting Window',
        description: 'A floating meeting window stays accessible across all applications, allowing participants to multitask while remaining connected.',
        icon: PictureInPicture,
        iconColor: '#B45309',
        image: windowImg,
        details: [
          'Floating window stays accessible across all applications',
          'Quick controls for audio, video, and meeting exit',
          'Customizable positioning and sizing options',
          'One-click expansion to full meeting interface',
        ],
      },
      {
        number: 11,
        title: 'Leave Meeting',
        description: 'Participants can exit meetings at any time with a confirmation dialog to prevent accidental exits.',
        icon: LogOut,
        iconColor: '#1D4ED8',
        image: leave_meeting,
        details: [
          'Exit meeting anytime without host permission',
          'Confirmation dialog prevents accidental exits',
          'Meeting continues for other participants',
          'Stay or Leave button options available',
        ],
      },
      {
        number: 12,
        title: 'Removed from Meeting',
        description: 'If a host removes a participant, they receive immediate notification with options to request rejoining.',
        icon: UserX,
        iconColor: '#92400E',
        image: remove_meeting,
        details: [
          'Instant removal notification',
          'Clear access status',
          'Option to request rejoin',
          'Return to lobby action',
        ],
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: 'Create Meeting (Company Admin Only)',
    sectionTag: 'Section 04',
    sectionDescription: 'Company admin feature: Activate a plan, then create meetings and start AI-powered transcription. Client accounts cannot create meetings.',
    sectionColor: '#6D28D9',
    steps: [
      {
        number: 13,
        title: 'Dashboard – Plan Status (Company Admin)',
        description: 'Company admin dashboard shows current plan status. An active plan is required to create meetings. If no plan exists, meeting creation is restricted.',
        icon: LayoutDashboard,
        iconColor: '#6D28D9',
        image: company_dashboard,
        details: [
          'Company admin plan status visibility',
          'Active plan required to create meetings',
          'Free or Pro plan options available',
          'Client accounts cannot access this feature',
        ],
      },
      {
        number: 14,
        title: 'Activate Plan (If Required)',
        description: 'To enable create meeting, company admin must activate a free or paid plan. Once activated, meeting creation becomes available immediately.',
        icon: AlertCircle,
        iconColor: '#0369A1',
        image: upgrade_company,
        details: [
          'Plan activation required before creating meetings',
          'Free plan activation option available',
          'Upgrade to Pro for advanced features',
          'Company admin gains meeting creation access after activation',
        ],
      },
      {
        number: 15,
        title: 'Create New Meeting',
        description: 'Host enters name and optional meeting title to start a new session.',
        icon: Video,
        iconColor: '#065F46',
        image: create_meeting,
        details: [
          'Host name auto-filled',
          'Optional meeting title input',
          'Default title if left blank',
          'One-click Create Meeting button',
        ],
      },
      {
        number: 16,
        title: 'Meeting Room & Code Generated',
        description: 'A unique meeting code is generated and the host enters the meeting room interface.',
        icon: Key,
        iconColor: '#9A3412',
        image: meeting_screen,
        details: [
          'Auto-generated secure meeting code',
          'Participant panel',
          'Host badge indicator',
          'Mute all control',
        ],
      },
      {
        number: 17,
        title: 'Start Recording & Live Status',
        description: 'Host starts recording to activate AI transcription. The system displays recording timer and mic level indicators.',
        icon: Mic,
        iconColor: '#C2410C',
        image: recording,
        details: [
          'Start / Pause recording controls',
          'Live recording timer',
          'Mic level monitoring (Too Quiet indicator)',
          'AI transcription activation',
        ],
      },
      {
        number: 18,
        title: 'Share Meeting Link',
        description: 'Host can instantly share the meeting link via copy, WhatsApp, or email.',
        icon: ExternalLink,
        iconColor: '#15803D',
        image: share_link,
        details: [
          'Copy meeting link',
          'Share via WhatsApp',
          'Share via Email',
          'Quick participant onboarding',
        ],
      },
      {
        number: 19,
        title: 'End Meeting',
        description: 'Host ends the meeting session. Recording stops and the session is finalized for AI summary generation.',
        icon: PhoneOff,
        iconColor: '#86198F',
        image: end_meeting,
        details: [
          'End meeting button control',
          'Recording automatically stops',
          'All participants disconnected',
          'Session data saved for AI summary generation',
        ],
      },
    ],
  },
  {
    sectionId: 5,
    sectionTitle: 'Recent Meetings & Post-Meeting Features',
    sectionTag: 'Section 05',
    sectionDescription: 'View completed meetings and access detailed insights.',
    sectionColor: '#1E3A8A',
    steps: [
      {
        number: 20,
        title: 'Recent Meetings Dashboard',
        description: 'View all past and ongoing meetings in a grid layout with search, filters, and summary statistics.',
        icon: Calendar,
        iconColor: '#1E3A8A',
        image: meeting_details,
        details: [
          'Grid of past and ongoing meetings',
          'Top-level summary stats',
          'Search by title, code, or host',
          'View Details per meeting',
        ],
      },
      {
        number: 21,
        title: 'Meeting Summary',
        description: 'Clicking View Details opens an AI-powered summary with meeting metadata, key points, action items, and Export PDF option.',
        icon: FileText,
        iconColor: '#78350F',
        image: company_summary,
        details: [
          'AI-generated meeting summary',
          'Meeting metadata and participants',
          'Key points and action items',
          'Export PDF',
        ],
      },
      {
        number: 22,
        title: 'Meeting Transcript',
        description: 'The Transcript tab shows the complete verbatim record with speaker attribution, timestamps, and search functionality.',
        icon: MessageSquare,
        iconColor: '#4F46E5',
        image: company_transcript,
        details: [
          'Full verbatim transcript with speakers',
          'Timestamps for every entry',
          'Searchable content',
          'Copy sections or entire transcript',
        ],
      },
      {
        number: 23,
        title: 'Action Items Tracking',
        description: 'AI identifies all tasks and follow-up items with completion tracking. Click to mark items as completed.',
        icon: CheckSquare,
        iconColor: '#166534',
        image: company_actions,
        details: [
          'AI-identified tasks and follow-ups',
          'Track status per item',
          'Completion progress indicator',
          'Click-to-complete',
        ],
      },
      {
        number: 24,
        title: 'Export Meeting Data',
        description: 'One-click PDF export generates a comprehensive document with meeting data, summary, action items, and full transcript.',
        icon: Download,
        iconColor: '#9D174D',
        image: company_export,
        details: [
          'Export complete meeting PDF',
          'Includes metadata, summary, actions, transcript',
          'Shareable and archival',
          'One-click export',
        ],
      },
    ],
  },
  {
    sectionId: 6,
    sectionTitle: 'Team & User Management (Company Admin Only)',
    sectionTag: 'Section 06',
    sectionDescription: 'Company admin feature: Manage team members, expand user capacity, and control staff access.',
    sectionColor: '#374151',
    steps: [
      {
        number: 25,
        title: 'Manage Team',
        description: 'View your complete team roster showing staff slot usage, member details, and quick actions to manage access.',
        icon: Users,
        iconColor: '#374151',
        image: company_teams,
        details: [
          'Staff slot usage shown at a glance (e.g. "2 of 7 staff slots used · 5 remaining")',
          'Company Owner is clearly labelled with an Owner badge',
          'Each member displays their email address and join date',
          'Use the Refresh button to sync the latest team data',
        ],
      },
      {
        number: 26,
        title: 'Add Staff Member',
        description: 'Register a new staff member by filling in the "Register New Staff Member" form directly on the Manage Team page.',
        icon: UserPlus,
        iconColor: '#065F46',
        image: add_staff,
        details: [
          'Click "Add Staff Member" to open the registration form',
          'Enter the new member\'s Full Name, Email Address, and Password (minimum 6 characters)',
          'Optionally check "Make this user a Company Admin" to grant team and settings access',
          'Click "Register Staff Member" to confirm, or Cancel to discard',
        ],
      },
      {
        number: 27,
        title: 'Staff Member Added',
        description: 'Once registered, the new staff member appears instantly in the team roster with their details and management options.',
        icon: CheckCircle,
        iconColor: '#7C2D12',
        image: staff_add,
        details: [
          'New member is listed with their name, email, and join date',
          'Staff slot count updates automatically',
          'Suspend or delete the member at any time using the action icons',
          'Repeat the process to add more staff members up to your slot limit',
        ],
      },
    ],
  },
  {
    sectionId: 7,
    sectionTitle: 'Account Settings (Company Admin Only)',
    sectionTag: 'Section 07',
    sectionDescription: 'Manage your personal profile, subscription plan, security settings, and account-level actions.',
    sectionColor: '#3730A3',
    steps: [
      {
        number: 28,
        title: 'My Account (Company Admin)',
        description: 'View and manage your profile information, active subscription plan, security settings, and account-level actions — all from the Account page in the Company dashboard.',
        icon: User,
        iconColor: '#3730A3',
        image: account_company,
        details: [
          'Profile Information: view your Full Name and Email Address',
          'Account Status: check your current plan, billing amount, subscription start date, and renewal date',
          'Security: change your Password or enable Two-Factor Authentication (2FA) for added protection',
          'Account Actions: logout from all sessions across devices, or permanently delete your account',
        ],
      },
    ],
  },
]

const ALL_STEPS = tutorialSections.flatMap(s => s.steps)
const TOTAL_STEPS = ALL_STEPS.length

// ─── ZOOM MODAL ───────────────────────────────────────────────────────────────
const ZoomModal = ({ show, onClose, step, isMobile }: { show: boolean; onClose: () => void; step: TutorialStep | null; isMobile: boolean }) => {
  useEffect(() => {
    if (!show) return
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [show, onClose])

  if (!step) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="zoom-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '1.5rem',
          }}
        >
          <motion.div
            key="zoom-panel"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(10,15,30,0.95)',
              borderRadius: '24px', padding: '2rem',
              width: '100%', maxWidth: '1100px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.25rem',
              position: 'relative', cursor: 'default',
              boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${step.iconColor}25`,
              border: `1px solid ${step.iconColor}20`,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close zoom"
              style={{
                position: 'absolute', top: '14px', right: '14px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            >
              <X size={16} strokeWidth={2.5} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '5px 14px 5px 5px', borderRadius: 999,
              background: `${step.iconColor}18`, border: `1px solid ${step.iconColor}35`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step.iconColor, color: '#fff',
                display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700,
              }}>
                {step.number}
              </div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{step.title}</span>
            </div>
            <img
              src={step.image} alt={step.title}
              style={{
                maxWidth: '100%', maxHeight: '78vh',
                objectFit: 'contain', borderRadius: '12px',
                display: 'block', margin: '0 auto',
                border: `2px solid ${step.iconColor}25`,
              }}
            />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', margin: 0 }}>
              {isMobile ? 'Tap outside to close' : 'Click outside or press Esc to close'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ─── INDEX SIDEBAR ────────────────────────────────────────────────────────────
const IndexSidebar = ({ activeGlobalIdx, onJump, isOpen, onToggle, isMobile, footerOffset }: { activeGlobalIdx: number; onJump: (idx: number) => void; isOpen: boolean; onToggle: () => void; isMobile: boolean; footerOffset: number }) => {
  const SIDEBAR_W = 272

  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
    const map = {}
    tutorialSections.forEach(s => { map[s.sectionId] = false })
    const active = tutorialSections.find(s =>
      s.steps.some(st => ALL_STEPS.findIndex(x => x.number === st.number) === activeGlobalIdx)
    )
    if (active) map[active.sectionId] = true
    return map
  })

  const toggleSection = (id: number) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  if (isMobile) return null

  return (
    <motion.div
      animate={{ x: isOpen ? 0 : -SIDEBAR_W }}
      initial={false}
      transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      style={{
        position: 'fixed', left: 0, top: 0, bottom: footerOffset,
        width: `${SIDEBAR_W}px`, zIndex: 500,
        background: '#ffffff', borderRight: '1px solid #E8F4F8',
        boxShadow: '6px 0 32px rgba(6,182,212,0.07), 2px 0 8px rgba(0,0,0,0.04)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND.primary}08, ${BRAND.primaryLt}05)`,
        padding: '1rem 1rem 0.85rem 1.1rem', borderBottom: '1px solid #EEF7FB',
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 3px 10px ${BRAND.primary}40`, flexShrink: 0,
          }}>
            <List size={13} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: BRAND.dark, fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>Tutorial Index</div>
            <div style={{ fontSize: '10px', color: BRAND.muted, marginTop: '2px', fontFamily: '"Inter", sans-serif' }}>{tutorialSections.length} sections · {ALL_STEPS.length} steps</div>
          </div>
        </div>
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <ChevronLeft size={14} color={BRAND.muted} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Progress */}
      <div style={{ padding: '0.7rem 1.1rem 0.65rem', borderBottom: '1px solid #F0F7FA', flexShrink: 0, background: '#FAFCFE' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: BRAND.muted, fontFamily: '"Inter", sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Progress</span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: BRAND.primary, fontFamily: '"Inter", sans-serif', background: `${BRAND.primary}12`, padding: '1px 7px', borderRadius: '999px', border: `1px solid ${BRAND.primary}25` }}>{activeGlobalIdx + 1} / {ALL_STEPS.length}</span>
        </div>
        <div style={{ height: '5px', background: '#EEF2F7', borderRadius: '5px', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${((activeGlobalIdx + 1) / ALL_STEPS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            style={{ height: '100%', background: `linear-gradient(to right, ${BRAND.primary}, ${BRAND.primaryLt})`, borderRadius: '5px', boxShadow: `0 0 6px ${BRAND.primary}50` }}
          />
        </div>
      </div>

      {/* Sections list */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0.5rem 0 1rem' }}>
        <style>{`.sb-sec-btn:hover{background:rgba(6,182,212,0.04)!important}.sb-step-btn:hover{background:rgba(6,182,212,0.05)!important}`}</style>
        {tutorialSections.map((section, secIdx) => {
          const secFirstIdx = ALL_STEPS.findIndex(s => s.number === section.steps[0].number)
          const isSectionActive = activeGlobalIdx >= secFirstIdx && activeGlobalIdx < secFirstIdx + section.steps.length
          const isExpanded = !!openSections[section.sectionId]
          const completedInSection = section.steps.filter(st => ALL_STEPS.findIndex(x => x.number === st.number) < activeGlobalIdx).length
          return (
            <div key={section.sectionId} style={{ marginBottom: '2px' }}>
              <button
                className="sb-sec-btn"
                onClick={() => toggleSection(section.sectionId)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.5rem 0.9rem 0.5rem 0.8rem',
                  background: isSectionActive ? `${section.sectionColor}07` : 'transparent',
                  borderLeft: `3px solid ${isSectionActive ? section.sectionColor : 'transparent'}`,
                  border: 'none', borderLeftStyle: 'solid', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.18s ease, border-color 0.18s ease',
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                  background: isSectionActive ? `linear-gradient(135deg, ${section.sectionColor}, ${section.sectionColor}bb)` : '#EEF2F7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isSectionActive ? `0 2px 6px ${section.sectionColor}40` : 'none',
                  transition: 'all 0.22s ease',
                }}>
                  <span style={{ fontSize: '8px', fontWeight: 800, color: isSectionActive ? 'white' : BRAND.muted, fontFamily: '"Inter", sans-serif' }}>{String(secIdx + 1).padStart(2, '0')}</span>
                </div>
                <span style={{ flex: 1, fontSize: '10.5px', fontWeight: 700, color: isSectionActive ? section.sectionColor : '#64748B', fontFamily: '"Inter", sans-serif', lineHeight: 1.25, letterSpacing: '0.01em', transition: 'color 0.18s ease' }}>{section.sectionTitle}</span>
                {completedInSection > 0 && (
                  <span style={{ fontSize: '8.5px', fontWeight: 700, color: section.sectionColor, background: `${section.sectionColor}12`, padding: '1px 5px', borderRadius: '999px', border: `1px solid ${section.sectionColor}25`, flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{completedInSection}/{section.steps.length}</span>
                )}
                <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex', flexShrink: 0 }}>
                  <ChevronRight size={11} color={isSectionActive ? section.sectionColor : '#94A3B8'} strokeWidth={2.5} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="sec-steps"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ margin: '2px 0.6rem 4px 1.7rem', borderLeft: `1.5px solid ${section.sectionColor}25` }}>
                      {section.steps.map((step, stepLocalIdx) => {
                        const stepIdx = ALL_STEPS.findIndex(s => s.number === step.number)
                        const isActive = stepIdx === activeGlobalIdx
                        const isPast = stepIdx < activeGlobalIdx
                        const isLast = stepLocalIdx === section.steps.length - 1
                        return (
                          <motion.button
                            key={step.number}
                            className="sb-step-btn"
                            onClick={() => onJump(stepIdx)}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'center', gap: '0.55rem',
                              padding: '0.38rem 0.6rem 0.38rem 0.85rem',
                              background: isActive ? `linear-gradient(90deg, ${step.iconColor}10, transparent)` : 'transparent',
                              border: 'none', cursor: 'pointer', textAlign: 'left',
                              borderRadius: '0 8px 8px 0', position: 'relative',
                              transition: 'background 0.15s ease', marginBottom: isLast ? 0 : '1px',
                            }}
                          >
                            {isActive && (
                              <div style={{ position: 'absolute', left: '-1px', top: '18%', bottom: '18%', width: '2.5px', borderRadius: '0 2px 2px 0', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}70` }} />
                            )}
                            <div style={{
                              width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                              background: isActive ? step.iconColor : isPast ? `${step.iconColor}15` : '#F1F5F9',
                              border: isActive ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}50` : '1.5px solid #DDE4EE',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: isActive ? `0 2px 8px ${step.iconColor}45` : 'none', transition: 'all 0.2s ease',
                            }}>
                              {isPast ? (
                                <CheckCircle size={11} color={step.iconColor} strokeWidth={2.5} />
                              ) : (
                                <span style={{ fontSize: '8px', fontWeight: 800, color: isActive ? 'white' : '#94A3B8', fontFamily: '"Inter", sans-serif' }}>{step.number}</span>
                              )}
                            </div>
                            <span style={{
                              flex: 1, fontSize: '11.5px',
                              fontWeight: isActive ? 650 : isPast ? 500 : 450,
                              color: isActive ? BRAND.dark : isPast ? '#4B5563' : '#94A3B8',
                              lineHeight: 1.3, fontFamily: '"Inter", sans-serif',
                              transition: 'color 0.15s ease', whiteSpace: 'nowrap',
                              overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>{step.title}</span>
                            {isActive && (
                              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: step.iconColor, flexShrink: 0, boxShadow: `0 0 4px ${step.iconColor}80` }} />
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── STEP CARD ────────────────────────────────────────────────────────────────
const StepCard = ({ step, isMobile, isTablet, globalIdx, canPrev, canNext, onPrev, onNext, setGlobalIdx, setIsUserNavigation }: { step: TutorialStep; isMobile: boolean; isTablet: boolean; globalIdx: number; canPrev: boolean; canNext: boolean; onPrev: () => void; onNext: () => void; setGlobalIdx: React.Dispatch<React.SetStateAction<number>>; setIsUserNavigation: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const Icon = step.icon

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          width: '100%',
          borderRadius: isMobile ? '20px' : '28px',
          overflow: 'hidden',
          background: 'white',
          border: `1.5px solid ${step.iconColor}22`,
          boxShadow: `0 16px 64px ${step.iconColor}14, 0 4px 16px rgba(0,0,0,0.06)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '5px', background: `linear-gradient(90deg, ${step.iconColor}, ${step.iconColor}60, transparent)`, flexShrink: 0 }} />

        {/* Main body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          flex: 1,
          minHeight: isMobile ? 'auto' : '540px',
        }}>
          {/* LEFT: IMAGE PANEL */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(145deg, ${step.iconColor}0D 0%, ${step.iconColor}05 60%, #f8fafc 100%)`,
            borderRight: isMobile ? 'none' : `1px solid ${step.iconColor}14`,
            borderBottom: isMobile ? `1px solid ${step.iconColor}14` : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '3rem 1.5rem 1.5rem' : '2rem 2.5rem',
            overflow: 'hidden',
            minHeight: isMobile ? '280px' : 'auto',
          }}>
            {/* Decorative blobs */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}18, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}0E, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Step badge */}
            <div style={{
              position: 'absolute', top: '1.1rem', left: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '4px 11px 4px 5px',
              background: 'rgba(255,255,255,0.88)',
              border: `1.5px solid ${step.iconColor}35`,
              borderRadius: '999px', zIndex: 2,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', fontWeight: 800, color: 'white',
                fontFamily: '"Inter", sans-serif',
                boxShadow: `0 2px 8px ${step.iconColor}40`, flexShrink: 0,
              }}>
                {step.number}
              </div>
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Step {step.number} / {TOTAL_STEPS}
              </span>
            </div>

            {/* Zoom button */}
            <motion.button
              onClick={() => setShowZoom(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'absolute', top: '1.1rem', right: '1.1rem',
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 11px 5px 8px',
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${step.iconColor}30`,
                borderRadius: '999px', cursor: 'pointer', zIndex: 2,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'all 0.18s ease',
              }}
            >
              <ZoomIn size={12} color={step.iconColor} strokeWidth={2.5} />
              {!isMobile && (
                <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Zoom</span>
              )}
            </motion.button>

            {/* Image */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <img
                src={step.image}
                alt={step.title}
                onLoad={() => setImgLoaded(true)}
                style={{
                  maxWidth: '100%',
                  maxHeight: isMobile ? '240px' : isTablet ? '380px' : '460px',
                  width: 'auto', height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '14px',
                  display: 'block', margin: '0 auto',
                  border: `1.5px solid rgba(0,0,0,0.06)`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)`,
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              />
              {/* Hover zoom overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={() => setShowZoom(true)}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${step.iconColor}28, rgba(0,0,0,0.45))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'zoom-in',
                  backdropFilter: 'blur(3px)',
                  WebkitBackdropFilter: 'blur(3px)',
                }}
              >
                <div style={{
                  background: 'rgba(0,0,0,0.62)',
                  borderRadius: '50%', padding: '14px',
                  border: `2.5px solid ${step.iconColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 24px rgba(0,0,0,0.4)`,
                }}>
                  <ZoomIn size={26} color={step.iconColor} strokeWidth={2} />
                </div>
              </motion.div>
            </div>

            <p style={{ marginTop: '1rem', marginBottom: 0, color: `${step.iconColor}70`, fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
              {isMobile ? 'Tap image to zoom' : 'Hover & click to zoom'}
            </p>
          </div>

          {/* RIGHT: CONTENT PANEL */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            padding: isMobile ? '1.75rem 1.5rem 1.5rem' : '2.25rem 2.25rem 1.75rem',
            gap: '1.1rem', background: 'white',
          }}>
            {/* Icon + title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{
                width: isMobile ? '46px' : '52px', height: isMobile ? '46px' : '52px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 24px ${step.iconColor}35`, flexShrink: 0,
              }}>
                <Icon size={isMobile ? 21 : 25} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '17px' : isTablet ? '19px' : '21px', fontWeight: 700, color: BRAND.dark, lineHeight: 1.28, margin: 0 }}>
                  {step.title}
                </h3>
                <div style={{ marginTop: '7px', height: '3px', width: '44px', background: `linear-gradient(to right, ${step.iconColor}, transparent)`, borderRadius: '2px' }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${step.iconColor}22, transparent)` }} />

            {/* Description */}
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: isMobile ? '13px' : '13.5px',
              color: BRAND.slate, lineHeight: 1.75, margin: 0,
              padding: '0.9rem 1.1rem',
              background: `linear-gradient(135deg, ${step.iconColor}07, ${step.iconColor}03)`,
              borderRadius: '12px',
              border: `1px solid ${step.iconColor}14`,
            }}>
              {step.description}
            </p>

            {/* Key points header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '2px', width: '18px', background: step.iconColor, borderRadius: '2px' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Key points</span>
              <div style={{ height: '1.5px', flex: 1, background: `linear-gradient(to right, ${step.iconColor}30, transparent)`, borderRadius: '2px' }} />
            </div>

            {/* Detail bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
              {step.details.map((detail: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
                    padding: '0.6rem 0.9rem',
                    background: i % 2 === 0 ? `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}03)` : 'rgba(248,250,252,0.7)',
                    borderRadius: '10px',
                    borderLeft: `3px solid ${step.iconColor}${i % 2 === 0 ? '' : '55'}`,
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    background: `${step.iconColor}18`, border: `1.5px solid ${step.iconColor}45`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                  }}>
                    <CheckCircle size={10} color={step.iconColor} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: isMobile ? '11.5px' : '12.5px', color: '#374151', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingTop: '1rem', borderTop: `1px solid ${step.iconColor}14`, marginTop: 'auto' }}>
              <motion.button
                onClick={onPrev}
                disabled={!canPrev}
                whileHover={canPrev ? { scale: 1.04 } : {}}
                whileTap={canPrev ? { scale: 0.97 } : {}}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: isMobile ? '0.6rem 0.9rem' : '0.65rem 1.2rem',
                  background: canPrev ? `linear-gradient(135deg, ${BRAND.mid}, #334155)` : 'rgba(0,0,0,0.04)',
                  color: canPrev ? 'white' : BRAND.muted,
                  border: 'none', borderRadius: '10px',
                  fontSize: '12.5px', fontWeight: 600,
                  cursor: canPrev ? 'pointer' : 'not-allowed',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: canPrev ? '0 4px 14px rgba(15,23,42,0.22)' : 'none',
                  transition: 'all 0.2s ease', flexShrink: 0,
                }}
              >
                <ChevronLeft size={15} strokeWidth={2.5} />
                {!isMobile && 'Previous'}
              </motion.button>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', overflow: 'hidden' }}>
                {ALL_STEPS.map((s, i) => {
                  const distance = Math.abs(i - globalIdx)
                  if (distance > 4) return null
                  const isActive = i === globalIdx
                  const isNear = distance === 1
                  return (
                    <motion.button
                      key={i}
                      onClick={() => {
                      setIsUserNavigation(true)
                       setGlobalIdx(i)
                      }}
                      animate={{
                        width: isActive ? 30 : isNear ? 14 : 7,
                        height: 6,
                        opacity: isActive ? 1 : isNear ? 0.6 : 0.28,
                        backgroundColor: isActive ? step.iconColor : isNear ? `${step.iconColor}90` : '#cbd5e1',
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }}
                    />
                  )
                })}
              </div>

              <motion.button
                onClick={onNext}
                disabled={!canNext}
                whileHover={canNext ? { scale: 1.04 } : {}}
                whileTap={canNext ? { scale: 0.97 } : {}}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: isMobile ? '0.6rem 0.9rem' : '0.65rem 1.2rem',
                  background: canNext ? `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)` : 'rgba(0,0,0,0.04)',
                  color: canNext ? 'white' : BRAND.muted,
                  border: 'none', borderRadius: '10px',
                  fontSize: '12.5px', fontWeight: 600,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: canNext ? `0 4px 18px ${step.iconColor}45` : 'none',
                  transition: 'all 0.2s ease', flexShrink: 0,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {canNext && (
                  <motion.div
                    animate={{ x: ['-100%', '120%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }}
                  />
                )}
                {!isMobile && <span style={{ position: 'relative', zIndex: 1 }}>Next</span>}
                <ChevronRight size={15} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <ZoomModal show={showZoom} onClose={() => setShowZoom(false)} step={step} isMobile={isMobile} />
    </>
  )
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
const ProgressBar = ({ current, total, color }: { current: number; total: number; color: string }) => (
  <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
    <motion.div
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      style={{ height: '100%', background: `linear-gradient(to right, ${color}, ${color}99)`, borderRadius: '4px', boxShadow: `0 0 8px ${color}60` }}
    />
  </div>
)

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TutorialPage() {
  const [isMobile,    setIsMobile]    = useState(false)
  const [isTablet,    setIsTablet]    = useState(false)
  const [globalIdx,   setGlobalIdx]   = useState(0)
  const [viewMode,    setViewMode]    = useState('step')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const footerRef  = useRef<HTMLDivElement | null>(null)
  
  const [footerOffset, setFooterOffset] = useState(0)
  const [isUserNavigation, setIsUserNavigation] = useState(false)

  const currentStep    = ALL_STEPS[globalIdx]
  const currentSection = tutorialSections.find(s => s.steps.some(st => st.number === currentStep.number))
  const canPrev = globalIdx > 0
  const canNext = globalIdx < TOTAL_STEPS - 1
  const prev = useCallback(() => {
  if (canPrev) {
    setIsUserNavigation(true)
    setGlobalIdx(i => i - 1)
  }
}, [canPrev])

const next = useCallback(() => {
  if (canNext) {
    setIsUserNavigation(true)
    setGlobalIdx(i => i + 1)
  }
}, [canNext])
  const isFirstRender = useRef(true)

  const handleStepClick = (idx: number) => {
  setIsUserNavigation(true)
  setGlobalIdx(idx)
 
  if(viewMode === 'overview') {
    setTimeout(() => {
      const card = document.getElementById(`overview-step-${idx}`)
      card?.scrollIntoView({behavior: 'smooth', block: 'center'})
    }, 50)
  }
}

    useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
}, [])

  useEffect(() => {
    const updateOffset = () => {
      if (!footerRef.current) return
      const footerRect = footerRef.current.getBoundingClientRect()
      setFooterOffset(Math.max(0, window.innerHeight - footerRect.top))
    }
    updateOffset()
    window.addEventListener('scroll', updateOffset, { passive: true })
    window.addEventListener('resize', updateOffset)
    return () => { window.removeEventListener('scroll', updateOffset); window.removeEventListener('resize', updateOffset) }
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel  = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.innerHTML = `*{box-sizing:border-box}html,body{overflow-x:hidden;width:100%;margin:0;padding:0}body{overflow-y:auto}`
    document.head.appendChild(style)
    return () => { document.head.removeChild(link); document.head.removeChild(style) }
  }, [])

  useEffect(() => {
    const fn = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024) }
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  
useEffect(() => {

  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }

  if (!isUserNavigation) return
  if (!contentRef.current) return

  const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement | null

  const navHeight = stickyNav
    ? stickyNav.getBoundingClientRect().height
    : 72

  const elementTop =
    contentRef.current.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: elementTop - navHeight - 20,
    behavior: 'smooth'
  })

  setIsUserNavigation(false)

}, [globalIdx])


 return (
    <div style={{ minHeight: '100vh', fontFamily: '"Inter", sans-serif', background: 'linear-gradient(180deg, #ecfeff 0%, #f8fafc 30%, #ffffff 100%)', position: 'relative', width: '100%', overflowX: 'hidden' }}>

      <IndexSidebar
        activeGlobalIdx={globalIdx}
        onJump={handleStepClick}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
        isMobile={isMobile}
        footerOffset={footerOffset}
      />

      <motion.div
        animate={{ marginLeft: (!isMobile && sidebarOpen) ? 272 : 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      >

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem', minHeight: isMobile ? 'auto' : '500px', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined, gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem', alignItems: isMobile ? 'start' : 'center' }}>

              {/* Logo (mobile top) */}
              {isMobile && (
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                  <img src={logoImage} alt="MeetHub Logo" style={{ width: '6rem', height: 'auto', objectFit: 'contain' }} />
                </motion.div>
              )}

              {isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                  <TutorialVideo />
                </motion.div>
              )}

              <div style={{ maxWidth: isMobile ? '100%' : '650px', marginTop: isMobile ? '0' : '-2.5rem' }}>
                {/* Logo (desktop) */}
                {!isMobile && (
                  <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                    <img src={logoImage} alt="MeetHub Logo" style={{ width: isTablet ? '6rem' : '8rem', height: 'auto', objectFit: 'contain' }} />
                  </motion.div>
                )}

                <motion.h1
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px', fontWeight: 700, marginTop: '1rem', marginBottom: '1rem', lineHeight: isMobile ? '38px' : isTablet ? '46px' : '58px', letterSpacing: '-0.025em' }}
                >
                  <span style={{ color: BRAND.primary, fontWeight: 900 }}>Explore MeetHub</span>{' '}
                  <span style={{ color: BRAND.dark }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 400, color: BRAND.slate, marginTop: '-0.75rem', marginBottom: '1.5rem', lineHeight: isMobile ? '22px' : '26px' }}
                >
                  Learn how to streamline meetings, boost collaboration, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </motion.p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {['Quick start guides for instant setup', 'Advanced analytics walkthroughs', 'How it works steps for smooth onboarding'].map((feature, idx) => (
                    <motion.div key={feature} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: isMobile ? '1.75rem' : '2.25rem', height: isMobile ? '1.75rem' : '2.25rem', borderRadius: '0.5rem', background: `${BRAND.primary}18`, border: `2px solid ${BRAND.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle style={{ width: isMobile ? '1rem' : '1.25rem', height: isMobile ? '1rem' : '1.25rem', color: BRAND.primary }} />
                      </div>
                      <span style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 500, color: BRAND.slate, lineHeight: isMobile ? '22px' : '26px' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4rem' }} animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <TutorialVideo />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION HEADER ── */}
        <section style={{ padding: isMobile ? '2.5rem 1rem 1.5rem' : '3rem 1.5rem 2rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '34px' : '40px', fontWeight: 700, color: 'rgb(20,47,83)', marginBottom: '0.75rem', lineHeight: isMobile ? '36px' : isTablet ? '42px' : '48px' }}>
              Complete Step-by-Step Guide
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '15px' : '17px', color: BRAND.slate, margin: '0 auto', lineHeight: isMobile ? '23px' : '26px', fontWeight: 400 }}>
              Master MeetHub with our comprehensive guide covering every feature from sign-up to advanced functionality
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem', margin: '1.25rem auto 0', maxWidth: 'fit-content', background: `linear-gradient(135deg, ${BRAND.primary}10, rgba(59,130,246,0.10))`, border: `1.5px solid ${BRAND.primary}30`, borderRadius: '999px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: `0 4px 12px ${BRAND.primary}12, inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, boxShadow: `0 2px 8px ${BRAND.primary}20, inset 0 -2px 0 ${BRAND.primary}30`, flexShrink: 0 }}>
                <ArrowLeft size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem', color: BRAND.primaryDk, fontWeight: 600, letterSpacing: '-0.01em' }}>
                {isMobile ? 'Use buttons to navigate steps' : 'Use arrow keys to navigate between steps'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, boxShadow: `0 2px 8px ${BRAND.primary}20, inset 0 -2px 0 ${BRAND.primary}30`, flexShrink: 0 }}>
                <ArrowRight size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STICKY NAV ── */}
        <div data-sticky-nav style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(248,250,252,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0.75rem 1rem' : '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {!isMobile && (
              <motion.button onClick={() => setSidebarOpen(o => !o)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '5px 12px 5px 7px', background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.06), rgba(15,23,42,0.03))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '45' : 'rgba(0,0,0,0.1)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', flexShrink: 0, transition: 'all 0.22s ease' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', flexShrink: 0, background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.1), rgba(15,23,42,0.06))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '40' : 'rgba(0,0,0,0.12)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                  {[13, 9, 13].map((w, i) => (<div key={i} style={{ width: `${w}px`, height: '1.5px', borderRadius: '2px', background: sidebarOpen ? BRAND.primaryDk : BRAND.slate, transition: 'all 0.2s ease' }} />))}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: sidebarOpen ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>{sidebarOpen ? 'Hide index' : 'Tutorial Index'}</span>
              </motion.button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentStep?.iconColor, boxShadow: `0 0 8px ${currentStep?.iconColor}60` }} />
              {!isMobile && (<span style={{ fontSize: '12px', fontWeight: 600, color: BRAND.slate, whiteSpace: 'nowrap', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSection?.sectionTitle}</span>)}
            </div>
            <div style={{ flex: 1 }}>
              <ProgressBar current={globalIdx} total={TOTAL_STEPS} color={currentStep?.iconColor || BRAND.primary} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: BRAND.slate, whiteSpace: 'nowrap', flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{globalIdx + 1} / {TOTAL_STEPS}</span>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {[{ id: 'step', Icon: List, label: 'Step view' }, { id: 'overview', Icon: Grid3X3, label: 'Overview' }].map(({ id, Icon: Ic, label }) => {
                  const active = viewMode === id
                  return (
                    <motion.button key={id} onClick={() => setViewMode(id as 'step' | 'overview')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '5px 11px 5px 7px', background: active ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.05), rgba(15,23,42,0.02))', border: `1.5px solid ${active ? BRAND.primary + '45' : 'rgba(0,0,0,0.09)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0, background: active ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.09), rgba(15,23,42,0.05))', border: `1.5px solid ${active ? BRAND.primary + '40' : 'rgba(0,0,0,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic size={12} color={active ? BRAND.primaryDk : BRAND.slate} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: active ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>{label}</span>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── STEP VIEW ── */}
        {viewMode === 'step' && (
          <section style={{ padding: isMobile ? '1.5rem 1rem 2.5rem' : isTablet ? '2.5rem 2rem 3.5rem' : '3rem 3.5rem 4.5rem', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <div ref={contentRef} style={{ scrollMarginTop: '90px', width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div key={`section-${currentSection?.sectionId}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center', width: '100%', maxWidth: '700px' }}>
                  <p style={{ fontSize: isMobile ? '13px' : '14px', color: BRAND.muted, margin: 0, lineHeight: 1.65, fontFamily: '"Inter", sans-serif' }}>
                    {currentSection?.sectionDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ width: '100%', maxWidth: '1160px' }}>
              <AnimatePresence mode="wait">
                <StepCard key={globalIdx} step={currentStep} isMobile={isMobile} isTablet={isTablet} globalIdx={globalIdx} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} setGlobalIdx={setGlobalIdx} setIsUserNavigation={setIsUserNavigation}/>
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ── OVERVIEW GRID ── */}
        {viewMode === 'overview' && (
          <section style={{ padding: isMobile ? '1.5rem 1rem 3rem' : '2.5rem 3rem 4rem', maxWidth: '1280px', margin: '0 auto', background: 'linear-gradient(180deg, #f0f9ff 0%, #f8fafc 40%, #ffffff 100%)' }}>
            {tutorialSections.map((section, secIdx) => {
              const sectionColor = (section as any).sectionColor || BRAND.primary
              return (
                <motion.div key={section.sectionId} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ marginBottom: isMobile ? '3.5rem' : '5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '2px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ width: '5px', height: '44px', borderRadius: '4px', flexShrink: 0, background: `linear-gradient(180deg, ${sectionColor}, ${sectionColor}55)`, boxShadow: `0 2px 8px ${sectionColor}40` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: BRAND.dark, margin: 0, lineHeight: 1.2 }}>{section.sectionTitle}</h3>
                        <span style={{ fontSize: '11px', color: BRAND.muted, fontFamily: '"Inter", sans-serif', flexShrink: 0, background: 'rgba(0,0,0,0.04)', padding: '2px 9px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)' }}>{section.steps.length} {section.steps.length === 1 ? 'step' : 'steps'}</span>
                      </div>
                      {!isMobile && (<p style={{ fontSize: '12.5px', color: BRAND.muted, margin: '5px 0 0', fontFamily: '"Inter", sans-serif', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '580px', whiteSpace: 'nowrap' }}>{section.sectionDescription}</p>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '7px', flexShrink: 0 }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: BRAND.slate, background: 'rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.09)', padding: '4px 11px', borderRadius: '999px', fontFamily: '"Inter", sans-serif' }}>Section {secIdx + 1}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', color: BRAND.muted, fontFamily: '"Inter", sans-serif' }}>{section.steps.filter(st => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length}/{section.steps.length} done</span>
                        <div style={{ width: '80px', height: '5px', background: 'rgba(0,0,0,0.07)', borderRadius: '5px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '5px', background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}aa)`, width: `${(section.steps.filter(st => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length / section.steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '1.25rem' : '1.5rem' }}>
                    {section.steps.map((step, stepLocalIdx) => {
                      const stepGlobalIdx = ALL_STEPS.findIndex(s => s.number === step.number)
                      const Icon = step.icon
                      const isPast    = stepGlobalIdx < globalIdx
                      const isCurrent = stepGlobalIdx === globalIdx
                      return (
                        <motion.button key={step.number} id={`overview-step-${stepGlobalIdx}`} onClick={() => { handleStepClick(stepGlobalIdx); setViewMode('step') }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: stepLocalIdx * 0.04, ease: 'easeOut' }} whileHover={{ y: -6, boxShadow: `0 20px 48px ${step.iconColor}28, 0 4px 12px rgba(0,0,0,0.08)`, transition: { duration: 0.18 } }} whileTap={{ scale: 0.985, transition: { duration: 0.1 } }}
                          style={{ display: 'flex', flexDirection: 'column', borderRadius: '20px', textAlign: 'left', background: isPast ? `linear-gradient(160deg, ${step.iconColor}06, #f8fafc)` : 'white', borderTop: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderRight: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderBottom: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderLeft: `6px solid ${step.iconColor}`, cursor: 'pointer', boxShadow: isCurrent ? `0 8px 32px ${step.iconColor}25, 0 0 0 4px ${step.iconColor}10` : '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', minHeight: isMobile ? 'auto' : '240px' }}
                        >
                          <div style={{ padding: isMobile ? '1.5rem 1.5rem 1.5rem 1.25rem' : '1.75rem 1.75rem 1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isPast ? '#10B981' : isCurrent ? step.iconColor : `${step.iconColor}15`, border: isPast || isCurrent ? 'none' : `2px solid ${step.iconColor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isCurrent ? `0 3px 10px ${step.iconColor}50` : 'none', transition: 'all 0.2s ease', flexShrink: 0 }}>
                                {isPast ? <CheckCircle size={15} color="white" strokeWidth={2.5} /> : <span style={{ fontSize: '11px', fontWeight: 800, color: isCurrent ? 'white' : step.iconColor, fontFamily: '"Inter", sans-serif' }}>{step.number}</span>}
                              </div>
                              {isCurrent && (<div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: `${step.iconColor}12`, border: `1.5px solid ${step.iconColor}40` }}><div style={{ width: '7px', height: '7px', borderRadius: '50%', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}90` }} /><span style={{ fontSize: '10px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Current</span></div>)}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                              <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, boxShadow: isPast ? 'none' : `0 4px 14px ${step.iconColor}35`, background: isPast ? `${step.iconColor}15` : `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                                <Icon size={19} color={isPast ? step.iconColor : 'white'} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: isPast ? BRAND.slate : BRAND.dark, fontFamily: '"Poppins", sans-serif', lineHeight: 1.3, paddingTop: '3px' }}>{step.title}</span>
                            </div>
                            <p style={{ fontSize: isMobile ? '12px' : '13px', color: BRAND.slate, lineHeight: 1.65, fontFamily: '"Inter", sans-serif', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{step.description}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
                              <span style={{ fontSize: '11.5px', color: BRAND.muted, fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>{step.details.length} key {step.details.length === 1 ? 'point' : 'points'}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: step.iconColor }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>{isPast ? 'Review' : 'Open'}</span>
                                <ArrowRight size={12} strokeWidth={2.5} />
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </section>
        )}
</motion.div>
        {/* ── CTA SECTION── */}
<div style={{ padding: isMobile ? '2.5rem 1.25rem 3rem' : '1rem 1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 40%, #eef2ff 100%)', borderTop: '1px solid rgba(99,179,237,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,179,237,0.35)', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: '#0369a1', marginBottom: '1.25rem', letterSpacing: '0.03em', boxShadow: '0 2px 8px rgba(99,179,237,0.15)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)', display: 'inline-block' }} />
            All systems ready
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '24px' : '34px', fontWeight: 700, color: BRAND.dark, marginBottom: '0.65rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Ready to get started?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontSize: '15px', color: BRAND.slate, maxWidth: '380px', margin: '0 auto 1.75rem', lineHeight: 1.65 }}>
            You've covered the essentials. Head to the Dashboard to put MeetHub to work.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <motion.button
              onClick={() => window.location.href = 'https://meethub.biz/6ef87369-e900-416c-af2d-f997b1959ccf/dashboard'}
              whileHover={{ scale: 1.04, y: -2, boxShadow: '0 16px 40px rgba(15,23,42,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: isMobile ? '1rem 2rem' : '1.05rem 2.4rem', background: `linear-gradient(135deg, ${BRAND.dark} 0%, #1e3a5f 50%, ${BRAND.mid} 100%)`, color: 'white', borderRadius: '14px', border: 'none', fontSize: isMobile ? '15px' : '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(15,23,42,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden', letterSpacing: '-0.01em' }}
            >
              <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Go to Dashboard</span>
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
                <ArrowRight size={18} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>


      {/* ── FLOATING SCROLL BUTTONS ── */}
      {!isMobile && (
        <div style={{ position: 'fixed', right: '1.5rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 400 }}>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            title="Back to top"
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${BRAND.primary}55, 0 2px 6px rgba(0,0,0,0.12)` }}
          >
            <ArrowUp size={20} color="white" strokeWidth={2.5} />
          </motion.button>
          <motion.button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            whileHover={{ scale: 1.12, y: 2 }}
            whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            title="Go to bottom"
            style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, #0e7490, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px rgba(8,145,178,0.5), 0 2px 6px rgba(0,0,0,0.12)` }}
          >
            <ArrowDown size={20} color="white" strokeWidth={2.5} />
          </motion.button>
        </div>
      )}

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}
