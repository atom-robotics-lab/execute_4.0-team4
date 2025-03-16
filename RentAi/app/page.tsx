import { Suspense } from "react"
import Hero from "@/components/hero"
import ContractGenerator from "@/components/contract-generator"
import ContractAnalyzer from "@/components/contract-analyzer"
import Features from "@/components/features"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Features />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<Loading />}>
            <ContractGenerator />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <ContractAnalyzer />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  )
}

