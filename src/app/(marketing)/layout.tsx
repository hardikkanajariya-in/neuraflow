import { MarketingHeader } from '@/components/layout/MarketingHeader';
import { MarketingFooter } from '@/components/layout/MarketingFooter';
import { BackToTop } from '@/components/layout/BackToTop';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <MarketingFooter />
      <BackToTop />
    </>
  );
}
