import type { Project } from './types';
import dashboard from '../../assets/projects/ventilation/dashboard.png';
import sensors from '../../assets/projects/ventilation/sensors.jpg';

export const ventilation: Project = {
  slug: 'mine-ventilation',
  number: '03',
  name: '矿井智能通风管理',
  subtitle: '把看不见的风，变成可理解的数据。',
  category: '工业监测 · 三维可视化',
  kind: 'real',
  role: '系统设计与开发',
  theme: 'ventilation',
  label: 'ENVIRONMENT, OBSERVED',
  images: [
    {
      src: dashboard,
      title: '通风监测大屏',
      alt: '矿井通风平台数据大屏，展示设备监测、报警信息和历史趋势',
      caption: '将监测数据、报警信息与历史趋势放在同一工作界面中，便于查看通风环境变化。',
    },
    {
      src: sensors,
      title: '传感器管理',
      alt: '通风系统传感器管理页，包含条件筛选、设备列表与数据字段',
      caption: '维护传感器信息，为设备绑定、实时数据展示和历史查询提供基础。',
    },
  ],
  summary: '连接巷道、设备与实时数据，将在线监测、三维编辑和传感器部署预测整合到一个管理平台。',
  tags: ['Spring Boot', 'Vue', 'Three.js', 'WebSocket', 'MySQL', 'Spring Security', 'Pinia'],
  highlights: ['巷道三维编辑与设备绑定', '实时监测与传感器部署预测'],
  background:
    '矿井通风管理需要同时理解空间结构、设备分布与环境变化。项目围绕这一场景，将在线监测、传感器管理、多参数设备管理、历史数据和巷道三维编辑集中到同一平台。',
  responsibilities: [
    '设计并实现基于 Spring Boot 与 Vue 的管理系统，组织监测、设备与历史数据等业务模块。',
    '基于 Three.js 实现巷道三维可视化与编辑，支持巷道增删改查、设备添加编辑，以及传感器和后台数据的绑定。',
    '结合 WebSocket 展示实时监测数据，让设备信息与可视化场景形成关联。',
    '将 CART 决策树与随机森林用于传感器部署预测，支持单条、批量预测并集成到系统中。',
  ],
  architecture: [
    'Vue / Pinia 管理界面与状态管理',
    'Three.js 巷道场景、设备编辑与数据绑定',
    'Spring Boot 业务接口 / Spring Security 权限控制 / WebSocket 实时通信',
    'MySQL 业务数据 / CART 与随机森林部署预测模块',
  ],
  challenges: [
    {
      title: '三维场景，如何与业务数据对应？',
      problem: '巷道、设备和传感器不仅是画面上的对象，还需要关联可维护的业务记录和实时数据。',
      solution:
        '围绕巷道与设备建立编辑入口，将传感器与后台记录绑定，在三维场景中查看对应设备的实时信息。',
    },
    {
      title: '如何把部署预测接入实际操作？',
      problem:
        '预测需要综合巷道类型、支护条件、与入回风口的距离以及风流扰动等特征，而不只是给出孤立的模型结果。',
      solution:
        '使用 CART 决策树和随机森林处理这些特征，将单条与批量预测纳入系统工作流，提供辅助分析入口。',
    },
  ],
  reflection:
    '延伸思考：部署预测应作为辅助分析，而非安全决策的替代。模型泛化能力、数据质量和现场适用性仍需单独验证；这里不作预测准确率或生产安全效果的承诺。',
};
