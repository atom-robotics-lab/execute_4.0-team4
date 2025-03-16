"use client"

import { useState } from "react"

export default function ContractGenerator() {
  const [formData, setFormData] = useState({
    propertyType: "apartment",
    rentAmount: "",
    securityDeposit: "",
    leaseTerm: "12",
    startDate: "",
    landlordName: "",
    tenantName: "",
    propertyAddress: "",
    petsAllowed: false,
    sublettingAllowed: false,
    maintenanceResponsibility: "landlord",
    additionalTerms: "",
  })

  const [generatedContract, setGeneratedContract] = useState("")
  const [activeTab, setActiveTab] = useState("form")
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const showToast = (title, message, type = "success") => {
    setToast({ title, message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const generateContract = () => {
    // In a real application, this would call an API or use a more sophisticated template system
    const contract = `
RESIDENTIAL LEASE AGREEMENT

THIS LEASE AGREEMENT (hereinafter referred to as the "Agreement") made and entered into this ${new Date(formData.startDate).toLocaleDateString()}, by and between ${formData.landlordName} (hereinafter referred to as "Landlord") and ${formData.tenantName} (hereinafter referred to as "Tenant").

PROPERTY: Landlord hereby leases to Tenant and Tenant hereby leases from Landlord for residential purposes only, the premises located at: ${formData.propertyAddress} ("the Premises").

TERM: The term of this Agreement shall be for a period of ${formData.leaseTerm} months, commencing on ${new Date(formData.startDate).toLocaleDateString()}.

RENT: Tenant agrees to pay, without demand, to Landlord as rent for the Premises the sum of $${formData.rentAmount} per month, in advance, on the 1st day of each month.

SECURITY DEPOSIT: Upon execution of this Agreement, Tenant shall deposit with Landlord the sum of $${formData.securityDeposit} as a security deposit.

PETS: ${formData.petsAllowed ? "Tenant is permitted to keep pets on the Premises with prior written approval from the Landlord." : "No pets shall be kept on the Premises without the prior written consent of the Landlord."}

SUBLETTING: ${formData.sublettingAllowed ? "Tenant may sublet the Premises or any part thereof with prior written consent from the Landlord." : "Tenant shall not assign this Agreement or sublet any portion of the Premises without prior written consent of the Landlord."}

MAINTENANCE: ${formData.maintenanceResponsibility === "landlord" ? "Landlord shall be responsible for repairs and maintenance of the Premises, except for damage caused by Tenant's negligence." : formData.maintenanceResponsibility === "tenant" ? "Tenant shall be responsible for all repairs and maintenance of the Premises." : "Landlord shall be responsible for major repairs, while Tenant shall be responsible for minor maintenance and repairs under $100."}

ADDITIONAL TERMS:
${formData.additionalTerms}

IN WITNESS WHEREOF, the parties have caused this Agreement to be executed on the date first above written.

________________________
${formData.landlordName}, Landlord

________________________
${formData.tenantName}, Tenant
    `

    setGeneratedContract(contract)
    setActiveTab("preview")

    showToast("Contract Generated", "Your rental contract has been successfully generated.")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContract)
    showToast("Copied to Clipboard", "Contract text has been copied to your clipboard.")
  }

  const downloadContract = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContract], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "rental_contract.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    showToast("Download Started", "Your contract is being downloaded.")
  }

  return (
    <div className="w-full rounded-lg shadow-lg border border-gray-200" id="generator">
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2 className="text-xl font-semibold">Contract Generator</h2>
        </div>
        <p className="text-gray-600 text-sm mt-1">Create a customized rental agreement by filling out the form below</p>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "form" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("form")}
          >
            Form
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "preview" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Form Content */}
      {activeTab === "form" && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700">
                Landlord Name
              </label>
              <input
                id="landlordName"
                name="landlordName"
                type="text"
                value={formData.landlordName}
                onChange={handleChange}
                placeholder="Enter landlord's full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
                Tenant Name
              </label>
              <input
                id="tenantName"
                name="tenantName"
                type="text"
                value={formData.tenantName}
                onChange={handleChange}
                placeholder="Enter tenant's full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
              Property Address
            </label>
            <textarea
              id="propertyAddress"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              placeholder="Enter complete property address"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="room">Room</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
                Monthly Rent ($)
              </label>
              <input
                id="rentAmount"
                name="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">
                Security Deposit ($)
              </label>
              <input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="leaseTerm" className="block text-sm font-medium text-gray-700">
                Lease Term (months)
              </label>
              <select
                id="leaseTerm"
                name="leaseTerm"
                value={formData.leaseTerm}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">1 month</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <input
                id="petsAllowed"
                name="petsAllowed"
                type="checkbox"
                checked={formData.petsAllowed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="petsAllowed" className="text-sm font-medium text-gray-700">
                Pets Allowed
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="sublettingAllowed"
                name="sublettingAllowed"
                type="checkbox"
                checked={formData.sublettingAllowed}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="sublettingAllowed" className="text-sm font-medium text-gray-700">
                Subletting Allowed
              </label>
            </div>
            <div className="space-y-2">
              <label htmlFor="maintenanceResponsibility" className="block text-sm font-medium text-gray-700">
                Maintenance Responsibility
              </label>
              <select
                id="maintenanceResponsibility"
                name="maintenanceResponsibility"
                value={formData.maintenanceResponsibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
                <option value="shared">Shared</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="additionalTerms" className="block text-sm font-medium text-gray-700">
              Additional Terms & Conditions
            </label>
            <textarea
              id="additionalTerms"
              name="additionalTerms"
              value={formData.additionalTerms}
              onChange={handleChange}
              placeholder="Enter any additional terms or special conditions"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={generateContract}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Contract
            </button>
          </div>
        </div>
      )}

      {/* Preview Content */}
      {activeTab === "preview" && (
        <div className="p-6">
          {generatedContract ? (
            <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap font-mono text-sm h-[500px] overflow-y-auto">
              {generatedContract}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 rounded border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300 mb-4"
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
              <p className="text-gray-500">Fill out the form and generate a contract to preview it here</p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setActiveTab("form")}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Form
            </button>
            <div className="flex gap-2">
              {generatedContract && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                  </button>
                  <button
                    onClick={downloadContract}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
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
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </button>
                </>
              )}
            </div>
          </div>
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

