'use client'

import Image from "next/image";
import Link from "next/link";
import { Companion } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import { useTheme } from "next-themes"

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

// Define the props for the DefaultCompanions component
interface DefaultCompanionsProps {
  data: Companion[]; // Data containing companion information
}

// Define the DefaultCompanions component
export const DefaultCompanions = ({ data }: DefaultCompanionsProps) => {
  // Filter out default companions from the data
  const defaultCompanions = data.filter((companion) => companion.isDefault);

  // If there are no default companions, display a message
  if (defaultCompanions.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" src="/empty.png" alt="Empty" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }

  const {theme} = useTheme()
  // If there are default companions, display them in a grid
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 pb-10">
      {defaultCompanions.map((item) => (
        <Card
        className={`bg-primary/10 rounded-xl cursor-pointer hover:scale-105 transition border-0 ${
          theme==="light"
            ? "shadow-xl shadow-black/30" // Apply black shadow for white theme
            : "shadow-xl shadow-white/30" // Apply white shadow for black theme
        } hover:shadow-blue-400/90`}
      >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image src={item.src} fill className="rounded-xl object-cover" alt="Character" />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{item.userName}</p>
              <div className="flex items-center">
                <MessagesSquare className="w-3 h-3 mr-1" />
                {item.messages?.length ?? 0} {/* Display the number of messages */}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};