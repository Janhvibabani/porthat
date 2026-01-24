export interface Profile {
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  resumeUrl: string;
  email: string;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface Experience {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  details: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  url: string;
  date: string;
  description: string;
  tags: string[];
  readingTime?: string;
  platform?: "medium" | "dev" | "hashnode" | "other";
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  grade?: string;
  details?: string[];
}

export interface PullRequest {
  id: string;
  title: string;
  repo: string;
  repoUrl: string;
  prUrl: string;
  status: "merged" | "open" | "closed";
  description: string;
  date: string;
}

export interface PortfolioData {
  theme: string;
  github: string;
  illustration?: boolean;
  profile: Profile;
  roles: string[];
  socials: Social[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  pullRequests: PullRequest[];
  blogs: BlogPost[];
  quotes: string[];
}
