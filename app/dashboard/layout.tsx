import { UserButton } from "@clerk/nextjs"
import { MainNav } from '@/app/dashboard/(overview)/components/main-nav' 

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <header className="bg-background sticky top-0 z-40 w-full border-b">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav/>
          <div className="ml-auto flex items-center space-x-4">
                <UserButton />
              </div>
        </div>
      </header>
      <div className="flex flex-col mr-64 ml-2 space-y-4">
          <div className="">{children}</div>
        </div>
        </>
    );
}