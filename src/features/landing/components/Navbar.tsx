import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Menu, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router";
import ToggleTheme from "../../../shared/components/ToggleTheme";
import { useAppSelector } from "@/app/store";
import { ProfileMenu } from "@/features/profile";

const navLinks = [
  { name: "الرئيسية", href: "#home" },
  { name: "خدماتنا", href: "#services" },
  { name: "الأطباء", href: "#doctors" },
  { name: "العيادات", href: "#clinics" },
  { name: "تواصل معنا", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 border-b shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <img src={"/images/logo.svg"} alt="logo" className="h-10 w-10" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            {import.meta.env.VITE_WEB_NAME}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <ToggleTheme className="bg-transparent! dark:bg-transparent!" />
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <>
              <Button
                variant="ghost"
                className="dark:hover:text-primary text-foreground rounded-full"
                asChild
              >
                <Link to="/sign-in">تسجيل الدخول</Link>
              </Button>
              <Button
                className="shadow-primary/20 rounded-full shadow-lg"
                asChild
              >
                <Link to="/sign-up">حساب جديد</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ToggleTheme className="bg-transparent! dark:bg-transparent!" />
          {isAuthenticated && <ProfileMenu />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${isScrolled ? "" : "bg-background/80 border-t border-b shadow-sm backdrop-blur-md"} lg:hidden ${isAuthenticated ? "" : "border-b"}`}
          >
            <div className="container flex flex-col gap-4 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-foreground hover:text-primary text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <hr className="border-border/50 my-2" />
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="link"
                      className="hover:text-primary w-full justify-center"
                      asChild
                    >
                      <Link
                        to="/sign-in"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        تسجيل الدخول
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link
                        to="/sign-up"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        حساب جديد
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};
