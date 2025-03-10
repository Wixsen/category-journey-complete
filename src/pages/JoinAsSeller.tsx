
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCode from '@/components/QRCode';

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
            <h2 className="text-2xl font-bold text-foreground">Why become an AgriRoad Seller?</h2>
            <ul className="space-y-4 list-disc list-inside text-foreground">
              <li>Direct access to consumers without middlemen</li>
              <li>Set your own prices and manage inventory</li>
              <li>Build your brand and customer relationships</li>
              <li>Efficient order management and delivery options</li>
              <li>Marketing support to boost your sales</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 text-foreground">How to join?</h2>
            <p className="text-foreground">
              Scan the QR code or click the link to go to our Farmer Portal. Fill out the application form, 
              and our team will review your submission within 48 hours.
            </p>
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
  );
};

export default JoinAsSeller;
