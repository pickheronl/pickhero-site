import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Facebook', icon: Facebook, url: '#' },
  ];

  const links = {
    "Product": [
      { label: "Functies", href: "/functies" },
      { label: "Integraties", href: "/integraties" },
      { label: "Prijzen", href: "/prijzen" },
      { label: "Roadmap", href: "/roadmap" },
    ],
    "Bedrijf": [
      { label: "Over ons", href: "/over-ons" },
      { label: "Blog", href: "/blog" },
      { label: "Vacatures", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
    "Resources": [
      { label: "Helpcentrum", href: "https://docs.pickhero.nl/" },
      { label: "Documentatie", href: "https://docs.pickhero.nl/" },
      { label: "API", href: "https://docs.pickhero.nl/" },
      { label: "Status", href: "#" },
    ],
    "Juridisch": [
      { label: "Privacy", href: "/privacy" },
      { label: "Voorwaarden", href: "/voorwaarden" },
      { label: "Cookies", href: "/cookies" },
    ],
  };

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
            <p className="text-background/70 mb-4 max-w-sm">
              De slimme WMS-oplossing voor webwinkels. Eenvoudig, snel en betrouwbaar magazijnbeheer.
            </p>
            <address className="text-background/70 not-italic mb-6 text-sm whitespace-pre-line">
              Ravenoord 1{"\n"}
              3523 DB Utrecht{"\n"}
              Nederland
              <br />
              <a href="tel:+31302072660" className="hover:text-background transition-colors">
                +31 30 207 2660
              </a>
              <br />
              <a href="mailto:info@pickhero.nl" className="hover:text-background transition-colors">
                info@pickhero.nl
              </a>
            </address>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="lg:flex-1">
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="text-background/70 hover:text-background transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
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
            © 2025 PickHero. Alle rechten voorbehouden.
          </p>
          <p className="text-background/60 text-sm">
            Gemaakt met ❤️ in Nederland
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
