import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="container mx-auto py-10 pt-20">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Licensing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Effective Date: November 28, 2024
              </p>

              <p>
                This Licensing Agreement outlines the terms under which you may
                use the software and services provided by ResuMate. Please read
                these terms carefully before using our licensed materials.
              </p>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  1. Grant of License
                </h2>
                <p>
                  Subject to compliance with this agreement, ResuMate grants you
                  a non-exclusive, non-transferable license to use our software
                  and services as outlined in your subscription plan.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  2. License Restrictions
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You may not reverse-engineer, decompile, or disassemble the
                    software.
                  </li>
                  <li>
                    You are prohibited from sharing or sublicensing your access
                    to others without explicit permission.
                  </li>
                  <li>
                    Use of the software is limited to the purposes outlined in
                    this agreement.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  3. Ownership of Intellectual Property
                </h2>
                <p>
                  All intellectual property rights, including software code,
                  designs, and content, remain the sole property of ResuMate.
                  This agreement does not transfer any ownership rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  4. Subscription and Renewal
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Your license is tied to the subscription plan selected
                    during registration.
                  </li>
                  <li>
                    Renewals are processed automatically unless canceled before
                    the renewal date.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  5. Termination of License
                </h2>
                <p>
                  We reserve the right to terminate your license if you breach
                  this agreement. Upon termination, all rights to access and use
                  the software will cease.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">
                  6. Limitation of Liability
                </h2>
                <p>
                  ResuMate is not liable for any indirect, incidental, or
                  consequential damages resulting from the use or inability to
                  use the software.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
                <p>
                  This Licensing Agreement is governed by the laws of Israel.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
                <p>
                  For questions about this Licensing Agreement, contact us at
                  [support@yourdomain.com].
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
