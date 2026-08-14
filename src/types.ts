export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  role: string;
  link: string;
  description: string;
  technologies: string[];
}

export interface SkillItem {
  name: string;
  proficiency: number;
  tooltip: string;
}

export interface SkillsData {
  languages: SkillItem[];
  frameworks: SkillItem[];
  databases: SkillItem[];
  tools: SkillItem[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details: string;
}

export interface PublicationItem {
  title: string;
  venue: string;
  year: string;
  link: string;
}

export interface CVData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  education: EducationItem[];
  publications: PublicationItem[];
}
