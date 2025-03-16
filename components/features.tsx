import { FileText, Shield, BarChart, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      title: "Contract Generation",
      description: "Create custom rental agreements by specifying your requirements and preferences.",
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Legal Compliance",
      description: "Ensure your contracts comply with local rental laws and regulations.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-blue-600" />,
      title: "Fairness Analysis",
      description: "Get a fairness score based on clause balance, transparency, and legality.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-blue-600" />,
      title: "Issue Detection",
      description: "Identify problematic clauses that could lead to disputes or legal issues.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
      title: "Clause Suggestions",
      description: "Receive recommendations for improving unclear or unfair contract terms.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
      title: "Verification",
      description: "Verify the integrity and authenticity of your rental agreements.",
    },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose RentSure?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers comprehensive tools to create and analyze rental contracts, ensuring fairness and legal
            compliance for all parties involved.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

