import { Button } from "@/shared/components/ui/button";
import { Undo2 } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="dark:bg-background bg-[#FFF]">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="flex max-w-sm items-center justify-center">
          <img
            src="/images/404.webp"
            alt="not found"
            className="w-ful h-full"
          />
        </div>
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-dark text-2xl leading-relaxed font-bold dark:text-white">
            الصفحة غير موجودة
          </h1>
          <p className="text-muted-foreground leading-8 font-medium">
            يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يرجى التأكد من
            الرابط أو العودة إلى الصفحة الرئيسية.
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

export default NotFound;
