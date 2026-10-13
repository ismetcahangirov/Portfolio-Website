"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "../../actions";

const FIELDS = [
  { id: "current", label: "Hazırkı parol", autoComplete: "current-password" },
  { id: "next", label: "Yeni parol", autoComplete: "new-password", minLength: 12 },
  { id: "confirm", label: "Yeni parol (təkrar)", autoComplete: "new-password", minLength: 12 },
];

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Parol dəyişdirildi.");
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="grid gap-5 sm:max-w-sm">
      <input type="text" name="username" autoComplete="username" defaultValue="admin" hidden readOnly />
      {FIELDS.map(({ id, label, ...rest }) => (
        <div key={id} className="grid gap-2">
          <Label htmlFor={id}>{label}</Label>
          <Input id={id} name={id} type="password" required {...rest} />
        </div>
      ))}
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? <Loader2 className="animate-spin" /> : <KeyRound />}
        Parolu yenilə
      </Button>
    </form>
  );
}
