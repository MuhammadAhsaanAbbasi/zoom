import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AuthHeader } from './header';
import BackButton from './backButton';

interface CardwrapperProps {
    children: React.ReactNode;
    headerlabels: string;
    backButtonLabel: string;
    backButtonhref: string;
}


export const CardWrapper = (
    {
        children,
        headerlabels,
        backButtonLabel,
        backButtonhref
    }: CardwrapperProps
) => {
    return (
        <Card className='w-[500px] shadow-md bg-white/30 backdrop-blur-md rounded-xl border border-white/20 text-black'>
            <CardHeader>
                <AuthHeader label={headerlabels} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonhref} />
            </CardFooter>
        </Card>
    )
}