import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "NeoPress | Anime & Gaming",
  description: "Clean, classic anime & gaming journal.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-200">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                  NP
                </div>
                <div>
                  <p className="text-lg font-semibold">NeoPress</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Anime &amp; Gaming
                  </p>
                </div>
              </div>
              <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
                <a className="hover:text-slate-900" href="#latest">
                  Latest
                </a>
                <a className="hover:text-slate-900" href="#reviews">
                  Reviews
                </a>
                <a className="hover:text-slate-900" href="#guides">
                  Guides
                </a>
                <a className="hover:text-slate-900" href="#community">
                  Community
                </a>
              </nav>
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-500 sm:flex">
                  <span className="text-slate-400">⌕</span>
                  Search stories
                </div>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">
                  Subscribe
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 md:grid-cols-3">
              <div>
                <p className="text-base font-semibold text-slate-900">NeoPress</p>
                <p className="mt-2 max-w-xs">
                  Clean, classic reads for anime arcs and gaming worlds.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Explore
                </p>
                <ul className="mt-3 space-y-2">
                  <li>
                    <a className="hover:text-slate-900" href="/articles">
                      Articles
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-slate-900" href="#reviews">
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-slate-900" href="#guides">
                      Guides
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Contact
                </p>
                <ul className="mt-3 space-y-2">
                  <li>hello@neopress.io</li>
                  <li>@neopress</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
