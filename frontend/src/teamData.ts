import member1Photo from './assets/team/member-1.jpg';
import member2Photo from './assets/team/member-2.jpg';
import member3Photo from './assets/team/member-3.png';

export interface TeamSocialLinks {
  portfolio?: string;
  github?: string;
  linkedin?: string;
}

export interface TeamMember {
  id: string;
  role: string;
  area: string;
  photoUrl: string;
  socials?: TeamSocialLinks;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'team-member-1',
    role: 'Leadership & Technical Architecture',
    area: 'Engineering Strategy & Systems',
    photoUrl: member1Photo,
    socials: {
      portfolio: 'https://jagan2814.netlify.app/',
      github: 'https://github.com/Jxgxn-007',
      linkedin: 'https://www.linkedin.com/in/jagan-m-a3a786410/',
    },
  },
  {
    id: 'team-member-2',
    role: 'Product Design & User Experience',
    area: 'UI/UX Design & Creative Direction',
    photoUrl: member2Photo,
  },
  {
    id: 'team-member-3',
    role: 'Digital Solutions Specialist',
    area: 'Workflow Automation & Delivery',
    photoUrl: member3Photo,
  },
];
