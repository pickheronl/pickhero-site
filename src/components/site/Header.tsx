"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import TrialFormDialog from "./TrialFormDialog";

interface NavItem {
  label: string;
  link: string;
  id?: string | null;
}

interface NavigationData {
  items?: NavItem[] | null;
  ctaText?: string | null;
  loginText?: string | null;
  loginUrl?: string | null;
}

interface HeaderProps {
  navigation?: NavigationData | null;
}

const Header = ({ navigation }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = navigation?.items || [];

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
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {navigation?.loginUrl && (
              <a
                href={navigation.loginUrl}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                {navigation.loginText || 'Inloggen'}
              </a>
            )}
            <TrialFormDialog>
              <Button variant="hero">{navigation?.ctaText || 'Gratis proberen'}</Button>
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
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
                {navigation?.loginUrl && (
                  <a
                    href={navigation.loginUrl}
                    className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  >
                    {navigation.loginText || 'Inloggen'}
                  </a>
                )}
                <TrialFormDialog>
                  <Button variant="hero" className="w-full">{navigation?.ctaText || 'Gratis proberen'}</Button>
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
