import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface AvatarProps {
    name: string
    description?: string
    imageSrc?: string
    size?: "sm" | "md" | "lg"
    className?: string
}

const AvatarComponent = ({
    name,
    description,
    imageSrc = "/placeholder-user.jpg",
    size = "md",
    className
}: AvatarProps) => {
    const sizeClasses = {
        sm: {
            avatar: "size-12",
            name: "text-sm",
            description: "text-xs"
        },
        md: {
            avatar: "size-16",
            name: "text-base",
            description: "text-sm"
        },
        lg: {
            avatar: "size-24",
            name: "text-lg",
            description: "text-base"
        }
    }

    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <Avatar className={cn(sizeClasses[size].avatar)}>
                <AvatarImage src={imageSrc} alt={name} className="bg-white" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <h3 className={cn("font-semibold text-gray-900 dark:text-white", sizeClasses[size].name)}>
                    {name}
                </h3>
                {description && (
                    <p className={cn("text-gray-600 dark:text-gray-400 mt-1", sizeClasses[size].description)}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}

export default AvatarComponent