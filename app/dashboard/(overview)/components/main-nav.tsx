import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6"/ >
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/invoices"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Invoices
      </Link>
      <Link
        href="/dashboard/orders"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Orders
      </Link>
      <Link
        href="/dashboard/services"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Services
      </Link>
    </nav>
  )
}