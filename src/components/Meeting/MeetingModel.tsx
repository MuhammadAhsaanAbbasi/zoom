import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { SignIn, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModel = ({ isOpen, onClose, title, className, children,
  handleClick, buttonText, image, buttonIcon }: MeetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex bg-dark-2 w-full max-w-[520px] flex-col border-none gap-5 px-6 py-9'>
        <SignedIn>
          <div className='flex flex-col gap-6'>
            {image && (
              <div className='flex justify-center'>
                <Image
                  src={image} alt='image'
                  height={72} width={72}
                />
              </div>
            )}
            <h2 className={cn('text-3xl font-semibold leading-10', className)}>{title}</h2>
            {children}
            <Button
              className='bg-blue-1 focus-visible:ring-0
          focus-visible:ring-offset-0'
              onClick={handleClick}
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon} alt='buttonIcon'
                  height={13} width={13}
                />
              )} &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>

          </div>
        </SignedIn>
        <SignedOut>
          <div className='flex flex-col gap-6'>
            <h2 className={cn('text-3xl font-semibold leading-10', className)}>{title}</h2>
            <Button className='bg-blue-1 hover:rounded-3xl transition-all duration-300'>
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModel