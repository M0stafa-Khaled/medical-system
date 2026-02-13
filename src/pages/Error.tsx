import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { Link } from "react-router";

const Error = () => {
  return (
    <main className="dark:bg-background bg-[#FFF]">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-dark text-2xl leading-relaxed font-bold dark:text-white">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-muted-foreground leading-8 font-medium">
            نأسف، هناك مشكلة فنية. فريق الدعم يعمل على حلها. يُرجى المحاولة
            لاحقًا أو العودة إلى الصفحة الرئيسية
          </p>
        </div>
        <Button className="mt-5 h-auto w-auto px-0 py-0">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 font-medium"
          >
            الصفحة الرئيسية
            <Undo2 size={24} />
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default Error;
