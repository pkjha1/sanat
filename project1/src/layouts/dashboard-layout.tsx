import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { MobileBottomMenu } from '@/components/mobile-bottom-menu';

export function DashboardLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileBottomMenu />
    </div>
  );
}