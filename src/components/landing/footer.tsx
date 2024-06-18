import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
      <p className="text-xs text-gray-500">
        &copy; 2024 Eduardo Arhuata. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="https://github.com/Edartruwu"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Github
        </Link>
        <Link
          href="https://wa.me/+51943056060"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          WhatsApp
        </Link>
        <Link
          href="/why"
          className="text-xs hover:underline underline-offset-4"
          prefetch={true}
        >
          Why?
        </Link>
      </nav>
    </footer>
  );
}
