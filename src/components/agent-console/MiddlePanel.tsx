"use client";

import { useEffect, useRef } from "react";
import { AgentLog, AgentStatus } from "@/lib/mockData";
import { LogCard } from "./LogCard";
import { Terminal, Pause, CheckCircle2, Loader2 } from "lucide-react";

interface MiddlePanelProps {
  logs: AgentLog[];
  status: AgentStatus;
  typingLogId: number | null;
  onTypingComplete: () => void;
}

export function MiddlePanel({
  logs,
  status,
  typingLogId,
  onTypingComplete,
}: MiddlePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [logs.length, typingLogId]);

  return (
    <div className="h-full flex flex-col bg-[#080808]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#0F0F0F]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00FFE1]" />
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            Agent Execution Stream
          </span>
        </div>
        <div className="flex items-center gap-2">
          {status === "RUNNING" && (
            <div className="flex items-center gap-1.5 text-[#00FFE1]">
              <Loader2 className="w-3 h-3 animate-spin-smooth" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Processing
              </span>
            </div>
          )}
          {status === "PAUSED" && (
            <div className="flex items-center gap-1.5 text-[#FFB800]">
              <Pause className="w-3 h-3" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Awaiting Input
              </span>
            </div>
          )}
          {status === "COMPLETED" && (
            <div className="flex items-center gap-1.5 text-[#39FF14]">
              <CheckCircle2 className="w-3 h-3" />
              <span className="font-mono text-[10px] tracking-wider uppercase">
                Done
              </span>
            </div>
          )}
          {status === "IDLE" && (
            <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-600">
              Standby
            </span>
          )}
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2.5 grid-bg"
      >
        {logs.length === 0 && status === "IDLE" && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center">
              <Terminal className="w-7 h-7 text-zinc-700" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-zinc-500 font-mono">
                Agent 待命中
              </p>
              <p className="text-xs text-zinc-700 font-mono">
                点击左侧 "启动任务" 开始执行
              </p>
            </div>
          </div>
        )}

        {logs.map((log, index) => (
          <LogCard
            key={log.id}
            log={log}
            index={index}
            isLatest={typingLogId === log.id}
            onTypingComplete={onTypingComplete}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Footer status bar */}
      <div className="px-4 py-2 border-t border-border bg-[#0F0F0F] flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-600">
          <span>LOGS: {logs.length}</span>
          <span className="text-zinc-800">|</span>
          <span>
            MODE:{" "}
            <span
              className={
                status === "PAUSED"
                  ? "text-[#FFB800]"
                  : status === "RUNNING"
                  ? "text-[#00FFE1]"
                  : status === "COMPLETED"
                  ? "text-[#39FF14]"
                  : "text-zinc-500"
              }
            >
              {status}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-status-pulse" />
          <span className="text-[10px] font-mono text-zinc-600">
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}
