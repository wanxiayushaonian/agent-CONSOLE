// ===== Types =====

export type AgentStatus = "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED";

export type LogType = "action" | "observation" | "conflict" | "system";

export type LogStatus = "pending" | "running" | "done";

export interface AgentLog {
  id: number;
  type: LogType;
  content: string;
  status: LogStatus;
  timestamp?: string;
}

export interface ConflictItem {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium";
  icon: string;
}

export interface InterventionOption {
  id: "A" | "B";
  label: string;
  reasoning: string;
  riskLevel: "high" | "low";
  nextLogs: AgentLog[];
  finalDecision: FinalDecision;
}

export interface ActionItem {
  role: string;
  task: string;
  deadline: string;
}

export interface FinalDecision {
  conclusion: string;
  conclusionType: "positive" | "conservative";
  tag: string;
  actionPlan: ActionItem[];
  riskWarning: string;
}

// ===== Task Info =====

export const taskInfo = {
  taskName: "销售分析任务 — A级客户跟进",
  agentName: "Sales-Analyzer-Agent v2.4",
  taskDescription:
    "针对 CRM 中标记为 A 级的客户进行销售可行性分析，结合历史知识库与资源排期，输出可执行的销售行动计划。",
  targetCustomer: "智链科技有限公司",
  customerLevel: "A 级",
  budget: "50 万",
};

// ===== Stages =====

export const stages = [
  { id: 0, name: "数据采集", weight: 15 },
  { id: 1, name: "知识检索", weight: 30 },
  { id: 2, name: "冲突检测", weight: 45 },
  { id: 3, name: "人工裁决", weight: 65 },
  { id: 4, name: "方案生成", weight: 85 },
  { id: 5, name: "任务完成", weight: 100 },
];

// ===== Initial Logs (steps 1-5, runs until PAUSED) =====

export const initialLogs: AgentLog[] = [
  {
    id: 1,
    type: "action",
    content: "正在拉取 CRM 客户档案...",
    status: "done",
  },
  {
    id: 2,
    type: "observation",
    content:
      "提取成功。客户：智链科技有限公司；客户级别：A；明确预算：50 万；决策周期：2 周。",
    status: "done",
  },
  {
    id: 3,
    type: "action",
    content: "正在检索历史销售知识库...",
    status: "done",
  },
  {
    id: 4,
    type: "conflict",
    content:
      "发现冲突：同类客户 Demo 失败率达 70%，且下周技术资源仅剩 2 场排期。",
    status: "done",
  },
  {
    id: 5,
    type: "system",
    content: "检测到冲突与资源瓶颈，任务暂停，等待人工裁决...",
    status: "done",
  },
];

// ===== Conflict Items =====

export const conflictItems: ConflictItem[] = [
  {
    id: "conflict-1",
    title: "客户预算 vs Demo 失败率",
    detail: "客户预算高达 50 万，但同类客户历史 Demo 失败率达 70%，投入产出比存疑。",
    severity: "high",
    icon: "budget",
  },
  {
    id: "conflict-2",
    title: "CRM 级别 vs 知识库质量",
    detail: "客户为 A 级高价值客户，但知识库中针对该行业的资料质量不足，难以支撑深度方案。",
    severity: "high",
    icon: "level",
  },
  {
    id: "bottleneck",
    title: "技术资源瓶颈",
    detail: "下周技术 Demo 排期仅剩 2 场，无法同时支撑所有高优先级客户。",
    severity: "medium",
    icon: "resource",
  },
];

// ===== Intervention Options =====

export const interventions: InterventionOption[] = [
  {
    id: "A",
    label: "强行推进 (特批技术资源)",
    reasoning: "基于 A 级客户价值，承担失败风险，争取高回报机会。",
    riskLevel: "high",
    nextLogs: [
      {
        id: 6,
        type: "action",
        content: "接收人工指令：强行推进。正在重新规划排期...",
        status: "done",
      },
      {
        id: 7,
        type: "observation",
        content:
          "排期更新成功：下周特批 3 场技术 Demo，其中 1 场深度 Demo 安排在周三。",
        status: "done",
      },
      {
        id: 8,
        type: "action",
        content: "正在生成销售行动计划...",
        status: "done",
      },
      {
        id: 9,
        type: "system",
        content: "决策生成完成，任务结束。",
        status: "done",
      },
    ],
    finalDecision: {
      conclusion: "值得重点跟进（高风险高回报）",
      conclusionType: "positive",
      tag: "高优先级",
      actionPlan: [
        {
          role: "销售经理",
          task: "2 小时内回电确认核心痛点，补全客户资料。",
          deadline: "今日 18:00 前",
        },
        {
          role: "售前技术",
          task: "特批增加 1 场技术排期，下周三进行深度 Demo。",
          deadline: "下周三 14:00",
        },
        {
          role: "解决方案架构师",
          task: "准备行业定制化方案 PPT，覆盖客户 3 个核心场景。",
          deadline: "下周二 12:00 前",
        },
      ],
      riskWarning:
        "准备轻量化备选方案，若 Demo 沟通不畅及时降级为文档交付，避免资源浪费。",
    },
  },
  {
    id: "B",
    label: "降级跟进 (仅提供产品文档)",
    reasoning: "保守策略，避免浪费稀缺技术资源，先以文档培育客户认知。",
    riskLevel: "low",
    nextLogs: [
      {
        id: 6,
        type: "action",
        content: "接收人工指令：降级跟进。正在生成方案...",
        status: "done",
      },
      {
        id: 7,
        type: "observation",
        content:
          "方案更新成功：寄送定制化产品白皮书 + 行业案例集，安排下周回访。",
        status: "done",
      },
      {
        id: 8,
        type: "action",
        content: "正在生成销售行动计划...",
        status: "done",
      },
      {
        id: 9,
        type: "system",
        content: "决策生成完成，任务结束。",
        status: "done",
      },
    ],
    finalDecision: {
      conclusion: "保守培育，择机升级（低风险稳健）",
      conclusionType: "conservative",
      tag: "中优先级",
      actionPlan: [
        {
          role: "销售经理",
          task: "今日寄送定制化产品白皮书与行业案例集，邮件跟进。",
          deadline: "今日 17:00 前",
        },
        {
          role: "内容运营",
          task: "整理 3 份同行业成功案例 PDF，附在白皮书后。",
          deadline: "今日 16:00 前",
        },
        {
          role: "销售经理",
          task: "下周二电话回访，评估客户认知度，决定是否升级为 Demo。",
          deadline: "下周二 10:00",
        },
      ],
      riskWarning:
        "若客户在回访中表现出明确的技术评估需求，需立即申请技术资源升级跟进，避免错失窗口期。",
    },
  },
];
