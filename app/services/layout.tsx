import { SiteHeader } from "@/components/site-header"

export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen flex-col">
              <SiteHeader/>
              <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">{children}</div>
            </div>
	);
}