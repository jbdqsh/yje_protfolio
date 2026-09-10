import type { Project } from './types';
import contracts from '../../assets/projects/care/contracts.png';
import orders from '../../assets/projects/care/orders.jpg';
import payment from '../../assets/projects/care/payment.png';
import workflow from '../../assets/projects/care/workflow.png';

export const care: Project = {
  slug: 'care-operations',
  number: '01',
  name: '众安康',
  subtitle: '让服务，从订单走到家门。',
  category: '服务履约 · 运营平台',
  kind: 'real',
  period: '2024.10 — 2025.06',
  role: '后端 + Web 开发',
  theme: 'care',
  label: 'CARE OPERATIONS',
  images: [
    {
      src: contracts,
      title: '合同管理',
      alt: '众安康运营后台的套餐合同列表与状态筛选界面',
      caption: '运营后台集中管理套餐合同，连接客户、服务内容与履约状态。',
    },
    {
      src: orders,
      title: '管家订单',
      alt: '管家端订单列表，展示服务套餐、订单状态与费用',
      caption: '从管家视角查看不同阶段的订单，明确每一笔服务的当前状态。',
    },
    {
      src: payment,
      title: '订单与支付',
      alt: '移动端订单详情，包含服务信息、费用与支付入口',
      caption: '在订单详情中确认服务内容与费用，再进入支付环节。',
    },
    {
      src: workflow,
      title: '合同状态流转',
      alt: '套餐合同从创建到支付、激活、终止等状态的流转图',
      caption: '将合同生命周期画成状态图，梳理操作与状态变更之间的关系。',
    },
  ],
  summary: '连接客户、管家与服务人员，将购买、排班、派单和上门履约串成一条完整的服务链路。',
  tags: [
    'Spring Boot',
    'Redis',
    'RocketMQ',
    'Vue',
    'MyBatis-Plus',
    'Spring Security',
    'WebSocket',
    'Elasticsearch',
    'Knife4j',
  ],
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
};
