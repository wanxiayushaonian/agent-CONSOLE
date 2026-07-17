# Agent Console · Agent 决策监控台

> 🚀 **在线演示 / Live Demo**：[https://agent-console-inky.vercel.app](https://agent-console-inky.vercel.app)
>
> 📦 **源码仓库**：[github.com/wanxiayushaonian/agent-CONSOLE](https://github.com/wanxiayushaonian/agent-CONSOLE)

> Human-in-the-Loop（人工介入环）AI Agent 决策监控界面。
> 实时展示 Agent 思考流、冲突预警与决策看板，支持人工干预决策。

## 项目简介

本项目是一个 **企业级 AI Agent 执行过程可视化监控 Demo**，采用三栏布局：

| 区域 | 功能 |
|------|------|
| **左栏 (25%)** | Agent 状态、运行时长、执行阶段进度条 |
| **中栏 (45%)** | 实时思考流日志（打字机效果展示 Action / Observation / Conflict） |
| **右栏 (30%)** | 冲突预警卡片、人工干预选项、最终决策看板 |

> ⚠️ 当前版本使用 **Mock 数据**模拟 Agent 执行流程（`src/lib/mockData.ts`），未连接真实 Agent 后端。

## 技术栈

- **框架**：[Next.js 16](https://nextjs.org/)（App Router + Turbopack）+ [React 19](https://react.dev/)
- **语言**：TypeScript 5
- **样式**：[Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)（Radix UI）
- **图表**：[Recharts](https://recharts.org/)
- **其他**：lucide-react、cmdk、sonner、zod

## 环境要求

| 工具 | 版本 | 说明 |
|------|------|------|
| Node.js | ≥ 18.18（推荐 20+） | 已测试 v22.22.3 |
| npm | ≥ 9 | 随 Node 安装 |

> 项目为纯前端 + Mock 数据，npm 即可完成开发、构建与生产启动，无需安装 bun。

## 快速启动（开发模式）

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

启动后访问 **http://localhost:3000** 即可看到监控台界面。

> 首次请求首页时会触发 Turbopack 即时编译（约 1~2 秒），后续访问热更新即时生效。

## 可用脚本

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动开发服务器（端口 3000，热更新） |
| `npm run build` | 构建生产版本（输出 standalone 产物） |
| `npm run start` | 以生产模式启动（需先 build，使用 bun） |
| `npm run lint` | 运行 ESLint 代码检查 |
| `npm run db:push` | 将 Prisma schema 同步到数据库 |
| `npm run db:generate` | 生成 Prisma Client |
| `npm run db:migrate` | 创建并应用数据库迁移 |
| `npm run db:reset` | 重置数据库（慎用，会清空数据） |

## 生产部署

### 方式一：Vercel（推荐，零配置）

本项目已为 Vercel 适配（纯前端 + Mock 数据，无数据库依赖）。

**A. 通过 GitHub（推荐，推送即自动部署）**
1. 将本仓库推送到 GitHub
2. 在 [vercel.com](https://vercel.com) → **New Project** → 导入该仓库
3. 框架自动识别为 Next.js，直接 **Deploy**
4. 后续 `git push` 自动触发重新部署，链接保持不变

**B. 通过 Vercel CLI（无需 GitHub）**
```bash
npm i -g vercel
vercel          # 首次部署（浏览器登录 Vercel）
vercel --prod   # 正式上线，得到 https://<project>.vercel.app
```

### 方式二：自托管 / Node 服务器

```bash
npm run build   # 构建生产产物
npm run start   # 启动生产服务器（默认 3000 端口）
```

如需反向代理，仓库已附带 [`Caddyfile`](./Caddyfile)（将 `:81` 反代到 `:3000`）：

```bash
caddy run --config Caddyfile
```

## 关于数据库（可选）

本项目默认运行 **不需要数据库**：主页使用 Mock 数据，Prisma 模块（`src/lib/db.ts`）当前未被任何页面导入。

如需启用 Prisma + SQLite，按以下步骤操作：

```bash
# 1. 创建 .env 文件并配置数据库连接（SQLite 文件路径）
echo 'DATABASE_URL="file:./dev.db"' > .env

# 2. 生成 Prisma Client 并创建数据表
npm run db:generate
npm run db:push
```

数据库模型定义见 [`prisma/schema.prisma`](./prisma/schema.prisma)（当前包含 `User` 与 `Post` 两个示例模型）。

## 目录结构

```
agent-console-src/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 监控台主页（三栏布局主逻辑）
│   │   ├── globals.css           # 全局样式
│   │   └── api/                  # API 路由
│   ├── components/
│   │   ├── agent-console/        # 监控台业务组件（左/中/右栏、卡片等）
│   │   └── ui/                   # shadcn/ui 基础组件
│   ├── hooks/                    # 自定义 React Hooks
│   └── lib/                      # 工具函数、Mock 数据、Prisma 客户端
├── prisma/                       # Prisma schema
├── examples/                     # WebSocket 示例（前后端）
├── public/                       # 静态资源
├── Caddyfile                     # Caddy 反向代理配置
├── next.config.ts                # Next.js 配置（standalone 输出）
└── package.json
```

## 常见问题

**Q: 启动时报 `DATABASE_URL` 相关错误？**
A: 默认运行无需数据库。仅当你在代码中实际导入并使用 `@/lib/db` 时才需要配置 `.env`（见「关于数据库」一节）。

**Q: 想用 bun 而非 npm？**
A: 安装 [bun](https://bun.sh/) 后，将上述命令中的 `npm` 换成 `bun` 即可（如 `bun install`、`bun run dev`）。

**Q: 控制台出现「multiple lockfiles」警告？**
A: 无害。Next.js 检测到上层目录存在其他 lockfile。如需消除，可在 `next.config.ts` 中配置 `turbopack.root`。
