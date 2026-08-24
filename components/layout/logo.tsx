import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";


export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Marca Visible — inicio"
      className={cn(
        "group flex items-center gap-1.5 font-display leading-none tracking-tight",
        className,
      )}
    >
      <Image
        src={"/logo.png"}
        width={50}
        height={50}
        alt=""
      />
      <Image
        src={"/title.png"}
        width={250}
        height={50}
        alt=""
      />
    </Link>
  );
}
