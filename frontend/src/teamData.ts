export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  responsibility: string;
  bio: string;
  photoUrl?: string; // Provide an image path (e.g., '/team/member1.jpg') or leave undefined for the stylized placeholder
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
 * To update member details:
 * 1. Replace placeholder names ("Team Member 1", etc.) with real names.
 * 2. Update official designations, areas of responsibility, and bios.
 * 3. Add an image link in `photoUrl` or leave empty to keep the premium monogram avatar.
 * 4. Add or remove member objects as your team evolves.
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'team-member-1',
    name: 'Team Member 1',
    designation: 'Leadership & Technical Architecture',
    responsibility: 'System Architecture & Engineering Strategy',
    bio: 'Directs the engineering vision and software design at NJEX, building resilient and scalable digital foundations for client platforms.',
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
