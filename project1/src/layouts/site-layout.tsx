import React from 'react';
import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/site-header';
import { Footer } from '@/components/footer';
import { MobileBottomMenu } from '@/components/mobile-bottom-menu';

export function SiteLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomMenu />
    </div>
  );
}