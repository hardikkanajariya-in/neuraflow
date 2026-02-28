import type { Metadata } from 'next';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. Start free, scale as you grow.',
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
