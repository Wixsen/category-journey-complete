
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QRCode from '@/components/QRCode';

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
            <h2 className="text-2xl font-bold text-foreground">Why become an AgriRoad Delivery Partner?</h2>
            <ul className="space-y-4 list-disc list-inside text-foreground">
              <li>Flexible working hours - choose when you deliver</li>
              <li>Earn competitive rates per delivery</li>
              <li>Use your own vehicle (car, bike, or scooter)</li>
              <li>Contribute to sustainable food distribution</li>
              <li>Support local farmers and communities</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 text-foreground">How to join?</h2>
            <p className="text-foreground">
              Scan the QR code or click the link to go to our Delivery Portal. Register with your details,
              and our team will contact you for the next steps.
            </p>
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
  );
};

export default JoinAsDelivery;
