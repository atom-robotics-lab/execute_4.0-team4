"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Shield, Upload, FileText, AlertTriangle, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function ContractAnalyzer() {
  const { toast } = useToast()
  const [contractText, setContractText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState("")

  const handleTextChange = (e) => {
    setContractText(e.target.value)
    setAnalysisResults(null)
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

    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    })
  }

  const analyzeContract = () => {
    if (!contractText.trim()) {
      toast({
        title: "Empty Contract",
        description: "Please enter or upload a contract to analyze.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      // This is a mock analysis - in a real app, this would be done by an API call
      const mockAnalysis = generateMockAnalysis(contractText)
      setAnalysisResults(mockAnalysis)
      setIsAnalyzing(false)

      toast({
        title: "Analysis Complete",
        description: "Your contract has been analyzed successfully.",
      })
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
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full" id="analyzer">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Contract Analyzer
        </CardTitle>
        <CardDescription>Upload or paste your contract to analyze it for legal issues and fairness</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!analysisResults ? (
          <>
            <div className="mb-4">
              <Textarea
                placeholder="Paste your contract text here..."
                className="min-h-[200px]"
                value={contractText}
                onChange={handleTextChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  className="mr-2 relative"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Contract
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    className="hidden absolute"
                    onChange={handleFileUpload}
                  />
                </Button>
                {uploadedFileName && <span className="text-sm text-gray-500">{uploadedFileName}</span>}
              </div>
              <Button onClick={analyzeContract} disabled={isAnalyzing}>
                {isAnalyzing ? "Analyzing..." : "Analyze Contract"}
              </Button>
            </div>
            {isAnalyzing && (
              <div className="mt-4">
                <Progress value={45} className="h-2" />
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
                <Progress value={analysisResults.scores.legal} className="h-1" />
              </div>
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-sm font-semibold mb-1">Fairness</h3>
                <div
                  className={`text-2xl font-bold mb-2 ${getScoreColor(analysisResults.scores.fairness)} text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.fairness}
                </div>
                <Progress value={analysisResults.scores.fairness} className="h-1" />
              </div>
              <div className="bg-gray-50 p-4 rounded border text-center">
                <h3 className="text-sm font-semibold mb-1">Clarity</h3>
                <div
                  className={`text-2xl font-bold mb-2 ${getScoreColor(analysisResults.scores.clarity)} text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto`}
                >
                  {analysisResults.scores.clarity}
                </div>
                <Progress value={analysisResults.scores.clarity} className="h-1" />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-semibold mb-4">Contract Issues & Recommendations</h3>
              {analysisResults.issues.length === 0 ? (
                <div className="flex items-center justify-center p-4 text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>No issues detected in this contract.</span>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {analysisResults.issues.map((issue, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          {issue.type === "legal" ? (
                            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          ) : issue.type === "fairness" ? (
                            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                          ) : (
                            <Info className="h-4 w-4 mr-2 text-blue-500" />
                          )}
                          <span>{issue.clause}</span>
                          <Badge variant={getSeverityColor(issue.severity)} className="ml-2">
                            {issue.severity}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-6 border-l-2 border-gray-200">
                          <p className="mb-2 text-gray-700">{issue.description}</p>
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-sm font-medium text-blue-800">Suggestion:</p>
                            <p className="text-sm text-blue-700">{issue.suggestion}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
      </CardContent>
      {analysisResults && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setAnalysisResults(null)}>
            Analyze Another Contract
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Improved Contract
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

