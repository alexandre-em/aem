'use client';
import { Menu, Moon, PawPrint, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui/button';
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
import { useRouter } from '@/navigation';

const emojiLang = {
  en: '🇬🇧',
  fr: '🇫🇷',
  jp: '🇯🇵',
};

function DarkModeButton({ className }: WithClassNameComponentType) {
  const { setTheme, theme } = useTheme();

  const handleSelectTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return (
    <Button variant="outline" size="icon" onClick={handleSelectTheme} className={cn('ml-2', className)}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

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

function NavbarMenu({ locale, className }: NavbarComponentsProps & WithClassNameComponentType) {
  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem className="m-1 w-full">
        <Link className="sm:w-full" href={`/projects`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Works</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/gallery`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Gallery</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/blog`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>Blog</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <Button className="sm:rounded-3xl rounded-md m-1 w-full">
        <Link href={`/projects`} locale={locale} legacyBehavior passHref>
          Contact
        </Link>
      </Button>
    </NavigationMenuList>
  );
}

export default function Navbar({ locale }: NavbarComponentsProps) {
  return (
    <>
      <NavigationMenu className="p-2 min-w-full h-[56px] bg-background justify-between">
        {/*Left*/}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <PawPrint className="mr-2" />
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight mr-4">A. Em</h1>
          </Link>
          <LanguageSwitch locale={locale} className="hidden sm:flex" />
          <DarkModeButton className="hidden sm:flex" />
        </div>

        {/*Right Laptop*/}
        <NavbarMenu locale={locale} className="hidden sm:flex" />

        {/*Right Smartphone*/}
        <Sheet>
          <SheetTrigger className="flex justify-center items-center sm:hidden w-[46px] h-[46px] rounded-2xl">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-3">
              <SheetTitle>Alexandre Em</SheetTitle>
              <Separator />
            </SheetHeader>
            <NavbarMenu locale={locale} className="flex flex-col w-full" />
            <SheetFooter className="flex flex-row justify-between mt-[calc(100vh-329px)]">
              <DarkModeButton className="" />
              <LanguageSwitch locale={locale} className="" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
      <Separator />
    </>
  );
}
