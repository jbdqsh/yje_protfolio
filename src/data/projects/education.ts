import type { Project } from './types';
import platform from '../../assets/projects/education/platform.png';

export const education: Project = {
  slug: 'teaching-quality',
  number: '02',
  name: '教学质量与 OBE 分析',
  subtitle: '让教学过程，留下清晰的依据。',
  category: '教育数字化 · 数据管理',
  kind: 'real',
  period: '2024.12 — 2025.08',
  role: '后端开发',
  theme: 'education',
  label: 'EDUCATION, CONNECTED',
  images: [
    {
      src: platform,
      title: '平台登录与业务入口',
      alt: 'OBE 教学管理平台登录页，展示教学归档、智慧教学、教学成果与教学日历入口',
      caption: '教学管理平台的登录与业务入口，连接教学归档、成果和日历等工作场景。',
    },
  ],
  summary: '把课程、教学归档与目标达成度连接起来，为高校教学管理提供结构化的数据基础。',
  tags: ['Spring Boot', 'MySQL', 'EasyExcel', 'Vue'],
  highlights: ['课程与归档的数据建模', '分片上传与断点下载'],
  background:
    '平台面向学院、专业负责人、教师与学生，统一管理基础教学数据、培养方案、课程目标、毕业要求、成绩及课程归档，并支持课程目标和毕业要求达成度分析。',
  responsibilities: [
    '参与课程管理、授课班级管理、课程归档与数据字典的数据库设计和后端实现。',
    '实现通过表格上传进行课程归档的增删改操作。',
    '实现归档材料的分片上传、秒传及断点下载功能。',
  ],
  architecture: [
    'Vue 教学管理界面',
    'Spring Security 权限控制 / Spring Boot 业务接口',
    '课程、授课班级、归档与数据字典模块',
    'EasyExcel 表格处理 / MyBatis-Plus 数据访问 / MySQL / Redis',
  ],
  challenges: [
    {
      title: '教学数据，如何保持清晰的关联？',
      problem: '课程、授课班级和归档资料之间存在联系，独立维护容易让数据失去上下文。',
      solution: '参与相关模块的数据表设计与接口实现，以结构化关联支撑课程管理和归档业务。',
    },
    {
      title: '大文件与不稳定网络，如何兼顾？',
      problem: '归档资料的传输可能耗时较长，一次失败不应导致所有传输进度作废。',
      solution: '实现分片上传、秒传与断点下载能力，让归档资料支持更灵活的传输过程。',
    },
  ],
  reflection:
    '延伸思考：文件秒传还需要结合访问权限、文件归属与完整性校验设计，不能仅凭内容摘要开放文件访问。这里记录的是通用设计建议。',
};
