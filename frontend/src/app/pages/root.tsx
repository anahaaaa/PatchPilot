import { Outlet } from "react-router";
import { Header } from "../components/header";
import { MobileNav } from "../components/mobile-nav";

export function Root() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
