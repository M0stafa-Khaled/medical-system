import { Button } from "@/shared/components/ui/button";
import { AlertTriangle, House, Undo2 } from "lucide-react";
import { Link } from "react-router";

const Error = () => {
  return (
    <main className="from-background to-background relative min-h-screen overflow-hidden bg-linear-to-b via-rose-50/60 dark:via-rose-950/10">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-900/25" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-900/20" />

      <div className="relative container flex min-h-screen items-center justify-center py-8">
        <section className="bg-card/95 w-full max-w-3xl rounded-3xl border p-6 text-center shadow-xl backdrop-blur-sm md:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300">
            تنبيه نظام
          </span>

          <div className="mx-auto mt-5 max-w-xl space-y-4">
            <h1 className="text-3xl leading-tight font-black md:text-4xl">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-muted-foreground leading-8 font-medium">
              نأسف، هناك مشكلة فنية مؤقتة. فريق الدعم يعمل على حلها. يُرجى
              المحاولة لاحقًا أو الرجوع إلى الصفحة الرئيسية.
            </p>
          </div>

          <div className="mt-8 flex flex-col-reverse justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size={"lg"}
              variant="outline"
              className="flex items-center justify-center gap-2 font-medium"
            >
              <Link to="/dashboard">
                لوحة التحكم
                <House size={20} />
              </Link>
            </Button>

            <Button
              asChild
              size={"lg"}
              className="flex items-center justify-center gap-2 font-medium"
            >
              <Link to="/">
                الصفحة الرئيسية
                <Undo2 size={20} />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Error;
