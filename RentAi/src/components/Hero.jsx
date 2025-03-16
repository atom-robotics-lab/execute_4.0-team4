"use client"

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
            <button
              className="bg-white text-indigo-700 px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Generate Contract
            </button>
            <button
              className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-white hover:text-indigo-700 transition-colors"
              onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Analyze Contract
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Contracts</h3>
              <p className="text-white/80">Generate legally-sound contracts tailored to your needs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Legal Analysis</h3>
              <p className="text-white/80">Detect unfair or illegal clauses in existing contracts</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
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

