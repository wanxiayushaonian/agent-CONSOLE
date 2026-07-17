"use client";

import { InterventionOption } from "@/lib/mockData";
import { Loader2, Zap, Shield, TrendingUp, TrendingDown } from "lucide-react";

interface InterventionPanelProps {
  options: InterventionOption[];
  selectedId: "A" | "B" | null;
  loadingId: "A" | "B" | null;
  onSelect: (id: "A" | "B") => void;
}

export function InterventionPanel({
  options,
  selectedId,
  loadingId,
  onSelect,
}: InterventionPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-[#FFB800]">
        <Zap className="w-3.5 h-3.5" />
        <span className="font-mono text-xs tracking-widest uppercase">
          Human Intervention
        </span>
      </div>

      <div className="space-y-2.5">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isLoading = loadingId === option.id;
          const isDisabled = loadingId !== null && !isLoading;
          const isHighRisk = option.riskLevel === "high";

          return (
            <button
              key={option.id}
              onClick={() => !isDisabled && !isLoading && onSelect(option.id)}
              disabled={isDisabled}
              className={`group w-full text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? isHighRisk
                    ? "border-[#FFB800]/60 bg-[#FFB800]/10"
                    : "border-[#9D4EDD]/60 bg-[#9D4EDD]/10"
                  : isHighRisk
                  ? "border-[#FFB800]/30 bg-[#FFB800]/5 hover:border-[#FFB800]/50 hover:bg-[#FFB800]/10"
                  : "border-[#9D4EDD]/30 bg-[#9D4EDD]/5 hover:border-[#9D4EDD]/50 hover:bg-[#9D4EDD]/10"
              } ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-md font-mono text-xs font-bold ${
                      isHighRisk
                        ? "bg-[#FFB800]/15 text-[#FFB800]"
                        : "bg-[#9D4EDD]/15 text-[#9D4EDD]"
                    }`}
                  >
                    {option.id}
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {option.label}
                  </span>
                </div>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin-smooth text-[#00FFE1]" />
                ) : isHighRisk ? (
                  <TrendingUp className="w-4 h-4 text-[#FFB800]" />
                ) : (
                  <Shield className="w-4 h-4 text-[#9D4EDD]" />
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                {option.reasoning}
              </p>
              <div className="flex items-center gap-2 mt-2 pl-8">
                <span
                  className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isHighRisk
                      ? "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30"
                      : "bg-[#9D4EDD]/10 text-[#9D4EDD] border border-[#9D4EDD]/30"
                  }`}
                >
                  {isHighRisk ? "HIGH RISK / HIGH RETURN" : "LOW RISK / STEADY"}
                </span>
              </div>
              {isLoading && (
                <div className="mt-2 pl-8 flex items-center gap-1.5 text-[10px] font-mono text-[#00FFE1]">
                  <span className="animate-pulse">提交指令中...</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600 pt-1">
        <TrendingDown className="w-3 h-3" />
        <span>选择策略后将自动恢复执行</span>
      </div>
    </div>
  );
}
