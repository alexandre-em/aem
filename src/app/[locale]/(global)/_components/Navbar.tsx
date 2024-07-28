'use client';
import { Menu, PawPrint } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import DarkModeButton from '@/components/DarkModeButton';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, usePathname, useRouter } from '@/navigation';

const emojiLang = {
  en: '🇬🇧',
  fr: '🇫🇷',
  jp: '🇯🇵',
};

function LanguageSwitch({ locale, className }: NavbarComponentsProps & WithClassNameComponentType) {
  const pathName = usePathname();
  const router = useRouter();

  const handleSelectLang = useCallback(
    (value: string) => {
      const path = pathName.split(locale)[1] || '/';
      router.replace(path, { locale: value });
    },
    [pathName, locale, router]
  );

  return (
    <Select onValueChange={handleSelectLang}>
      <SelectTrigger className={cn('max-w-[60px]', className)}>
        <SelectValue placeholder={emojiLang[locale]} />
      </SelectTrigger>
      <SelectContent className="max-w-[60px]">
        {Object.keys(emojiLang).map((lang) => (
          <SelectItem key={lang} value={lang}>
            {emojiLang[lang as 'en' | 'fr' | 'jp']}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NavbarMenu({
  messages,
  className,
  onClick,
}: NavbarComponentsProps & WithClassNameComponentType & { onClick?: () => void }) {
  const router = useRouter();

  const handleRedirect = useCallback(
    (path: string) => {
      if (onClick) {
        onClick();
      }
      router.push(path);
    },
    [onClick, router]
  );

  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem className="m-1 w-full cursor-pointer">
        <NavigationMenuLink onClick={() => handleRedirect('/projects')} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
          {messages?.projects || 'Works'}
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full cursor-pointer">
        <NavigationMenuLink onClick={() => handleRedirect('/gallery')} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
          {messages?.gallery || 'Gallery'}
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full cursor-pointer">
        <NavigationMenuLink onClick={() => handleRedirect('/blog')} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
          {messages?.blog || 'Blog'}
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Button onClick={() => handleRedirect('/contact')} className="sm:rounded-3xl rounded-md m-1 w-full">
          {messages?.contact || 'Contact'}
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export default function Navbar({ messages, locale }: NavbarComponentsProps) {
  const [open, setOpen] = useState<boolean | undefined>(false);

  return (
    <div className="fixed w-full z-50">
      <NavigationMenu className="p-2 min-w-full h-[56px] bg-background justify-between">
        {/*Left*/}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <PawPrint className="mr-2" />
            <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight mr-4">A. Em</h2>
          </Link>
          <LanguageSwitch locale={locale} className="hidden sm:flex" />
          <DarkModeButton className="hidden sm:flex" />
        </div>

        {/*Right Laptop*/}
        <NavbarMenu locale={locale} messages={messages} className="hidden sm:flex" />

        {/*Right Smartphone*/}
        <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
          <SheetTrigger className="flex justify-center items-center sm:hidden w-[46px] h-[46px] rounded-2xl">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-3">
              <SheetTitle>Alexandre Em</SheetTitle>
              <Separator />
            </SheetHeader>
            <NavbarMenu locale={locale} messages={messages} className="flex flex-col w-full" onClick={() => setOpen(false)} />
            <SheetFooter className="flex flex-row justify-between mt-[calc(100dvh-329px)]">
              <Link
                href="/admin"
                locale="en"
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-primary-foreground')}>
                Admin
              </Link>
              <div className="flex">
                <DarkModeButton className="mr-3" />
                <LanguageSwitch locale={locale} className="" />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
      <Separator />
    </div>
  );
}
