export const profile = {
  name: '严加恩',
  englishName: 'JIAEN YAN',
  initials: 'JY',
  role: 'Java开发/AI全栈开发',
  headline: ['把复杂业务，', '做成清晰', '可靠的系统。'],
  intro:
    '关注业务背后的逻辑，也在意每一次交付的体验。从服务履约到教学管理，用代码连接真实的问题与可用的答案。',
  email: '3489023486@qq.com',
  github: 'https://github.com/jbdqsh/',
  resume: '/resume-jiaen-yan.pdf',
  location: '中国 · 江苏',
  status: '寻找后端开发机会',
  aboutTitle: '代码之外，\n始终是具体的问题。',
  about: [
    '你好，我是严加恩，江苏大学软件工程硕士在读。我喜欢把一段复杂的业务流程拆解清楚，再把它变成职责明确、易于维护的代码。',
    '从居家照护的周期排班，到教学材料的归档管理，我关注系统如何贴近使用者的实际工作。也在探索 AI 开发工具，让想法更快落地。',
  ],
  education: [
    { date: '2024 — 至今', school: '江苏大学', degree: '软件工程 · 硕士在读' },
    { date: '2020 — 2024', school: '徐州工程学院', degree: '软件工程 · 本科 / 专业前 10%' },
  ],
};

export const navigation = [
  { href: '/#projects', label: '精选项目' },
  { href: '/#about', label: '关于我' },
  { href: '/#notes', label: '开发笔记' },
];

export const skills = [
  {
    number: '01',
    category: '后端开发',
    description: '从领域模型到业务接口',
    tags: [
      'Java',
      'Spring Boot',
      'Spring Cloud',
      'MyBatis-Plus',
      'Spring Security',
      'WebSocket',
      'EasyExcel',
      'Knife4j',
    ],
  },
  {
    number: '02',
    category: '数据与中间件',
    description: '让数据有序地存储与流动',
    tags: ['MySQL', 'Oracle', 'Redis', 'RocketMQ', 'Elasticsearch'],
  },
  {
    number: '03',
    category: '前端与可视化',
    description: '从业务界面到三维场景',
    tags: ['Vue', 'TypeScript', 'JavaScript', 'Pinia', 'Three.js'],
  },
  {
    number: '04',
    category: 'AI 与辅助开发',
    description: '用开发工具与模型拓展产品能力',
    tags: ['Python', 'LangChain', 'LangGraph', 'Milvus', 'Qdrant'],
  },
];

export const copy = {
  projects: {
    eyebrow: 'SELECTED WORK / 01',
    title: '在真实场景中，解决问题。',
    description: '连接业务、数据与使用者。',
    link: '查看项目详情',
  },
  about: { eyebrow: 'A LITTLE ABOUT ME / 02' },
  skills: { eyebrow: 'MY TOOLKIT / 03', title: '技术是工具，理解才是起点。' },
  architecture: {
    eyebrow: 'UNDER THE HOOD / 04',
    title: '让每一层，各司其职。',
    description: '以众安康的订单与履约链路为例，看看一次请求如何穿过系统。',
    hint: '选择节点，了解设计思路',
    note: '架构为基于项目经历整理的简化示意；职责边界与改进建议不代表完整生产部署。',
  },
  notes: {
    eyebrow: 'THINKING IN PUBLIC / 05',
    title: '写下来，想明白。',
    description: '关于业务、代码，以及它们之间的思考。',
  },
  contact: {
    eyebrow: 'LET’S BUILD SOMETHING',
    title: '下一个好项目，\n从一次交流开始。',
    description: '正在寻找 Java 后端开发机会，也欢迎交流项目与技术。',
    copyLabel: '复制邮箱',
    copied: '已复制',
    fallback: '请长按或选中邮箱复制',
    resume: '下载公开版简历',
  },
};
