'use client';
import { Menu, PawPrint } from 'lucide-react';
import React, { MouseEventHandler, useCallback, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
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

import DarkModeButton from './DarkModeButton';

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
  locale,
  className,
  onClick,
}: NavbarComponentsProps & WithClassNameComponentType & { onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem className="m-1 w-full">
        <Link className="sm:w-full" href={`/projects`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Works
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/gallery`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Gallery
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link href={`/blog`} locale={locale} legacyBehavior passHref>
          <NavigationMenuLink onClick={onClick} className={cn(navigationMenuTriggerStyle(), 'w-full')}>
            Blog
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="m-1 w-full">
        <Link
          onClick={onClick}
          href={`/contact`}
          locale={locale}
          className={cn(buttonVariants(), 'sm:rounded-3xl rounded-md m-1 w-full')}>
          Contact
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export default function Navbar({ locale }: NavbarComponentsProps) {
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
          <LanguageSwitch locale={locale} className="hidden sm:flex" />
          <DarkModeButton className="hidden sm:flex" />
        </div>

        {/*Right Laptop*/}
        <NavbarMenu locale={locale} className="hidden sm:flex" />

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
            <NavbarMenu locale={locale} className="flex flex-col w-full" onClick={() => setOpen(false)} />
            <SheetFooter className="flex flex-row justify-between mt-[calc(100vh-329px)]">
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
    </>
  );
}
