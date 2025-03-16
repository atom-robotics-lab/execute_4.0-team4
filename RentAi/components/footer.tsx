import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">RentSure</h2>
            <p className="mb-4">
              Generate, analyze, and secure rental contracts effortlessly. Our platform helps landlords and tenants
              create fair and legally compliant agreements.
            </p>
            <div className="flex items-center">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <Github className="h-5 w-5" />
              </a>
              <span className="text-sm">© {new Date().getFullYear()} RentSure. All rights reserved.</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Contract Generator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contract Analyzer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Legal Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Fairness Check
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Legal Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

