import member1Photo from './assets/team/member-1.jpg';
import member2Photo from './assets/team/member-2.jpg';
import member3Photo from './assets/team/member-3.jpg';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  responsibility: string;
  bio: string;
  photoUrl?: string; // Provide an image path or imported asset
  avatarPlaceholder: {
    initials: string;
    badgeText: string;
  };
  socialLinks?: {
    linkedin?: string;
    portfolio?: string;
    email?: string;
  };
}

/**
 * NJEX COMPANY TEAM DATA
 * -------------------------------------------------------------
 * 1. Team Member 1: Leadership & Technical Architecture (Photo 1)
 * 2. Team Member 2: Product Design & User Experience (Photo 2)
 * 3. Team Member 3: Digital Solutions & Delivery Specialist (Photo 3)
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'team-member-1',
    name: 'Team Member 1',
    designation: 'Leadership & Technical Architecture',
    responsibility: 'System Architecture & Engineering Strategy',
    bio: 'Directs the engineering vision and software design at NJEX, building resilient and scalable digital foundations for client platforms.',
    photoUrl: member1Photo,
    avatarPlaceholder: {
      initials: '01',
      badgeText: 'LEADERSHIP',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'mailto:njtech.in@gmail.com',
    },
  },
  {
    id: 'team-member-2',
    name: 'Team Member 2',
    designation: 'Product Design & User Experience',
    responsibility: 'UI/UX Design Systems & Creative Direction',
    bio: 'Crafts intuitive, visually engaging digital experiences that balance user needs with refined aesthetic precision and branding consistency.',
    photoUrl: member2Photo,
    avatarPlaceholder: {
      initials: '02',
      badgeText: 'DESIGN',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com',
      portfolio: 'https://njex.in',
    },
  },
  {
    id: 'team-member-3',
    name: 'Team Member 3',
    designation: 'Digital Solutions & Delivery Specialist',
    responsibility: 'Custom Integrations & Workflow Automation',
    bio: 'Coordinates practical digital implementations, business automation workflows, and customer journeys from initial concept to launch.',
    photoUrl: member3Photo,
    avatarPlaceholder: {
      initials: '03',
      badgeText: 'SOLUTIONS',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'mailto:njtech.in@gmail.com',
    },
  },
];
