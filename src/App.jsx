import Hero from "./components/Hero"
import Features from "./components/Features"
import ContractGenerator from "./components/ContractGenerator"
import ContractAnalyzer from "./components/ContractAnalyzer"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Features />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContractGenerator />
          <ContractAnalyzer />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App

