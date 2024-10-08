'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LogoutButton from '@/components/LogoutButton';
import { ModeToggle } from '@/components/ModeToggle';
import { Profile } from '../../public/types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [user, setUser] = useState<Profile | null>(null);

  const auth = useAuth();
  useEffect(() => {
    if (auth.user === null) {
      setUser(null);
    } else setUser(auth.user);
  }, [auth.user]);

  return (
    <header className='sticky top-0 z-50 w-full bg-background border-b border-muted'>
      <div className='container flex items-center justify-between h-16 px-4 md:px-6'>
        <Link href='#' className='flex items-center gap-2' prefetch={false}>
          <MountainIcon />
          {/* className="h-6 w-6" */}
          <span className='font-bold text-lg'>My App</span>
        </Link>
        <nav className='hidden md:flex items-center gap-4'>
          <Link
            href='/'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href='/products'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href='#'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className='flex items-center gap-4'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <div className='flex items-center gap-2 p-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className='grid gap-0.5 leading-none'>
                    <div className='font-semibold'>{user?.name}</div>
                    <div className='text-sm text-muted-foreground'>
                      {user?.email}
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href='/me'
                    className='flex items-center gap-2'
                    prefetch={false}
                  >
                    <div className='h-4 w-4' />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href='#'
                    className='flex items-center gap-2'
                    prefetch={false}
                  >
                    <div className='h-4 w-4' />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className='flex items-center gap-2'>
                    <LogoutButton />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href='/login'
                className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Login
              </Link>
              <Link
                href='/register'
                className='inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                prefetch={false}
              >
                Register
              </Link>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

function MountainIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}
