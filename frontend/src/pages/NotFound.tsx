import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="bg-[#FFF] dark:bg-background">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center max-w-sm">
          <img src="404.webp" alt="not found" className="w-ful h-full" />
        </div>
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-2xl font-bold text-dark dark:text-white leading-relaxed">
            الصفحة غير موجودة
          </h1>
          <p className="leading-8 text-muted-foreground font-medium">
            يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يرجى التأكد من
            الرابط أو العودة إلى الصفحة الرئيسية.
          </p>
        </div>
        <Button className="h-auto w-auto px-0 py-0 mt-5">
          <Link
            to="/"
            className="flex justify-center items-center gap-2 py-3 px-6 font-medium"
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
