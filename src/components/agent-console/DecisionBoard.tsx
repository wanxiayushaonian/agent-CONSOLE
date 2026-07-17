"use client";

import { FinalDecision } from "@/lib/mockData";
import {
  CheckCircle2,
  AlertTriangle,
  User,
  Clock,
  ListTodo,
  Sparkles,
} from "lucide-react";

interface DecisionBoardProps {
  decision: FinalDecision;
}

export function DecisionBoard({ decision }: DecisionBoardProps) {
  const isPositive = decision.conclusionType === "positive";

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Conclusion */}
      <div
        className={`p-4 rounded-lg border ${
          isPositive
            ? "border-[#39FF14]/40 bg-[#39FF14]/5"
            : "border-[#9D4EDD]/40 bg-[#9D4EDD]/5"
        } space-y-2`}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-4 h-4 ${
              isPositive ? "text-[#39FF14]" : "text-[#9D4EDD]"
            }`}
          />
          <span
            className={`font-mono text-xs tracking-widest uppercase ${
              isPositive ? "text-[#39FF14]" : "text-[#9D4EDD]"
            }`}
          >
            Final Decision
          </span>
          <span
            className={`ml-auto font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
              isPositive
                ? "bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30"
                : "bg-[#9D4EDD]/10 text-[#9D4EDD] border border-[#9D4EDD]/30"
            }`}
          >
            {decision.tag}
          </span>
        </div>
        <p
          className={`text-base font-bold ${
            isPositive ? "text-[#39FF14] glow-green" : "text-[#9D4EDD] glow-purple"
          }`}
        >
          {decision.conclusion}
        </p>
      </div>

      {/* Action Plan */}
      <div className="p-4 rounded-lg bg-[#0F0F0F] border border-border space-y-3">
        <div className="flex items-center gap-2 text-[#00FFE1]">
          <ListTodo className="w-3.5 h-3.5" />
          <span className="font-mono text-xs tracking-widest uppercase">
            Action Plan
          </span>
        </div>
        <div className="space-y-2">
          {decision.actionPlan.map((item, idx) => (
            <div
              key={idx}
              className="animate-slide-in p-3 rounded-md bg-[#1A1A1A] border border-border hover:border-[#00FFE1]/30 transition-colors"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-2.5">
                <div className="flex items-center justify-center w-5 h-5 rounded shrink-0 bg-[#00FFE1]/10 text-[#00FFE1] font-mono text-[10px] font-bold mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#9D4EDD]" />
                    <span className="text-xs font-bold text-[#9D4EDD] font-mono">
                      {item.role}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {item.task}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FFB800]">
                    <Clock className="w-3 h-3" />
                    <span>DDL: {item.deadline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Warning */}
      <div className="p-3 rounded-lg bg-[#FFB800]/5 border border-[#FFB800]/30 space-y-1.5">
        <div className="flex items-center gap-2 text-[#FFB800]">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="font-mono text-xs tracking-widest uppercase">
            Risk Warning
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed pl-5.5">
          {decision.riskWarning}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] font-mono text-zinc-600">
        <Sparkles className="w-3 h-3 text-[#00FFE1]" />
        <span>决策由 Agent + Human 共同生成</span>
      </div>
    </div>
  );
}
