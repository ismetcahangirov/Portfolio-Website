"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContact } from "../../actions";

function Field({ id, label, hint, error, ...props }) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? `${id}-hint` : undefined} {...props} />
      {(error || hint) && (
        <p id={`${id}-hint`} className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ initial }) {
  const [state, action, pending] = useActionState(updateContact, { values: initial });
  const v = state?.values ?? initial;
  const e = state?.errors ?? {};

  useEffect(() => {
    if (state?.ok) toast.success("Əlaqə məlumatları yadda saxlanıldı və saytda yeniləndi.");
    else if (state?.errors) toast.error("Formda səhv var. Qırmızı sahələri düzəldin.");
  }, [state]);

  return (
    <form action={action} className="grid gap-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="E-poçt" type="email" autoComplete="email" defaultValue={v.email} error={e.email} required key={`email-${state?.savedAt}`} />
        <Field id="phone" label="Telefon" type="tel" autoComplete="tel" defaultValue={v.phone} error={e.phone} hint="Saytda yazıldığı kimi görünəcək, məsələn +994 55 123 45 67" required key={`phone-${state?.savedAt}`} />
        <Field id="github" label="GitHub istifadəçi adı" defaultValue={v.github} error={e.github} hint="Yalnız istifadəçi adı və ya profil linki" required key={`github-${state?.savedAt}`} />
        <div className="hidden sm:block" />
        <Field id="location_az" label="Ünvan (Azərbaycanca)" defaultValue={v.location.az} error={e.location_az} required key={`laz-${state?.savedAt}`} />
        <Field id="location_en" label="Ünvan (İngiliscə)" defaultValue={v.location.en} error={e.location_en} required key={`len-${state?.savedAt}`} />
      </div>
      <div className="flex justify-end border-t pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : <Save />}
          Yadda saxla
        </Button>
      </div>
    </form>
  );
}
