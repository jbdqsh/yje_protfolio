import type { Project } from './types';
import home from '../../assets/projects/forum/home.png';

export const forum: Project = {
  slug: 'yojex-forum',
  number: '04',
  name: 'Yojex 论坛',
  subtitle: '让问题被看见，让经验流动起来。',
  category: '社区产品 · 内容与交流',
  kind: 'real',
  theme: 'forum',
  label: 'IDEAS, IN CONVERSATION',
  images: [
    {
      src: home,
      title: '社区首页',
      alt: 'Yojex 论坛首页，包含文章信息流、问答、话题、热门圈子和搜索入口',
      caption: '以信息流承载内容，用问答、话题和圈子组织不同形式的交流。',
    },
  ],
  summary: '围绕文章、问答与话题圈子组织社区内容，让阅读、发现问题和参与讨论有清晰的入口。',
  tags: ['文章', '问答', '话题圈子', '内容检索'],
  tagsLabel: '产品方向',
  highlights: ['文章与问答的信息流', '搜索、创作与圈子入口'],
  background:
    'Yojex 是一个围绕内容分享与问题交流组织的论坛项目。首页将文章、问答、话题与圈子放在同一阅读场景中，兼顾直接搜索和按兴趣浏览两种发现内容的方式。',
  responsibilitiesLabel: '功能概览',
  evidenceNote: '本页依据实际首页截图介绍可见功能；技术架构与具体开发职责尚未补充，不作推断。',
  responsibilities: [
    '内容信息流：通过文章、问答和推荐等分类切换阅读视角，呈现不同类型的社区内容。',
    '内容发现：保留全局搜索入口，并在侧栏展示最新问答、最新话题与热门圈子。',
    '参与入口：在导航中组织创作、消息、签到与个人中心相关入口，让阅读之后的操作更容易找到。',
  ],
  architecture: [],
  challenges: [],
  reflection:
    '产品思考：社区首页需要同时照顾“带着问题来”和“随意逛逛”的读者。搜索提供明确路径，信息流与圈子则帮助发现新的讨论。这是对现有界面的观察，不代表未提供的后端实现细节。',
};
