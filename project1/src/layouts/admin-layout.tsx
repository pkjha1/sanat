import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { MobileBottomMenu } from '@/components/mobile-bottom-menu';

export function AdminLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileBottomMenu />
    </div>
  );
}