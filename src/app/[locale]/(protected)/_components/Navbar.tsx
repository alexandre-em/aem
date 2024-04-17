'use client';
import { User } from 'firebase/auth';
import { Menu, PawPrint } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { removeSession } from '@/actions/auth';
import DarkModeButton from '@/components/DarkModeButton';
import useAuth from '@/components/hooks/useAuth';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import googleAuthInstance from '@/services/auth';

function NavbarMenu({ className, onClick }: WithClassNameComponentType & { onClick?: () => void }) {
  const user: User | null = useAuth();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await googleAuthInstance.signOut();
      if (onClick) {
        onClick();
      }

      toast({
        description: 'See you soon !',
        title: 'You have been successfully logged out ',
      });
      await removeSession();
    } catch (error) {
      console.log(error);
    }
  }, [onClick, toast]);

  if (!user?.uid) return null;

  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem className="m-1 w-full">
        <Link className="sm:w-full" href={`/admin/projects`} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Works
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/admin/gallery`} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Gallery
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/admin/blog`} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Blog
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full" onClick={handleSignOut}>
        <Button className="sm:rounded-3xl rounded-md m-1 w-full">
          <Link href={`/`}>Logout</Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export default function Navbar() {
  const user: User | null = useAuth();
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <>
      <NavigationMenu className="p-2 min-w-full h-[56px] bg-background justify-between">
        {/*Left*/}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <PawPrint className="mr-2" />
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight mr-4">A. Em</h1>
          </Link>
          <DarkModeButton className="hidden sm:flex" />
        </div>

        {/*Right Laptop*/}
        {user?.uid && <NavbarMenu className="hidden sm:flex" />}

        {/*Right Smartphone*/}
        {user?.uid && (
          <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
            <SheetTrigger className="flex justify-center items-center sm:hidden w-[46px] h-[46px] rounded-2xl">
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-3">
                <SheetTitle>Dashboard</SheetTitle>
                <Separator />
              </SheetHeader>
              <NavbarMenu className="flex flex-col w-full" onClick={() => setOpen(false)} />
              <SheetFooter className="flex flex-row justify-between mt-[calc(100vh-329px)]">
                <Link href="/" locale="en" className={cn(buttonVariants({ variant: 'ghost' }), 'text-primary-foreground')}>
                  Logout
                </Link>
                <div className="flex">
                  <DarkModeButton className="mr-3" />
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </NavigationMenu>
      <Separator />
    </>
  );
}
