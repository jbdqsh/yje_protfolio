import { care } from './projects/care';
import { education } from './projects/education';
import { ventilation } from './projects/ventilation';
import { forum } from './projects/forum';
import type { Project } from './projects/types';

export type { Project, ProjectImage } from './projects/types';
export const projects: Project[] = [care, education, ventilation, forum];
