'use client';
import { Menu, PawPrint } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

import DarkModeButton from '@/components/DarkModeButton';
import { useAuth } from '@/components/providers/google.provider';
import { Button } from '@/components/ui/button';
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

function NavbarMenu({ className, onClick }: WithClassNameComponentType & { onClick?: () => void }) {
  const { logOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await logOut();
      if (onClick) {
        onClick();
      }

      toast({
        description: 'See you soon !',
        title: 'You have been successfully logged out ',
      });
    } catch (error) {
      console.log(error);
    }
  }, [logOut, onClick, toast]);

  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem className="m-1 w-full" onClick={onClick}>
        <Link className="sm:w-full" href={`/admin/projects`} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Works</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full" onClick={onClick}>
        <Link href={`/admin/gallery`} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Gallery</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full" onClick={onClick}>
        <Link href={`/admin/blog`} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Blog</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full" onClick={handleSignOut}>
        <Button className="sm:rounded-3xl rounded-md m-1 w-full">
          <Link href={`/`} legacyBehavior passHref>
            Logout
          </Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export default function Navbar() {
  const { user } = useAuth();
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
        {user?.accessToken && <NavbarMenu className="hidden sm:flex" />}

        {/*Right Smartphone*/}
        {user?.accessToken && (
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
                <Link href="/" locale="en">
                  <Button variant="ghost" className="text-primary-foreground">
                    Logout
                  </Button>
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
