
import { CampusEvent, EventType, StudentProfile, UserRole } from './types';

export const MOCK_USER: StudentProfile = {
  uid: 'user_123',
  name: 'Alex Rivera',
  email: 'alex.r@campus.edu',
  branch: 'Computer Science',
  year: '3rd Year',
  skills: ['React', 'TypeScript', 'Node.js', 'UI Design'],
  interests: ['AI', 'Open Source', 'Fintech'],
  github: 'https://github.com/alexrivera',
  linkedin: 'https://linkedin.com/in/alexrivera',
  resumeUrl: 'https://drive.google.com/resume',
  projects: ['Smart Parking App', 'E-commerce API']
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const getIso = (hours: number, mins: number = 0) => {
  const d = new Date(today);
  d.setHours(hours, mins);
  return d.toISOString();
};

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: 'e1',
    title: 'Data Structures Lab',
    type: EventType.CLASS,
    startTime: getIso(9),
    endTime: getIso(11),
    location: 'Lab 402',
    isOfficial: true
  },
  {
    id: 'e2',
    title: 'Theory of Computation',
    type: EventType.CANCELLED_CLASS,
    startTime: getIso(11, 30),
    endTime: getIso(12, 30),
    location: 'Room 102',
    description: 'Dr. Smith is on medical leave.',
    isOfficial: true
  },
  {
    id: 'e3',
    title: 'Software Engineering',
    type: EventType.CLASS,
    startTime: getIso(14),
    endTime: getIso(15),
    location: 'Room 205',
    isOfficial: true
  },
  {
    id: 'e4',
    title: 'Google Solution Challenge',
    type: EventType.HACKATHON,
    startTime: getIso(23, 59),
    endTime: getIso(23, 59),
    location: 'Online',
    description: 'Registration Deadline!',
    isOfficial: true
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Class Cancelled',
    message: 'Theory of Computation (11:30 AM) is cancelled today.',
    timestamp: new Date().toISOString(),
    priority: 'high',
    read: false
  },
  {
    id: 'n2',
    title: 'Hackathon Alert',
    message: 'Google Solution Challenge deadline is in 12 hours!',
    timestamp: new Date().toISOString(),
    priority: 'medium',
    read: false
  }
];
