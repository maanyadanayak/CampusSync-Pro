
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  resumeUrl: string;
  projects: string[];
}

export enum EventType {
  CLASS = 'CLASS',
  CANCELLED_CLASS = 'CANCELLED_CLASS',
  EXAM = 'EXAM',
  HACKATHON = 'HACKATHON',
  WORKSHOP = 'WORKSHOP',
  DEADLINE = 'DEADLINE',
  FREE_SLOT = 'FREE_SLOT'
}

export interface CampusEvent {
  id: string;
  title: string;
  type: EventType;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  location?: string;
  description?: string;
  isOfficial?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}
