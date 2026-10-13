import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logoutEverywhere } from "../../actions";
import PasswordForm from "./password-form";

export const metadata = { title: "Təhlükəsizlik" };

export default function SettingsPage() {
  return (
    <div className="grid max-w-3xl gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Parolu dəyiş</CardTitle>
          <CardDescription>Yeni parol ən azı 12 simvol olmalıdır. Parol menecerində saxlamaq tövsiyə olunur.</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessiyalar</CardTitle>
          <CardDescription>Bütün cihazlardan, o cümlədən bu cihazdan çıxış edir.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={logoutEverywhere}>
            <Button type="submit" variant="outline" className="text-destructive hover:text-destructive">
              <LogOut />
              Hər yerdən çıxış et
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
