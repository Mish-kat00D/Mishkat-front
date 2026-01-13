import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react"
import NavLogo from '../../../public/NavLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { BsWhatsapp } from "react-icons/bs"

const footerLinks = [
  {
    title: "Platform",
    items: ["About", "Workshops", "Testimonials", "Email Us", "Get Ready", "FAQs"],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/17ofMTBBoz/?mibextid=wwXIfr" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/mish.kat_org" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/miishkatt/" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@mishkat-e9w?si=Utof5eBRvepX4MxM" }
]

export default function Footer() {
  return (
    <footer className="min-w-full mt-20 p-2 md:p-6 relative bg-primary-900 border-t border-indigo-300/10">
      <div className="container mx-auto  flex flex-col items-center gap-12 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Description + Newsletter */}
          <div className="flex flex-col items-start gap-6 mr-4">
            <Link href="/" className="flex justify-center items-center gap-2">
              <Image src={NavLogo} alt="Logo" width={132.66} height={60} />
            </Link>
            <p className="text-neutral-400 text-base font-semibold">
              An Arabic-first educational platform merging architecture and artificial
              intelligence to empower the next generation of designers.
            </p>

            <div className="flex flex-col gap-2 px-1 w-full">
              <span className="text-neutral-100 text-base font-semibold">
                Subscribe to our newsletter
              </span>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-primary-900 rounded-lg outline-1 outline-indigo-300/10 text-neutral-600 text-xs"
                />
                <button className="h-9 px-4 bg-secondary-500 rounded-lg text-white text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-1 md:flex-row flex-col justify-end md:justify-between gap-8 items-start md:gap-32">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h4 className="text-neutral-100 text-base font-semibold">{section.title}</h4>
                <ul className="flex flex-row md:flex-col gap-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-neutral-300 text-base font-semibold cursor-pointer hover:text-white transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Section */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2 border-t-2 border-indigo-300/10 pt-4">
          {/* Terms */}
          <div className="flex gap-4 text-primary-100 text-xs font-medium items-center">
            <a href="https://maps.app.goo.gl/MYvwqsGmQG8cWy7w5?g_st=ipc" target="_blank">98 - North Lotus, Area 4, فسم أول القاهرة الجديدة، محافظة القاهرة 4743030</a>
            <span> - </span>
            <a className="flex gap-2 items-center" href="https://wa.me/01033326205" target="_blank">
              <BsWhatsapp className="w-5 h-5" /> +201033326205
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-6">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a key={name} href={href} aria-label={name}>
                <Icon className="w-5 h-5 text-white hover:text-secondary-500 transition" />
              </a>
            ))}
          </div>

          {/* Copy */}
          <div className="text-primary-100 text-xs font-medium">
            © 2025 Mishkat. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
