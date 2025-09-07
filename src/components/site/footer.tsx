import Link from "next/link";
import { site } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="py-10 bg-ink text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center container-px gap-4">
        <div className="text-sm">
          © {new Date().getFullYear()} MyFutureLinks. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="opacity-90 hover:opacity-100">
            Privacy
          </Link>
          {/* you can add Terms later: <Link href="/terms">Terms</Link> */}
          {/* <a
            href={site.social.x}
            target="_blank"
            rel="noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            X
          </a>
          <a
            href={site.social.fb}
            target="_blank"
            rel="noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            Facebook
          </a>
          <a
            href={site.social.ig}
            target="_blank"
            rel="noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            Instagram
          </a> */}
          <a
            href={site.social.li}
            target="_blank"
            rel="noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
