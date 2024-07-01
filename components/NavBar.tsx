"use client";

import { Webhook, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Webhook className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Endpoints
        </Link>
        <Link
          href="/events"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Events
        </Link>
        <Link
          href="/logs"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Logs
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Webhook className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Endpoints
            </Link>
            <Link
              href="/events"
              className="text-muted-foreground hover:text-foreground"
            >
              Events
            </Link>
            <Link
              href="/logs"
              className="text-muted-foreground hover:text-foreground"
            >
              Logs
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
