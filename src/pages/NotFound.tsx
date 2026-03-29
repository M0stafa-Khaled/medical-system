import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Compass, House, SearchX, Undo2 } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="from-background via-primary/5 to-background relative min-h-screen overflow-hidden bg-linear-to-b">
      <div className="bg-primary/10 pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-primary/8 pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 left-1/3 h-40 w-40 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-900/20" />

      <div className="relative container flex min-h-screen items-center justify-center py-8">
        <section className="bg-card/95 w-full max-w-4xl rounded-3xl border p-5 shadow-xl backdrop-blur-sm md:p-8">
          <div className="space-y-7 text-center">
            <div className="bg-primary/10 text-primary mx-auto flex h-18 w-18 items-center justify-center rounded-2xl">
              <SearchX className="h-9 w-9" />
            </div>

            <div className="space-y-4">
              <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold">
                <ArrowRight className="h-3.5 w-3.5" />
                404 خطأ
              </span>

              <h1 className="text-3xl leading-tight font-black md:text-5xl">
                الصفحة غير موجودة
              </h1>

              <p className="text-muted-foreground mx-auto max-w-2xl leading-8 font-medium">
                يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يمكنك
                العودة إلى الصفحة الرئيسية أو الانتقال إلى لوحة التحكم للمتابعة.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-background/70 rounded-xl border p-4 text-right">
                <p className="mb-1 text-sm font-bold">سبب محتمل</p>
                <p className="text-muted-foreground text-sm leading-7">
                  الرابط غير صحيح أو الصفحة تم حذفها.
                </p>
              </div>
              <div className="bg-background/70 rounded-xl border p-4 text-right">
                <p className="mb-1 text-sm font-bold">إجراء سريع</p>
                <p className="text-muted-foreground text-sm leading-7">
                  راجع الرابط أو استخدم الأزرار بالأسفل للمتابعة.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse justify-center gap-3 pt-1 sm:flex-row">
              <Button
                className="flex items-center justify-center gap-2"
                variant="outline"
                asChild
                size={"lg"}
              >
                <Link to="/dashboard">
                  لوحة التحكم
                  <House size={20} />
                </Link>
              </Button>

              <Button
                className="flex items-center justify-center gap-2 font-medium"
                asChild
                size={"lg"}
              >
                <Link to="/">
                  الصفحة الرئيسية
                  <Undo2 size={20} />
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground inline-flex items-center justify-center gap-2 text-xs">
              <Compass className="h-3.5 w-3.5" />
              لم تجد ما تبحث عنه؟ ابدأ من الصفحة الرئيسية.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
