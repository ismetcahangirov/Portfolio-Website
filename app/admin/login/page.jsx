import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/server/auth";
import LoginForm from "./login-form";

export const metadata = { title: "Giriş" };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Logo className="mx-auto mb-2 h-10 w-10" />
          <CardTitle className="text-xl">Admin panel</CardTitle>
          <CardDescription>Davam etmək üçün parolu daxil edin.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
