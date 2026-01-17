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
import type { Navigation, Page } from "@/payload-types";

type NavItem = NonNullable<Navigation['items']>[number]
type SubmenuItem = NonNullable<NavItem['submenuItems']>[number]

interface HeaderProps {
  navigation?: Navigation | null;
}

// Helper function to resolve link URL from the new link structure
function getLink(item: { 
  linkType?: string | null; 
  internalLink?: number | Page | null; 
  externalUrl?: string | null; 
  anchor?: string | null;
}): string {
  if (item.linkType === 'anchor' && item.anchor) {
    return `#${item.anchor}`;
  }
  if (item.linkType === 'external' && item.externalUrl) {
    return item.externalUrl;
  }
  if (item.linkType === 'internal' && item.internalLink) {
    // If populated, use slug; otherwise it's just an ID
    if (typeof item.internalLink === 'object' && item.internalLink.slug) {
      return item.internalLink.slug === 'home' ? '/' : `/${item.internalLink.slug}`;
    }
  }
  return '/';
}

function isExternalLink(item: { linkType?: string | null; openInNewTab?: boolean | null }): boolean {
  return item.linkType === 'external' && item.openInNewTab === true;
}

const Header = ({ navigation }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

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
              height={28}
              className="h-[28px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              item.hasSubmenu && item.submenuItems && item.submenuItems.length > 0 ? (
                // Item with submenu - using Radix DropdownMenu
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors duration-200">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-card border-border">
                    {item.submenuItems.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link
                          href={getLink(subItem)}
                          target={isExternalLink(subItem) ? '_blank' : undefined}
                          rel={isExternalLink(subItem) ? 'noopener noreferrer' : undefined}
                          className="cursor-pointer"
                        >
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Regular link
                <Link
                  key={index}
                  href={getLink(item)}
                  target={isExternalLink(item) ? '_blank' : undefined}
                  rel={isExternalLink(item) ? 'noopener noreferrer' : undefined}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
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
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasSubmenu && item.submenuItems && item.submenuItems.length > 0 ? (
                    // Item with submenu
                    <>
                      <button
                        className="flex items-center justify-between w-full text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                        onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)}
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === index ? 'rotate-180' : ''}`} />
                      </button>
                      {openSubmenu === index && (
                        <div className="pl-4 border-l-2 border-border ml-2 mb-2">
                          {item.submenuItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={getLink(subItem)}
                              target={isExternalLink(subItem) ? '_blank' : undefined}
                              rel={isExternalLink(subItem) ? 'noopener noreferrer' : undefined}
                              className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // Regular link
                    <Link
                      href={getLink(item)}
                      target={isExternalLink(item) ? '_blank' : undefined}
                      rel={isExternalLink(item) ? 'noopener noreferrer' : undefined}
                      className="block text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
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
