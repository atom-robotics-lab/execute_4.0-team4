"use client"

import { Button } from "@/components/ui/button"
import { FileText, Shield, CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">RentSure</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Generate, Analyze, and Secure Rental Contracts Effortlessly
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
            >
              <FileText size={20} />
              Generate Contract
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-700 flex items-center gap-2"
              onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Shield size={20} />
              Analyze Contract
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Contracts</h3>
              <p className="text-white/80">Generate legally-sound contracts tailored to your needs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Legal Analysis</h3>
              <p className="text-white/80">Detect unfair or illegal clauses in existing contracts</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fairness Check</h3>
              <p className="text-white/80">Ensure balanced rights and obligations for all parties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

