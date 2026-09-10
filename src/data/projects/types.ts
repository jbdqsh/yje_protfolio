import type { ImageMetadata } from 'astro';

export interface ProjectImage {
  src: ImageMetadata;
  title: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  kind: 'real' | 'concept';
  period?: string;
  role?: string;
  summary: string;
  tags: string[];
  tagsLabel?: string;
  theme: 'care' | 'education' | 'ventilation' | 'forum';
  label: string;
  // First image is the only homepage cover; detail pages use the full sequence.
  images: [ProjectImage, ...ProjectImage[]];
  highlights: string[];
  background: string;
  responsibilities: string[];
  responsibilitiesLabel?: string;
  evidenceNote?: string;
  architecture: string[];
  challenges: { title: string; problem: string; solution: string }[];
  reflection: string;
  github?: string;
  demo?: string;
}
