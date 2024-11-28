import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-background text-foreground border-t border-gray-50"
      style={{ borderColor: "#E6E6E6", borderWidth: "1px" }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
            <ul className="text-muted-foreground">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              {/* <li className="mb-4">
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
            <ul className="text-muted-foreground">
              <li className="mb-4">
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/licensing" className="hover:underline">
                  Licensing
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/tos" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Subscribe</h2>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-md"
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            © 2023 ResuMate . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
