"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAllRead } from "../../actions";

export default function MarkAllReadButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await markAllRead();
          toast.success("Bütün mesajlar oxunmuş kimi işarələndi.");
          router.refresh();
        })
      }
    >
      <CheckCheck />
      Hamısını oxunmuş et
    </Button>
  );
}
