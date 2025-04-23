import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <Image
                src="https://hrk-boutique.s3.ap-south-1.amazonaws.com/emailTemplate/hrk_boutique.png"
                alt="logo"
                width={120}
                height={150}
                className="w-20 h-auto md:w-auto"
            />
            <p className="text-base">
                {label}
            </p>
        </div>
    );
};