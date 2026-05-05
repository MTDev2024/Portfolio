import Link from "next/link";
import ThemeToggle from "@/components/system/ThemeToggle";

export default function Navbar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed top-0 z-50 w-full border-b border-(--border) bg-white/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#hero"
          className="text-sm font-semibold tracking-wide"
        >
          Michael Takbou
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-6 text-sm text-(--text-secondary)">
          <li>
            <Link
              href="#about"
              className="transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              À propos
            </Link>
          </li>

          <li>
            <Link
              href="#projects"
              className="transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Projets
            </Link>
          </li>

          <li>
            <Link
              href="#contact"
              className="transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
      
    </nav>
  );
}