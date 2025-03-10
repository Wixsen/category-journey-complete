import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import QRCode from "@/components/QRCode"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const JoinAsSeller = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Join AgriRoad as a Seller</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect directly with consumers and grow your agricultural business with our platform.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Commission Structure</h2>
            <p className="text-foreground">
              We offer competitive commission rates that decrease as your sales volume increases, helping you maximize
              your profits.
            </p>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-primary-foreground text-center">Sales Volume (₹)</TableHead>
                    <TableHead className="bg-primary text-primary-foreground text-center">Commission Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-center">Upto ₹10,000</TableCell>
                    <TableCell className="text-center">10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">Upto ₹50,000</TableCell>
                    <TableCell className="text-center">7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">Upto ₹1,00,000</TableCell>
                    <TableCell className="text-center">6%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">Upto ₹10,00,000</TableCell>
                    <TableCell className="text-center">5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-center">₹10,00,000+</TableCell>
                    <TableCell className="text-center">3%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h2 className="text-2xl font-bold mt-4 text-foreground">Benefits</h2>
            <ul className="space-y-2 list-disc list-inside text-foreground">
              <li>Direct access to consumers without middlemen</li>
              <li>Set your own prices and manage inventory</li>
              <li>Weekly payments directly to your bank account</li>
              <li>Free marketing and promotional support</li>
              <li>Dedicated seller support team</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <QRCode
              url="http://agriroad-farmer.netlify.app"
              title="Scan to Join as Seller"
              description="Access our Farmer Portal to register your farm and start selling directly to consumers."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JoinAsSeller

