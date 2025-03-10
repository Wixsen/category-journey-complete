import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Contact Header */}
      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Get In Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or services? Contact us and we'll be happy to help.
          </p>
        </div>
      </div>
      
      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-6"
                >
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
              <div className="bg-card p-6 rounded-lg space-y-6 shadow-sm border border-border">
                <div className="flex">
                  <MapPin className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Harvest Road, Farmville<br />
                      Agricultural District, CA 98765
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567<br />
                      Monday - Friday, 9am - 5pm PST
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email Address</h3>
                    <p className="text-muted-foreground">
                      info@agriroad.com<br />
                      support@agriroad.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 rounded-lg overflow-hidden h-64 border border-border">
                <iframe
                  title="AgriRoad Location"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18046.22467719932!2d91.75681125040873!3d26.169857205663437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a591877a5854f%3A0xa5a4ae0547b49d1f!2sNovotel%20Guwahati%20GS%20Road!5e0!3m2!1sen!2suk!4v1741610047586!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
