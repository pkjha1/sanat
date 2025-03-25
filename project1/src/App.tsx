import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SiteLayout } from '@/layouts/site-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { AdminLayout } from '@/layouts/admin-layout';
import { RouteGuard } from '@/components/route-guard';

// Public pages
import { HomePage } from '@/pages/home-page';
import { AboutPage } from '@/pages/about-page';
import { AboutGurujiPage } from '@/pages/about-guruji-page';
import { WhyUsPage } from '@/pages/why-us-page';
import { DonatePage } from '@/pages/donate-page';
import { PanchangPage } from '@/pages/panchang/panchang-page';
import { BlissTalkPage } from '@/pages/bliss-talk-page';

// Content pages (protected)
import { BooksPage } from '@/pages/books/books-page';
import { BookDetailPage } from '@/pages/books/book-detail-page';
import { TeachingsPage } from '@/pages/teachings/teachings-page';
import { TeachingDetailPage } from '@/pages/teachings/teaching-detail-page';
import { AudiobooksPage } from '@/pages/audiobooks/audiobooks-page';
import { AudiobookDetailPage } from '@/pages/audiobooks/audiobook-detail-page';
import { StoriesPage } from '@/pages/stories/stories-page';
import { StoryDetailPage } from '@/pages/stories/story-detail-page';
import { MeditationPage } from '@/pages/meditation/meditation-page';
import { MeditationDetailPage } from '@/pages/meditation/meditation-detail-page';
import { ReligiousPlacesPage } from '@/pages/religious-places/religious-places-page';
import { ReligiousPlaceDetailPage } from '@/pages/religious-places/religious-place-detail-page';

// User dashboard pages
import { DashboardPage } from '@/pages/dashboard/dashboard-page';
import { SubscriptionPage } from '@/pages/dashboard/subscription-page';

// Admin pages
import { AdminDashboard } from '@/pages/admin/admin-dashboard';
import { AdminSubscriptionPage } from '@/pages/admin/subscription/admin-subscription-page';

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about-guruji" element={<AboutGurujiPage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="panchang" element={<PanchangPage />} />
          <Route path="bliss-talk" element={<BlissTalkPage />} />
          
          {/* Protected Content Routes */}
          <Route path="books" element={
            <RouteGuard requireAuth requireSubscription="books">
              <BooksPage />
            </RouteGuard>
          } />
          <Route path="books/:id" element={
            <RouteGuard requireAuth requireSubscription="books">
              <BookDetailPage />
            </RouteGuard>
          } />
          
          <Route path="teachings" element={
            <RouteGuard requireAuth requireSubscription="teachings">
              <TeachingsPage />
            </RouteGuard>
          } />
          <Route path="teachings/:id" element={
            <RouteGuard requireAuth requireSubscription="teachings">
              <TeachingDetailPage />
            </RouteGuard>
          } />
          
          <Route path="audiobooks" element={
            <RouteGuard requireAuth requireSubscription="audiobooks">
              <AudiobooksPage />
            </RouteGuard>
          } />
          <Route path="audiobooks/:id" element={
            <RouteGuard requireAuth requireSubscription="audiobooks">
              <AudiobookDetailPage />
            </RouteGuard>
          } />
          
          <Route path="stories" element={
            <RouteGuard requireAuth requireSubscription="stories">
              <StoriesPage />
            </RouteGuard>
          } />
          <Route path="stories/:id" element={
            <RouteGuard requireAuth requireSubscription="stories">
              <StoryDetailPage />
            </RouteGuard>
          } />
          
          <Route path="meditation" element={
            <RouteGuard requireAuth requireSubscription="meditation">
              <MeditationPage />
            </RouteGuard>
          } />
          <Route path="meditation/:id" element={
            <RouteGuard requireAuth requireSubscription="meditation">
              <MeditationDetailPage />
            </RouteGuard>
          } />
          
          {/* Public Access Religious Places */}
          <Route path="religious-places" element={<ReligiousPlacesPage />} />
          <Route path="religious-places/:id" element={<ReligiousPlaceDetailPage />} />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="callback" element={<Navigate to="/dashboard" />} />
          <Route path="login" element={<Navigate to="/" />} />
          <Route path="signup" element={<Navigate to="/" />} />
        </Route>
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={
          <RouteGuard requireAuth>
            <DashboardLayout />
          </RouteGuard>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          {/* Add other dashboard routes here */}
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <RouteGuard requireAuth requireAdmin>
            <AdminLayout />
          </RouteGuard>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="subscriptions" element={<AdminSubscriptionPage />} />
          {/* Add other admin routes here */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;