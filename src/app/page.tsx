"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Cannabis, BookOpen, ClipboardList, Droplets, Settings, Home } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const items = [
    { id: "home", label: "Início", icon: Home },
    { id: "diary", label: "Diário", icon: ClipboardList },
    { id: "nutrients", label: "Nutrientes", icon: Droplets },
    { id: "library", label: "Guia", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 pb-8 flex justify-between items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300",
            activeTab === item.id ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-neutral-500 dark:text-neutral-400"
          )}
        >
          <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const TabSwitcher = ({ activeMode, setActiveMode }: { activeMode: string, setActiveMode: (m: string) => void }) => {
  return (
    <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl w-fit mx-auto border border-neutral-200 dark:border-neutral-700">
      <button
        onClick={() => setActiveMode("cannabis")}
        className={cn(
          "px-4 py-2 rounded-xl text-xs font-medium transition-all",
          activeMode === "cannabis" ? "bg-emerald-600 text-white shadow-sm" : "text-neutral-600 dark:text-neutral-400"
        )}
      >
        Cannabis
      </button>
      <button
        onClick={() => setActiveMode("plants")}
        className={cn(
          "px-4 py-2 rounded-xl text-xs font-medium transition-all",
          activeMode === "plants" ? "bg-green-600 text-white shadow-sm" : "text-neutral-600 dark:text-neutral-400"
        )}
      >
        Plantas
      </button>
    </div>
  );
};

export default function Home() {
  const [mode, setMode] = useState<"cannabis" | "plants">("cannabis");
  const [activeTab, setActiveTab] = useState("home");

  const isCannabis = mode === "cannabis";

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      isCannabis ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
    )}>
      {/* Header */}
      <header className="pt-12 pb-6 px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-2xl transition-colors",
            isCannabis ? "bg-emerald-500/20 text-emerald-400" : "bg-green-500/20 text-green-600"
          )}>
            {isCannabis ? <Cannabis size={28} /> : <Leaf size={28} />}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Plantinha</h1>
        </div>
        <TabSwitcher activeMode={mode} setActiveMode={setMode} />
      </header>

      {/* Main Content */}
      <main className="px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">
                    {isCannabis ? "Painel de Cultivo" : "Meu Jardim"}
                  </h2>
                  <p className={cn("text-sm", isCannabis ? "text-neutral-400" : "text-neutral-500")}>
                    {isCannabis
                      ? "Gestão profissional do seu ciclo de cannabis."
                      : "Acompanhe a saúde das suas plantas ornamentais."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={cn(
                    "p-4 rounded-3xl border transition-all",
                    isCannabis ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
                  )}>
                    <Droplets className={cn("mb-2", isCannabis ? "text-emerald-400" : "text-green-500")} />
                    <div className="text-lg font-bold">Rega</div>
                    <div className="text-xs opacity-60">Hoje às 18h</div>
                  </div>
                  <div className={cn(
                    "p-4 rounded-3xl border transition-all",
                    isCannabis ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"
                  )}>
                    <Calendar className={cn("mb-2", isCannabis ? "text-emerald-400" : "text-green-500")} />
                    <div className="text-lg font-bold">Ciclo</div>
                    <div className="text-xs opacity-60">Dia 42 (Floração)</div>
                  </div>
                </div>

                <div className={cn(
                  "p-6 rounded-3xl border",
                  isCannabis ? "bg-emerald-900/10 border-emerald-500/20" : "bg-green-50 border-green-100"
                )}>
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <BookOpen size={18} /> Insight do Dia
                  </h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {isCannabis
                      ? "Lembre-se de controlar o pH da água para evitar o bloqueio de nutrientes no estágio de floração."
                      : "Aumente a luminosidade da sua orquídea para estimular a floração nesta estação."}
                  </p>
                </div>
              </div>
            )}

            {activeTab !== "home" && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
                  <Settings className="animate-spin-slow text-neutral-400" size={32} />
                </div>
                <h3 className="text-xl font-bold">Em desenvolvimento</h3>
                <p className="text-sm opacity-60">Esta seção está sendo construída com base nos seus prompts.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
