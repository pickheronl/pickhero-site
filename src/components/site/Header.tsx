"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TrialFormDialog from "./TrialFormDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Functies", href: "/functies" },
    { label: "Integraties", href: "/integraties" },
    { label: "Prijzen", href: "/prijzen" },
  ];

  const overOnsItems = [
    { label: "Over ons", href: "/over-ons" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/pickero-logo.svg"
              alt="PickHero"
              width={140}
              height={35}
              className="h-[35px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Over ons Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors duration-200">
                Over ons
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border">
                {overOnsItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <TrialFormDialog>
              <Button variant="hero">Start gratis proefperiode</Button>
            </TrialFormDialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-2">
                <span className="text-sm text-muted-foreground mb-2 block">Over ons</span>
                {overOnsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors block pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <TrialFormDialog>
                  <Button variant="hero" className="w-full">Start gratis proefperiode</Button>
                </TrialFormDialog>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
