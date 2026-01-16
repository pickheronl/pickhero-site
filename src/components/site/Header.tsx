"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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
              height={35}
              className="h-[35px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasSubmenu && item.submenuItems && item.submenuItems.length > 0 ? (
                  // Item with submenu
                  <>
                    <button
                      className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-card border border-border rounded-xl shadow-lg p-2 min-w-[220px]">
                        {item.submenuItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={getLink(subItem)}
                            target={isExternalLink(subItem) ? '_blank' : undefined}
                            rel={isExternalLink(subItem) ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <span className="font-medium text-foreground">{subItem.label}</span>
                            {subItem.description && (
                              <span className="block text-sm text-muted-foreground mt-0.5">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Regular link
                  <Link
                    href={getLink(item)}
                    target={isExternalLink(item) ? '_blank' : undefined}
                    rel={isExternalLink(item) ? 'noopener noreferrer' : undefined}
                    className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
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
