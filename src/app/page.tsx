"use client"

import { useState } from "react";
import TopoField from "@/components/ui/topo-field";
import { StackingNavbar } from "@/components/ui/stacking-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Cannabis, Settings, Calendar, BookOpen } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"cannabis" | "plants">("cannabis");

  const navItems = activeTab === "cannabis"
    ? [
        { href: "/cannabis/diary", label: "Diário" },
        { href: "/cannabis/nutrients", label: "Nutrientes" },
        { href: "/cannabis/library", label: "Guia" },
      ]
    : [
        { href: "/plants/my-garden", label: "Meu Jardim" },
        { href: "/plants/care", label: "Cuidados" },
        { href: "/plants/catalog", label: "Catálogo" },
      ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <TopoField
          mode="dark"
          hue={activeTab === "cannabis" ? 120 : 80}
          opacity={0.6}
          className="w-full h-full"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">

        {/* Header / Tab Switcher */}
        <header className="flex justify-between items-center mb-12 mt-8">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl backdrop-blur-md border ${activeTab === 'cannabis' ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-green-500/20 border-green-500/50'}`}>
              {activeTab === 'cannabis' ? <Cannabis className="text-emerald-400" /> : <Leaf className="text-green-400" />}
            </div>
            <h1 className="text-xl font-light tracking-tight">Plantinha</h1>
          </div>

          <div className="flex bg-white/5 backdrop-blur-xl rounded-full p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("cannabis")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all ${activeTab === "cannabis" ? "bg-emerald-500 text-white shadow-lg" : "text-neutral-400"}`}
            >
              Cannabis
            </button>
            <button
              onClick={() => setActiveTab("plants")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all ${activeTab === "plants" ? "bg-green-500 text-white shadow-lg" : "text-neutral-400"}`}
            >
              Plantas
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-grow flex flex-col justify-center items-start gap-6 max-w-md mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-5xl font-light leading-tight">
                {activeTab === 'cannabis' ? "Cultivo de Elite" : "Jardim Particular"}
              </h2>
              <p className="text-neutral-400 font-extralight text-lg">
                {activeTab === 'cannabis'
                  ? "Monitore a saúde, nutrientes e o ciclo da sua planta com precisão cirúrgica."
                  : "Cuide de suas plantas ornamentais com lembretes e guias personalizados."}
              </p>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Navigation Bar (Adapted StackingNavbar) */}
        <footer className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
          <div className="w-full max-w-md bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full p-3 flex items-center justify-between">
            <StackingNavbar items={navItems} />
          </div>
        </footer>

      </div>
    </main>
  );
}
