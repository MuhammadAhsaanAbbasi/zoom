import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = ({ divclassName, className }: { divclassName: string, className: string }) => {
    return <div className={`grid gap-3 p-4 grid-cols-1 ${divclassName}`}>
        <Skeleton className={`${className}`} />
        <Skeleton className={`${className}`} />
    </div>
}

export default Loading

export const ShareProductLoading = () => {
    return (
        <ul className="space-y-2 bg-slate-50 p-4">
            {[...Array(3)].map((_, index) => (
                <li
                    key={index}
                    className="flex items-center gap-2 bg-slate-100 transition-colors rounded-md p-2 w-full"
                >
                    {/* Skeleton for the image */}
                    <Skeleton className="w-12 h-12 rounded-md bg-slate-400" />
                    {/* Skeleton for the text content */}
                    <div className="flex-1">
                        <Skeleton className="h-6 w-[200px] mb-2 bg-slate-400" />
                        <Skeleton className="h-4 w-[150px] bg-slate-400" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
