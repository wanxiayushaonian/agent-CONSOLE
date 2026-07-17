"use client";

import { AgentStatus } from "@/lib/mockData";

interface StatusBadgeProps {
  status: AgentStatus;
}

const statusConfig: Record<
  AgentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    glow: string;
    pulse: boolean;
  }
> = {
  IDLE: {
    label: "IDLE",
    color: "text-zinc-400",
    bgColor: "bg-zinc-500/10",
    borderColor: "border-zinc-500/30",
    glow: "",
    pulse: false,
  },
  RUNNING: {
    label: "RUNNING",
    color: "text-[#00FFE1]",
    bgColor: "bg-[#00FFE1]/10",
    borderColor: "border-[#00FFE1]/40",
    glow: "glow-cyan",
    pulse: true,
  },
  PAUSED: {
    label: "PAUSED",
    color: "text-[#FFB800]",
    bgColor: "bg-[#FFB800]/10",
    borderColor: "border-[#FFB800]/40",
    glow: "glow-amber",
    pulse: true,
  },
  COMPLETED: {
    label: "COMPLETED",
    color: "text-[#39FF14]",
    bgColor: "bg-[#39FF14]/10",
    borderColor: "border-[#39FF14]/40",
    glow: "glow-green",
    pulse: false,
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-md border ${config.bgColor} ${config.borderColor} ${config.color} ${config.glow}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        {config.pulse && (
          <span
            className={`animate-status-pulse absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status === "RUNNING"
                ? "bg-[#00FFE1]"
                : status === "PAUSED"
                ? "bg-[#FFB800]"
                : ""
            }`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            status === "RUNNING"
              ? "bg-[#00FFE1]"
              : status === "PAUSED"
              ? "bg-[#FFB800]"
              : status === "COMPLETED"
              ? "bg-[#39FF14]"
              : "bg-zinc-500"
          }`}
        />
      </span>
      <span className="font-mono text-sm font-bold tracking-widest">
        {config.label}
      </span>
    </div>
  );
}
