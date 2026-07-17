"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AgentLog,
  AgentStatus,
  FinalDecision,
  InterventionOption,
} from "@/lib/mockData";
import { initialLogs, interventions, stages } from "@/lib/mockData";
import { LeftPanel } from "@/components/agent-console/LeftPanel";
import { MiddlePanel } from "@/components/agent-console/MiddlePanel";
import { RightPanel } from "@/components/agent-console/RightPanel";
import { Activity } from "lucide-react";

export default function Home() {
  // ===== Core State =====
  const [status, setStatus] = useState<AgentStatus>("IDLE");
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [typingLogId, setTypingLogId] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // ===== Intervention State =====
  const [selectedIntervention, setSelectedIntervention] = useState<
    "A" | "B" | null
  >(null);
  const [loadingIntervention, setLoadingIntervention] = useState<
    "A" | "B" | null
  >(null);
  const [finalDecision, setFinalDecision] = useState<FinalDecision | null>(
    null
  );

  // ===== Refs for async flow =====
  const queueRef = useRef<AgentLog[]>([]);
  const typingLogIdRef = useRef<number | null>(null);
  const phaseRef = useRef<"initial" | "post-intervention">("initial");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ===== Timer =====
  useEffect(() => {
    if (status === "RUNNING") {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  // ===== Cleanup =====
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // ===== Progress & Stage Update =====
  const updateProgress = useCallback((logId: number) => {
    const progressMap: Record<number, { progress: number; stage: number }> = {
      1: { progress: 15, stage: 0 },
      2: { progress: 30, stage: 1 },
      3: { progress: 40, stage: 1 },
      4: { progress: 45, stage: 2 },
      5: { progress: 50, stage: 2 },
      6: { progress: 65, stage: 3 },
      7: { progress: 75, stage: 4 },
      8: { progress: 85, stage: 4 },
      9: { progress: 100, stage: 5 },
    };
    const mapping = progressMap[logId];
    if (mapping) {
      setProgress(mapping.progress);
      setCurrentStageIndex(mapping.stage);
    }
  }, []);

  // ===== Add Next Log from Queue =====
  const addNextLog = useCallback(() => {
    if (queueRef.current.length === 0) {
      // Queue empty - transition state based on phase
      if (phaseRef.current === "initial") {
        setStatus("PAUSED");
      } else {
        // post-intervention phase complete
        setStatus("COMPLETED");
      }
      return;
    }

    const log = queueRef.current.shift()!;
    setLogs((prev) => [...prev, { ...log, status: "running" }]);
    setTypingLogId(log.id);
    typingLogIdRef.current = log.id;
  }, []);

  // ===== Typing Complete Handler =====
  const handleTypingComplete = useCallback(() => {
    const currentId = typingLogIdRef.current;
    if (currentId === null) return;

    // Mark log as done
    setLogs((prev) =>
      prev.map((l) => (l.id === currentId ? { ...l, status: "done" } : l))
    );
    setTypingLogId(null);
    typingLogIdRef.current = null;

    // Update progress
    updateProgress(currentId);

    // Schedule next log after 1.5s
    const timer = setTimeout(() => {
      addNextLog();
    }, 1500);
    timersRef.current.push(timer);
  }, [addNextLog, updateProgress]);

  // ===== Start Task =====
  const handleStart = useCallback(() => {
    setStatus("RUNNING");
    setLogs([]);
    setElapsedTime(0);
    setProgress(0);
    setCurrentStageIndex(0);
    setSelectedIntervention(null);
    setLoadingIntervention(null);
    setFinalDecision(null);

    phaseRef.current = "initial";
    queueRef.current = [...initialLogs];

    // Small delay before first log
    const timer = setTimeout(() => {
      addNextLog();
    }, 400);
    timersRef.current.push(timer);
  }, [addNextLog]);

  // ===== Intervention Selection =====
  const handleInterventionSelect = useCallback(
    (id: "A" | "B") => {
      if (loadingIntervention !== null) return;

      setLoadingIntervention(id);

      // Simulate 1s loading
      const timer1 = setTimeout(() => {
        setLoadingIntervention(null);
        setSelectedIntervention(id);

        const intervention: InterventionOption | undefined =
          interventions.find((opt) => opt.id === id);

        if (!intervention) return;

        // Set up post-intervention queue
        phaseRef.current = "post-intervention";
        queueRef.current = [...intervention.nextLogs];
        setFinalDecision(intervention.finalDecision);

        // Transition to RUNNING and add first log
        setStatus("RUNNING");

        const timer2 = setTimeout(() => {
          addNextLog();
        }, 400);
        timersRef.current.push(timer2);
      }, 1000);
      timersRef.current.push(timer1);
    },
    [loadingIntervention, addNextLog]
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="shrink-0 h-12 px-4 flex items-center justify-between border-b border-border bg-[#0F0F0F]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#00FFE1] to-[#9D4EDD] flex items-center justify-center">
              <Activity className="w-4 h-4 text-black" />
            </div>
            <span className="font-mono text-sm font-bold tracking-wider">
              AGENT<span className="text-[#00FFE1]">CONSOLE</span>
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="font-mono text-xs text-muted-foreground">
            Human-in-the-Loop Decision Monitor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-status-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              System Online
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">
            v1.0.0
          </span>
        </div>
      </header>

      {/* Main 3-column layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - 25% */}
        <aside className="w-[25%] min-w-[260px] border-r border-border bg-[#0A0A0A]">
          <LeftPanel
            status={status}
            elapsedTime={elapsedTime}
            currentStageIndex={currentStageIndex}
            progress={progress}
            onStart={handleStart}
          />
        </aside>

        {/* Middle Panel - 45% */}
        <section className="flex-1 min-w-0 border-r border-border">
          <MiddlePanel
            logs={logs}
            status={status}
            typingLogId={typingLogId}
            onTypingComplete={handleTypingComplete}
          />
        </section>

        {/* Right Panel - 30% */}
        <aside className="w-[30%] min-w-[300px] bg-[#0A0A0A]">
          <RightPanel
            status={status}
            selectedIntervention={selectedIntervention}
            loadingIntervention={loadingIntervention}
            finalDecision={finalDecision}
            onInterventionSelect={handleInterventionSelect}
          />
        </aside>
      </main>
    </div>
  );
}
