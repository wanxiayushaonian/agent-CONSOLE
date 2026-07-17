"use client";

import { AgentStatus } from "@/lib/mockData";
import { taskInfo, stages } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";
import {
  Bot,
  Clock,
  Target,
  TrendingUp,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";

interface LeftPanelProps {
  status: AgentStatus;
  elapsedTime: number;
  currentStageIndex: number;
  progress: number;
  onStart: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function LeftPanel({
  status,
  elapsedTime,
  currentStageIndex,
  progress,
  onStart,
}: LeftPanelProps) {
  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#00FFE1]">
          <Bot className="w-4 h-4" />
          <span className="font-mono text-xs tracking-widest uppercase">
            Task Overview
          </span>
        </div>
        <h1 className="text-lg font-bold leading-tight text-foreground">
          {taskInfo.taskName}
        </h1>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{taskInfo.agentName}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F0F] border border-border">
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          Status
        </span>
        <StatusBadge status={status} />
      </div>

      {/* Timer */}
      <div className="p-4 rounded-lg bg-[#0F0F0F] border border-border space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-mono uppercase tracking-wider">
            Elapsed Time
          </span>
        </div>
        <div
          className={`font-mono text-3xl font-bold tabular-nums ${
            status === "RUNNING"
              ? "text-[#00FFE1] glow-cyan"
              : status === "PAUSED"
              ? "text-[#FFB800] glow-amber"
              : status === "COMPLETED"
              ? "text-[#39FF14] glow-green"
              : "text-foreground"
          }`}
        >
          {formatTime(elapsedTime)}
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-lg bg-[#0F0F0F] border border-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Progress
          </span>
          <span className="font-mono text-sm font-bold text-[#00FFE1]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative h-2 rounded-full bg-[#1A1A1A] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #00FFE1 0%, #9D4EDD 100%)",
              boxShadow: "0 0 10px rgba(0, 255, 225, 0.5)",
            }}
          />
          {status === "RUNNING" && (
            <div
              className="absolute inset-y-0 left-0 animate-shimmer rounded-full"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
        <div className="space-y-1.5">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  idx < currentStageIndex
                    ? "bg-[#39FF14]"
                    : idx === currentStageIndex
                    ? "bg-[#00FFE1] animate-status-pulse"
                    : "bg-zinc-700"
                }`}
              />
              <span
                className={`text-xs font-mono ${
                  idx < currentStageIndex
                    ? "text-[#39FF14]/70 line-through"
                    : idx === currentStageIndex
                    ? "text-[#00FFE1] font-bold"
                    : "text-zinc-600"
                }`}
              >
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Info */}
      <div className="p-4 rounded-lg bg-[#0F0F0F] border border-border space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Target className="w-3.5 h-3.5" />
          <span className="text-xs font-mono uppercase tracking-wider">
            Target Customer
          </span>
        </div>
        <div className="text-sm font-bold text-foreground">
          {taskInfo.targetCustomer}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-md bg-[#1A1A1A] border border-border">
            <div className="flex items-center gap-1.5 text-[#FFB800] mb-1">
              <Award className="w-3 h-3" />
              <span className="text-[10px] font-mono uppercase">Level</span>
            </div>
            <div className="text-sm font-bold text-foreground">
              {taskInfo.customerLevel}
            </div>
          </div>
          <div className="p-2 rounded-md bg-[#1A1A1A] border border-border">
            <div className="flex items-center gap-1.5 text-[#39FF14] mb-1">
              <DollarSign className="w-3 h-3" />
              <span className="text-[10px] font-mono uppercase">Budget</span>
            </div>
            <div className="text-sm font-bold text-foreground">
              {taskInfo.budget}
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      {status === "IDLE" && (
        <button
          onClick={onStart}
          className="mt-auto group relative overflow-hidden rounded-lg border border-[#00FFE1]/40 bg-[#00FFE1]/10 px-4 py-3.5 transition-all hover:bg-[#00FFE1]/20 hover:border-[#00FFE1]/60 animate-fade-in"
        >
          <div className="absolute inset-0 animate-border-flow bg-gradient-to-r from-[#00FFE1]/0 via-[#00FFE1]/20 to-[#00FFE1]/0" />
          <div className="relative flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-[#00FFE1]" />
            <span className="font-mono text-sm font-bold tracking-wider text-[#00FFE1] glow-cyan">
              启动任务 / START TASK
            </span>
          </div>
        </button>
      )}

      {status === "COMPLETED" && (
        <div className="mt-auto p-3 rounded-lg bg-[#39FF14]/5 border border-[#39FF14]/30 flex items-center gap-2 animate-fade-in">
          <TrendingUp className="w-4 h-4 text-[#39FF14]" />
          <span className="text-xs font-mono text-[#39FF14]">
            任务已完成，查看右侧决策看板
          </span>
        </div>
      )}
    </div>
  );
}
