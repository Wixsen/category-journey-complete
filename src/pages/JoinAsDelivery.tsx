import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import QRCode from "@/components/QRCode"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const JoinAsDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Join AgriRoad as a Delivery Partner</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help deliver fresh produce directly from farms to consumers and be part of our sustainable food system.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Delivery Partner Earnings</h2>
            <p className="text-foreground">
              Earn competitive rates based on distance and order value. Our transparent payment structure ensures fair
              compensation for your services.
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-primary-foreground text-center">Delivery Distance</TableHead>
                    <TableHead className="bg-primary text-primary-foreground text-center">Base Pay</TableHead>
                    <TableHead className="bg-primary text-primary-foreground text-center">Per Kg Extra</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-center">0-3 km</TableCell>
                    <TableCell className="text-center">₹30</TableCell>
                    <TableCell className="text-center">₹5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">3-7 km</TableCell>
                    <TableCell className="text-center">₹45</TableCell>
                    <TableCell className="text-center">₹7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">7-10 km</TableCell>
                    <TableCell className="text-center">₹60</TableCell>
                    <TableCell className="text-center">₹8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">10-15 km</TableCell>
                    <TableCell className="text-center">₹80</TableCell>
                    <TableCell className="text-center">₹10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">15+ km</TableCell>
                    <TableCell className="text-center">₹100</TableCell>
                    <TableCell className="text-center">₹12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-foreground">Additional Incentives</h3>
              <ul className="space-y-2 list-disc list-inside text-foreground mt-2">
                <li>Peak hour bonus: +₹15 per delivery</li>
                <li>Weekend bonus: +₹20 per delivery</li>
                <li>Monthly target bonus: Up to ₹2,000</li>
                <li>Fuel allowance for orders above 10 km</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-4 text-foreground">Requirements</h2>
            <ul className="space-y-2 list-disc list-inside text-foreground">
              <li>Valid driver's license</li>
              <li>Vehicle (two-wheeler or four-wheeler)</li>
              <li>Smartphone with internet connection</li>
              <li>Age 18 years or above</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <QRCode
              url="http://agriroad-deliveryportal.netlify.app"
              title="Scan to Join as Delivery Partner"
              description="Access our Delivery Portal to register and start delivering fresh produce."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JoinAsDelivery

