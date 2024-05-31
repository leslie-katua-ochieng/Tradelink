export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Tradelinki",
  description:
    "Connect with your customers and manage their orders in one place.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/services",
    },
    // {
    //   title: "Providers",
    //   href: "/providers",
    // },
    // {
    //   title: "About us",
    //   href: "/about",
    // },
    {
      title: "Contact us",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/kamemia_",
    github: "https://github.com/kamemia",
    docs: "https://ui.shadcn.com",
    dashboard: "/dashboard",
  },
}