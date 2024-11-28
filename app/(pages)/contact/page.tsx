import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl h-screen pt-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Contact Us
          </CardTitle>
          <CardDescription className="text-center">
            We'd love to hear from you. Get in touch with us using the form
            below or our contact information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Our Contact Information</h2>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>info@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>123 Example Street, City, Country</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here" />
                </div>
              </form>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
