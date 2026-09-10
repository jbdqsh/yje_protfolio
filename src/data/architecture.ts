export const architectureNodes = [
  {
    id: 'api',
    label: '接口层',
    technology: 'Spring Boot',
    summary: '把入口收好，让业务专注。',
    detail:
      '承接运营后台请求，明确参数、角色权限与返回结果。Spring Security 负责访问控制，业务规则留在对应业务模块。',
    example: '例如：创建合同、查询排班、更新工单状态。',
  },
  {
    id: 'business',
    label: '业务层',
    technology: 'Domain Services',
    summary: '让业务规则，有自己的位置。',
    detail:
      '围绕合同、排班、派单与履约组织模块。在接单、开始服务和完成服务等操作中校验当前状态，保持状态流转清晰。',
    example: '例如：派单时结合技能、请假与已有工单时间冲突。',
  },
  {
    id: 'cache',
    label: '缓存',
    technology: 'Redis',
    summary: '为高频访问，留一条近路。',
    detail:
      'Redis 是项目技术栈的一部分。此图用它表示缓存边界；缓存对象、失效策略与数据库一致性需要按具体场景设计。',
    example: '设计提示：先明确数据时效要求，再决定是否缓存。',
  },
  {
    id: 'queue',
    label: '消息队列',
    technology: 'RocketMQ',
    summary: '让交易与履约，各自推进。',
    detail:
      '通过消息异步触发合同创建、管家分配和周期工单生成，减少订单交易链路与后续处理之间的直接耦合。',
    example: '设计提示：消费幂等与失败补偿是进一步完善的方向。',
  },
  {
    id: 'data',
    label: '数据层',
    technology: 'MyBatis-Plus',
    summary: '为业务事实，留下可靠记录。',
    detail:
      '围绕合同、排班、工单与人员信息组织持久化访问。数据访问层处理读写，业务层决定状态变化的条件。',
    example: '设计提示：明确事务边界，让状态更新与业务规则相互对应。',
  },
];
