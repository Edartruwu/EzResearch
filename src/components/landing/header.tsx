import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-center h-20 px-4 md:px-6">
      <div className="text-4xl font-bold tracking-wider">
        <Link href={"/"} prefetch={true}>
          <span className="text-[#ccc]">Ez</span>Research{" "}
        </Link>
      </div>
    </header>
  );
}
