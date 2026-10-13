import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { readContact } from "@/lib/server/contact";
import ContactForm from "./contact-form";

export const metadata = { title: "Əlaqə məlumatları" };

export default async function ContactPage() {
  const contact = await readContact();
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Əlaqə məlumatları</CardTitle>
        <CardDescription>
          Bu məlumatlar saytın “Əlaqə” bölməsində, menyuda və footer-də göstərilir. Yadda saxlayan kimi saytda yenilənir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContactForm initial={contact} />
      </CardContent>
    </Card>
  );
}
