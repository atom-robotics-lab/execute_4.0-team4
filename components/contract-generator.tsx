"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { FileText, Download, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContractGenerator() {
  const { toast } = useToast()
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
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

    toast({
      title: "Contract Generated",
      description: "Your rental contract has been successfully generated.",
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContract)
    toast({
      title: "Copied to Clipboard",
      description: "Contract text has been copied to your clipboard.",
    })
  }

  const downloadContract = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContract], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "rental_contract.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download Started",
      description: "Your contract is being downloaded.",
    })
  }

  return (
    <Card className="w-full" id="generator">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contract Generator
        </CardTitle>
        <CardDescription>Create a customized rental agreement by filling out the form below</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="form">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="landlordName">Landlord Name</Label>
                <Input
                  id="landlordName"
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleChange}
                  placeholder="Enter landlord's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantName">Tenant Name</Label>
                <Input
                  id="tenantName"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  placeholder="Enter tenant's full name"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="propertyAddress">Property Address</Label>
              <Textarea
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="Enter complete property address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleSelectChange("propertyType", value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentAmount">Monthly Rent ($)</Label>
                <Input
                  id="rentAmount"
                  name="rentAmount"
                  type="number"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                <Input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="leaseTerm">Lease Term (months)</Label>
                <Select value={formData.leaseTerm} onValueChange={(value) => handleSelectChange("leaseTerm", value)}>
                  <SelectTrigger id="leaseTerm">
                    <SelectValue placeholder="Select lease term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 month</SelectItem>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="petsAllowed"
                  checked={formData.petsAllowed}
                  onCheckedChange={(checked) => handleSwitchChange("petsAllowed", checked)}
                />
                <Label htmlFor="petsAllowed">Pets Allowed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="sublettingAllowed"
                  checked={formData.sublettingAllowed}
                  onCheckedChange={(checked) => handleSwitchChange("sublettingAllowed", checked)}
                />
                <Label htmlFor="sublettingAllowed">Subletting Allowed</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceResponsibility">Maintenance Responsibility</Label>
                <Select
                  value={formData.maintenanceResponsibility}
                  onValueChange={(value) => handleSelectChange("maintenanceResponsibility", value)}
                >
                  <SelectTrigger id="maintenanceResponsibility">
                    <SelectValue placeholder="Select responsibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landlord">Landlord</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
              <Textarea
                id="additionalTerms"
                name="additionalTerms"
                value={formData.additionalTerms}
                onChange={handleChange}
                placeholder="Enter any additional terms or special conditions"
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={generateContract}>Generate Contract</Button>
          </CardFooter>
        </TabsContent>
        <TabsContent value="preview">
          <CardContent className="pt-6">
            {generatedContract ? (
              <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap font-mono text-sm h-[500px] overflow-y-auto">
                {generatedContract}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 rounded border">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Fill out the form and generate a contract to preview it here</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("form")}>
              Back to Form
            </Button>
            <div className="flex gap-2">
              {generatedContract && (
                <>
                  <Button variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadContract}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

