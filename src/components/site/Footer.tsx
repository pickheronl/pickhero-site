import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
} as const;

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram' | 'youtube';
  url: string;
  id?: string | null;
}

interface FooterLink {
  label: string;
  url: string;
  id?: string | null;
}

interface FooterColumn {
  title: string;
  links?: FooterLink[] | null;
  id?: string | null;
}

interface FooterData {
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  columns?: FooterColumn[] | null;
  socialLinks?: SocialLink[] | null;
  copyright?: string | null;
  madeWith?: string | null;
}

interface FooterProps {
  footer?: FooterData | null;
}

const Footer = ({ footer }: FooterProps) => {

  return (
    <footer className="py-16 bg-ink text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:flex-nowrap gap-12 mb-12 lg:items-start lg:justify-between">
          <div className="lg:w-[28%]">
            <Image
              src="/images/pickero-logo-white.svg"
              alt="PickHero"
              width={160}
              height={56}
              className="h-14 w-auto mb-6"
            />
            {footer?.description && (
              <p className="text-background/70 mb-4 max-w-sm">
                {footer.description}
              </p>
            )}
            <address className="text-background/70 not-italic mb-6 text-sm whitespace-pre-line">
              {footer?.address}
              {footer?.phone && (
                <>
                  <br />
                  <a href={`tel:${footer.phone}`} className="hover:text-background transition-colors">
                    {footer.phone}
                  </a>
                </>
              )}
              {footer?.email && (
                <>
                  <br />
                  <a href={`mailto:${footer.email}`} className="hover:text-background transition-colors">
                    {footer.email}
                  </a>
                </>
              )}
            </address>
            {footer?.socialLinks && footer.socialLinks.length > 0 && (
              <div className="flex gap-4">
                {footer.socialLinks.map((social, index) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                    >
                      <span className="sr-only">{social.platform}</span>
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {footer?.columns?.map((column, index) => (
            <div key={index} className="lg:flex-1">
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links?.map((item, linkIndex) => (
                  <li key={linkIndex}>
                    {item.url.startsWith("/") ? (
                      <Link
                        href={item.url}
                        className="text-background/70 hover:text-background transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.url}
                        className="text-background/70 hover:text-background transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            {footer?.copyright?.replace('{{year}}', new Date().getFullYear().toString()) || `© ${new Date().getFullYear()} PickHero. Alle rechten voorbehouden.`}
          </p>
          {footer?.madeWith && (
            <p className="text-background/60 text-sm">
              {footer.madeWith}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
