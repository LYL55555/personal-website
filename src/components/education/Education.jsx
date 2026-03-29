import Image from "next/image";
import { useTheme } from "next-themes";

export default function Education() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image
          src={
            resolvedTheme === "dark"
              ? "/images/UCLA_Samueli_CS_block_cmyk_rev.svg"
              : "/images/UCLA_Samueli_CS_block_cmyk.svg"
          }
          alt="UCLA School of Engineering"
          width={32}
          height={32}
          priority
        />
        <h3 className="text-lg font-semibold">Education</h3>
      </div>
      {/* Rest of the education component */}
    </div>
  );
}
