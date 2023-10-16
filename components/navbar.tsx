"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useUser } from "@clerk/nextjs"

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface NavbarProps {
  isPro: boolean;
}


export const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModal();
  const { isSignedIn } = useUser(); // Get user authentication status

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />
        <Link href="/">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary transition ease-in delay-150 hover:text-blue-400 hover:scale-110",
              font.className)}>
            wisdom.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {isSignedIn === false ? (
          <>
            <Link href="/sign-in">
              <Button size="sm" className="buttonGradient">
                Log In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="buttonGradient">
                Sign Up
              </Button>
            </Link>
            <ModeToggle />
          </>
        ) :(
          <>
            {!isPro && (
              <Button onClick={proModal.onOpen} size="sm" variant="premium">
                Upgrade
                <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
              </Button>
            )}
            <UserButton afterSignOutUrl="/" />
            <ModeToggle />
          </>
        )}
      </div>
    </div>
  );
};