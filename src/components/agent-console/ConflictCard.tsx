"use client";

import { ConflictItem } from "@/lib/mockData";
import {
  DollarSign,
  Award,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";

interface ConflictCardProps {
  conflict: ConflictItem;
}

const iconMap = {
  budget: DollarSign,
  level: Award,
  resource: CalendarClock,
};

const severityConfig = {
  high: {
    color: "text-[#FFB800]",
    borderColor: "border-[#FFB800]/40",
    bgColor: "bg-[#FFB800]/5",
    iconBg: "bg-[#FFB800]/15",
    label: "HIGH",
  },
  medium: {
    color: "text-[#FFB800]/70",
    borderColor: "border-[#FFB800]/25",
    bgColor: "bg-[#FFB800]/3",
    iconBg: "bg-[#FFB800]/10",
    label: "MED",
  },
};

export function ConflictCard({ conflict }: ConflictCardProps) {
  const Icon = iconMap[conflict.icon as keyof typeof iconMap] || AlertTriangle;
  const config = severityConfig[conflict.severity];

  return (
    <div
      className={`animate-slide-in p-3 rounded-lg border ${config.borderColor} ${config.bgColor} space-y-2`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-md ${config.iconBg} ${config.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-foreground">
            {conflict.title}
          </span>
        </div>
        <span
          className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${config.bgColor} ${config.color} border ${config.borderColor}`}
        >
          {config.label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pl-9">
        {conflict.detail}
      </p>
    </div>
  );
}
