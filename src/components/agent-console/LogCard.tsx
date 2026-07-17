"use client";

import { AgentLog } from "@/lib/mockData";
import { TypewriterText } from "./TypewriterText";
import {
  Activity,
  AlertTriangle,
  Eye,
  Cpu,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface LogCardProps {
  log: AgentLog;
  isLatest: boolean;
  onTypingComplete?: () => void;
  index: number;
}

const typeConfig = {
  action: {
    icon: Activity,
    label: "ACTION",
    color: "text-[#00FFE1]",
    bgColor: "bg-[#00FFE1]/5",
    borderColor: "border-[#00FFE1]/20",
    iconBg: "bg-[#00FFE1]/10",
  },
  observation: {
    icon: Eye,
    label: "OBSERVATION",
    color: "text-[#9D4EDD]",
    bgColor: "bg-[#9D4EDD]/5",
    borderColor: "border-[#9D4EDD]/20",
    iconBg: "bg-[#9D4EDD]/10",
  },
  conflict: {
    icon: AlertTriangle,
    label: "CONFLICT",
    color: "text-[#FFB800]",
    bgColor: "bg-[#FFB800]/5",
    borderColor: "border-[#FFB800]/30",
    iconBg: "bg-[#FFB800]/10",
  },
  system: {
    icon: Cpu,
    label: "SYSTEM",
    color: "text-zinc-400",
    bgColor: "bg-zinc-500/5",
    borderColor: "border-zinc-500/20",
    iconBg: "bg-zinc-500/10",
  },
};

export function LogCard({
  log,
  isLatest,
  onTypingComplete,
  index,
}: LogCardProps) {
  const config = typeConfig[log.type];
  const Icon = config.icon;
  const isRunning = log.status === "running" && isLatest;

  return (
    <div
      className={`animate-slide-in relative flex gap-3 p-3 rounded-lg border ${config.borderColor} ${config.bgColor} ${
        isRunning ? "animate-breathing" : ""
      }`}
    >
      {/* Step number */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-md ${config.iconBg} ${config.color} text-xs font-mono font-bold`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        {isRunning && (
          <Loader2 className="w-3 h-3 animate-spin-smooth text-[#00FFE1]" />
        )}
        {log.status === "done" && !isLatest && (
          <CheckCircle2 className="w-3 h-3 text-[#39FF14]/60" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
          <span
            className={`font-mono text-[10px] font-bold tracking-wider ${config.color} uppercase`}
          >
            {config.label}
          </span>
        </div>
        <div className="font-mono text-sm text-foreground/90 leading-relaxed break-words">
          {isLatest ? (
            <TypewriterText
              text={log.content}
              speed={20}
              onComplete={onTypingComplete}
            />
          ) : (
            log.content
          )}
        </div>
      </div>
    </div>
  );
}
