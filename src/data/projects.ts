export interface Project {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  kind: 'real' | 'concept';
  period: string;
  role: string;
  summary: string;
  tags: string[];
  cover: 'care' | 'education' | 'knowledge';
  coverAlt: string;
  highlights: string[];
  background: string;
  responsibilities: string[];
  architecture: string[];
  challenges: { title: string; problem: string; solution: string }[];
  reflection: string;
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: 'care-operations',
    number: '01',
    name: '众安康',
    subtitle: '让服务，从订单走到家门。',
    category: '服务履约 · 运营平台',
    kind: 'real',
    period: '2024.10 — 2025.06',
    role: '后端 + Web 开发',
    cover: 'care',
    coverAlt: '众安康服务工单与周期排班界面示意图',
    summary: '连接客户、管家与服务人员，将购买、排班、派单和上门履约串成一条完整的服务链路。',
    tags: ['Spring Boot', 'Redis', 'RocketMQ', 'Vue'],
    highlights: ['周期排班与智能派单', '订单到履约的异步解耦'],
    background:
      '居家照护不是一次简单的下单。服务购买之后，还涉及合同生成、多周期排班、人员分配、上门打卡与评价反馈。众安康面向这些连续发生的业务，让不同角色在同一条履约链路中协作。',
    responsibilities: [
      '负责服务项目、客户合同、排班工单及人员管理相关接口，参与领域模型与状态流转的完善。',
      '参与周期排班与服务员分配，根据周期、次数和单次时长生成工单，结合技能、请假及时间冲突处理派单与改派。',
      '参与接单、开始服务、完成服务的状态校验，以及范围打卡、服务前后照片留存。',
      '基于 RocketMQ 异步触发合同创建、管家分配和周期工单生成。',
    ],
    architecture: [
      'Vue 运营后台与多角色业务入口',
      'Spring Security 鉴权 / Spring Boot 业务接口',
      '合同、排班、工单、人员管理等业务模块',
      'Redis 缓存 / RocketMQ 异步事件 / MyBatis-Plus 数据访问',
    ],
    challenges: [
      {
        title: '周期服务，如何变成可执行的工单？',
        problem: '同一份合同可能跨越多个服务周期，人员技能、请假和既有排班又会影响实际执行。',
        solution:
          '根据周期、次数与时长生成工单，派单时结合人员技能、请假记录及时间冲突进行校验，并支持后续改派。',
      },
      {
        title: '订单完成后，如何衔接后续履约？',
        problem: '合同创建、管家分配和工单生成都依赖订单，但不必与交易过程完全同步。',
        solution: '通过 RocketMQ 异步触发后续业务处理，降低交易与履约之间的耦合。',
      },
    ],
    reflection:
      '延伸思考：在异步链路中，应进一步考虑消费幂等、失败补偿和可观测性。这些是对该类系统的设计建议，不作为本项目已落地成果。',
  },
  {
    slug: 'teaching-quality',
    number: '02',
    name: '教学质量与 OBE 分析',
    subtitle: '让教学过程，留下清晰的依据。',
    category: '教育数字化 · 数据管理',
    kind: 'real',
    period: '2024.12 — 2025.08',
    role: '后端开发',
    cover: 'education',
    coverAlt: '教学质量平台课程目标分析与归档状态界面示意图',
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
  },
  {
    slug: 'knowledge-studio',
    number: '03',
    name: '知序 · AI 知识库',
    subtitle: '让答案，有据可循。',
    category: 'AI 应用 · 概念设计',
    kind: 'concept',
    period: '概念探索',
    role: '方案与交互设计（概念）',
    cover: 'knowledge',
    coverAlt: '知序 AI 知识库文档检索及来源引用概念界面',
    summary: '一次围绕团队文档的产品探索：从内容整理到语义检索，让每个回答都能找到自己的出处。',
    tags: ['Python', 'LangChain', 'RAG', 'Vue'],
    highlights: ['文档解析与语义检索', '可追溯的答案引用'],
    background:
      '这是用于展示产品与架构思考的概念设计，并非已交付项目。设想的使用场景是团队文档分散、检索困难，需要从已有资料中获得带来源的回答。',
    responsibilities: [
      '规划文档导入、解析、分段和索引的处理流程。',
      '设计问题输入、片段检索、答案生成和来源追溯的交互。',
      '梳理检索不到信息、资料版本变化等情况下的界面反馈。',
    ],
    architecture: [
      'Vue 文档与问答界面（拟议）',
      'Python API 与文档任务处理（拟议）',
      'LangChain 检索流程 / 向量索引（拟议）',
      '模型调用 / 来源片段与文档元信息（拟议）',
    ],
    challenges: [
      {
        title: '回答看起来合理，如何确认依据？',
        problem: '生成式回答可能缺少出处，读者难以判断是否与原始文档一致。',
        solution: '拟在回答中加入引用编号，支持回看命中的文档片段；检索不足时明确提示信息缺失。',
      },
      {
        title: '文档更新后，如何处理旧知识？',
        problem: '内容和索引的更新不同步可能带来过时的回答。',
        solution: '拟以文档版本关联索引片段，更新时重建对应索引，并展示来源版本。',
      },
    ],
    reflection: '当前仅包含概念方案与静态界面示意，没有运行中的问答后端、用户数据或效果评测。',
  },
];
