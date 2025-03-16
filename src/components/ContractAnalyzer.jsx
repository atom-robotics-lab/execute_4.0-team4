"use client"

import { useState } from "react"

export default function ContractAnalyzer() {
  const [contractText, setContractText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState("")
  const [toast, setToast] = useState(null)
  const [openAccordions, setOpenAccordions] = useState({})

  const handleTextChange = (e) => {
    setContractText(e.target.value)
    setAnalysisResults(null)
  }

  const showToast = (title, message, type = "success") => {
    setToast({ title, message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadedFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      setContractText(event.target.result)
      setAnalysisResults(null)
    }
    reader.readAsText(file)

    showToast("File Uploaded", `${file.name} has been uploaded successfully.`)
  }

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const analyzeContract = () => {
    if (!contractText.trim()) {
      showToast("Empty Contract", "Please enter or upload a contract to analyze.", "error")
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      // This is a mock analysis - in a real app, this would be done by an API call
      const mockAnalysis = generateMockAnalysis(contractText)
      setAnalysisResults(mockAnalysis)
      setIsAnalyzing(false)

      showToast("Analysis Complete", "Your contract has been analyzed successfully.")
    }, 2500)
  }

  const generateMockAnalysis = (text) => {
    // This is a simplified mock analysis
    // In a real application, this would use NLP or call an API

    const lowerText = text.toLowerCase()
    const issues = []

    // Check for common problematic clauses
    if (lowerText.includes("forfeit") && lowerText.includes("deposit")) {
      issues.push({
        type: "legal",
        severity: "high",
        clause: "Security Deposit Forfeiture",
        description: "Automatic forfeiture of security deposit may violate tenant protection laws.",
        suggestion:
          "Specify conditions under which deductions can be made from the security deposit, in accordance with local laws.",
      })
    }

    if (lowerText.includes("24 hour") && (lowerText.includes("notice") || lowerText.includes("entry"))) {
      issues.push({
        type: "legal",
        severity: "medium",
        clause: "Entry Notice Period",
        description: "Many jurisdictions require more than 24 hours notice before landlord entry.",
        suggestion: "Consider extending the notice period to 48-72 hours to comply with common regulations.",
      })
    }

    if (lowerText.includes("tenant responsible") && lowerText.includes("all repairs")) {
      issues.push({
        type: "fairness",
        severity: "high",
        clause: "Maintenance Responsibility",
        description: "Making tenant responsible for all repairs may be considered unfair and potentially illegal.",
        suggestion: "Clearly delineate tenant vs. landlord responsibilities for maintenance and repairs.",
      })
    }

    if (lowerText.includes("waive") && lowerText.includes("right")) {
      issues.push({
        type: "legal",
        severity: "high",
        clause: "Rights Waiver",
        description: "Clauses that waive tenant's legal rights are typically unenforceable.",
        suggestion: "Remove any clauses that ask tenants to waive their statutory rights.",
      })
    }

    // Add some clarity issues
    if (text.split(".").some((sentence) => sentence.length > 200)) {
      issues.push({
        type: "clarity",
        severity: "low",
        clause: "Complex Sentences",
        description: "Contract contains overly complex sentences that may be difficult to understand.",
        suggestion: "Break down complex sentences into simpler, clearer statements.",
      })
    }

    // Calculate scores
    const legalScore = calculateScore(
      issues.filter((i) => i.type === "legal"),
      100,
    )
    const fairnessScore = calculateScore(
      issues.filter((i) => i.type === "fairness"),
      100,
    )
    const clarityScore = calculateScore(
      issues.filter((i) => i.type === "clarity"),
      100,
    )
    const overallScore = Math.round((legalScore + fairnessScore + clarityScore) / 3)

    // Add some recommendations if no issues found
    if (issues.length === 0) {
      issues.push({
        type: "recommendation",
        severity: "low",
        clause: "General Recommendation",
        description:
          "No major issues detected, but consider adding more specific details about maintenance responsibilities.",
        suggestion:
          "Clearly outline which maintenance tasks are the landlord's responsibility and which are the tenant's.",
      })
    }

    return {
      scores: {
        legal: legalScore,
        fairness: fairnessScore,
        clarity: clarityScore,
        overall: overallScore,
      },
      issues: issues,
      wordCount: text.split(/\s+/).length,
      readingTime: Math.ceil(text.split(/\s+/).length / 200), // Approx. reading time in minutes
    }
  }

  const calculateScore = (issues, baseScore) => {
    const deductions = {
      high: 25,
      medium: 15,
      low: 5,
    }

    const totalDeduction = issues.reduce((sum, issue) => sum + deductions[issue.severity], 0)
    return Math.max(baseScore - totalDeduction, 0)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "legal":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )
      case "fairness":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )
    }
  }

  return (
    <div className="w-full rounded-lg shadow-lg border border-gray-200" id="analyzer">
      {/* Card Header */}
      <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
        <div className="flex items-center gap-2">
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
          <h2 className="text-xl font-semibold">Contract Analyzer</h2>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Upload or paste your contract to analyze it for legal issues and fairness
        </p>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {!analysisResults ? (
          <>
            <div className="mb-4">
              <textarea
                placeholder="Paste your contract text here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                value={contractText}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center mr-2 relative"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload Contract
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    className="hidden absolute"
                    onChange={handleFileUpload}
                  />
                </button>
                {uploadedFileName && <span className="text-sm text-gray-500">{uploadedFileName}</span>}
              </div>
              <button
                onClick={analyzeContract}
                disabled={isAnalyzing}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isAnalyzing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Contract"}
              </button>
            </div>
            {isAnalyzing && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-1/2 animate-pulse"></div>
                </div>
                <p className="text-sm text-center mt-2 text-gray-500">Analyzing contract...</p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-lg font-semibold mb-1">Overall Score</h3>
                <div
                  className={`text-3xl font-bold mb-2 ${getScoreColor(analysisResults.scores.overall)} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.overall}
                </div>
                <p className="text-sm text-gray-500">
                  {analysisResults.scores.overall >= 80
                    ? "Good"
                    : analysisResults.scores.overall >= 60
                      ? "Fair"
                      : "Poor"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-sm font-semibold mb-1">Legal Compliance</h3>
                <div
                  className={`text-2xl font-bold mb-2 ${getScoreColor(analysisResults.scores.legal)} text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.legal}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(analysisResults.scores.legal)}`}
                    style={{ width: `${analysisResults.scores.legal}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-sm font-semibold mb-1">Fairness</h3>
                <div
                  className={`text-2xl font-bold mb-2 ${getScoreColor(analysisResults.scores.fairness)} text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.fairness}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(analysisResults.scores.fairness)}`}
                    style={{ width: `${analysisResults.scores.fairness}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-sm font-semibold mb-1">Clarity</h3>
                <div
                  className={`text-2xl font-bold mb-2 ${getScoreColor(analysisResults.scores.clarity)} text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.clarity}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreColor(analysisResults.scores.clarity)}`}
                    style={{ width: `${analysisResults.scores.clarity}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-4">Contract Issues & Recommendations</h3>
              {analysisResults.issues.length === 0 ? (
                <div className="flex items-center justify-center p-4 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  <span>No issues detected in this contract.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {analysisResults.issues.map((issue, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleAccordion(`issue-${index}`)}
                      >
                        <div className="flex items-center">
                          {getTypeIcon(issue.type)}
                          <span className="ml-2">{issue.clause}</span>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform ${openAccordions[`issue-${index}`] ? "transform rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                      {openAccordions[`issue-${index}`] && (
                        <div className="p-3 border-t">
                          <div className="pl-6 border-l-2 border-gray-200">
                            <p className="mb-2 text-gray-700">{issue.description}</p>
                            <div className="bg-blue-50 p-3 rounded">
                              <p className="text-sm font-medium text-blue-800">Suggestion:</p>
                              <p className="text-sm text-blue-700">{issue.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                <span className="font-medium">Word Count:</span> {analysisResults.wordCount}
              </div>
              <div>
                <span className="font-medium">Estimated Reading Time:</span> {analysisResults.readingTime} min
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      {analysisResults && (
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setAnalysisResults(null)}
          >
            Analyze Another Contract
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
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
            Generate Improved Contract
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} text-white flex items-center`}
        >
          <div>
            <h3 className="font-medium">{toast.title}</h3>
            <p className="text-sm">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

