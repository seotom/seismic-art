import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Seismic Art Hub. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="#"
              target="_blank"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline"
            >
              Submit Art
            </Link>
            <Link
              href="https://seismic.systems/"
              target="_blank"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:underline"
            >
              Seismic.systems
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
