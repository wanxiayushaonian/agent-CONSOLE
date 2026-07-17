"use client";

import { AgentStatus, FinalDecision } from "@/lib/mockData";
import { conflictItems, interventions } from "@/lib/mockData";
import { ConflictCard } from "./ConflictCard";
import { InterventionPanel } from "./InterventionPanel";
import { DecisionBoard } from "./DecisionBoard";
import { AlertTriangle, PanelRightOpen } from "lucide-react";

interface RightPanelProps {
  status: AgentStatus;
  selectedIntervention: "A" | "B" | null;
  loadingIntervention: "A" | "B" | null;
  finalDecision: FinalDecision | null;
  onInterventionSelect: (id: "A" | "B") => void;
}

export function RightPanel({
  status,
  selectedIntervention,
  loadingIntervention,
  finalDecision,
  onInterventionSelect,
}: RightPanelProps) {
  const showConflict = status === "PAUSED";
  const showDecision = status === "COMPLETED" && finalDecision;
  const showIdle = status === "IDLE" || status === "RUNNING";

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-[#0F0F0F] flex items-center gap-2 shrink-0">
        <PanelRightOpen className="w-4 h-4 text-[#9D4EDD]" />
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Control Console
        </span>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Conflict Warning Section - only when PAUSED */}
        {showConflict && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB800]" />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-[#FFB800] glow-amber">
                Conflict Detected
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FFB800]/5 border border-[#FFB800]/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#FFB800]">
                    Agent 检测到多维数据冲突
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    需要人工介入裁决，选择后续执行策略。Agent 已暂停自动执行。
                  </p>
                </div>
              </div>
            </div>

            {/* Conflict cards */}
            <div className="space-y-2">
              {conflictItems.map((conflict) => (
                <ConflictCard key={conflict.id} conflict={conflict} />
              ))}
            </div>

            {/* Intervention Panel */}
            <div className="pt-2 border-t border-border">
              <InterventionPanel
                options={interventions}
                selectedId={selectedIntervention}
                loadingId={loadingIntervention}
                onSelect={onInterventionSelect}
              />
            </div>
          </div>
        )}

        {/* Decision Board - only when COMPLETED */}
        {showDecision && finalDecision && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-[#39FF14] glow-green">
                Decision Output
              </span>
            </div>
            <DecisionBoard decision={finalDecision} />
          </div>
        )}

        {/* Idle / Running placeholder */}
        {showIdle && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-12">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                status === "RUNNING"
                  ? "border-[#00FFE1]/40 bg-[#00FFE1]/5"
                  : "border-dashed border-zinc-700"
              }`}
            >
              <AlertTriangle
                className={`w-6 h-6 ${
                  status === "RUNNING" ? "text-[#00FFE1]" : "text-zinc-700"
                }`}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-zinc-500 font-mono">
                {status === "IDLE"
                  ? "等待任务启动"
                  : "Agent 执行中，监控思考流"}
              </p>
              <p className="text-xs text-zinc-700 font-mono">
                {status === "IDLE"
                  ? "启动后冲突将在此显示"
                  : "冲突出现时此面板将激活"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
