import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen p-4">
      <header className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center text-white shadow-lg md:p-16 lg:p-20">
        <div className="relative z-10 mx-auto max-w-4xl space-y-4">
          <h1 className="font-bold text-3xl tracking-tight md:text-5xl">What&apos;s new?</h1>
          <p className="text-balance text-lg opacity-80 sm:text-xl">
            A rundown of the latest Phosphorus feature releases, product enhancements, design updates and important bug fixes.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12">
          {/* Changelog Entry 1 */}
          <div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
            <div className="mt-1 text-muted-foreground text-sm md:text-right">Mar 22, 2023</div>
            <div className="grid gap-4">
              <h2 className="font-bold text-2xl">Version 4.2.92</h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/30">Improvements</Badge>
                <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30">Bug Fixes</Badge>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">Improvements</h3>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Improved tooltip UI in settings.</li>
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">Bugfixes</h3>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>SAML request signing support.</li>
                  <li>SAML encrypted claims support.</li>
                </ul>
              </div>
              <Image
                alt="Screenshot of improved tooltip UI in settings"
                className="mt-4 rounded-lg border object-cover shadow-sm"
                height={400}
                src="/admin-dashboard.png"
                width={600}
              />
            </div>
          </div>

          {/* Separator */}
          <hr className="border-t" />

          {/* Changelog Entry 2 */}
          <div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
            <div className="mt-1 text-muted-foreground text-sm md:text-right">Mar 15, 2023</div>
            <div className="grid gap-4">
              <h2 className="font-bold text-2xl">Version 4.2.88</h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/30">Improvements</Badge>
                <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30">Bug Fixes</Badge>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">Improvements</h3>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Enhanced dashboard loading performance.</li>
                  <li>New filtering options for user management.</li>
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">Bugfixes</h3>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Fixed an issue with report generation for large datasets.</li>
                  <li>Resolved minor UI glitches on mobile devices.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Separator */}
          <hr className="border-t" />

          {/* Changelog Entry 3 */}
          <div className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8">
            <div className="mt-1 text-muted-foreground text-sm md:text-right">Mar 08, 2023</div>
            <div className="grid gap-4">
              <h2 className="font-bold text-2xl">Version 4.2.85</h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-500/20 text-purple-600 hover:bg-purple-500/30">New Features</Badge>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold text-lg">New Features</h3>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Introduced dark mode support across the application.</li>
                  <li>Added customizable notification preferences.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
