import HeroSection from '@/components/home/HeroSection';
import VehicleShowcase from '@/components/home/VehicleShowcase';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VehicleShowcase />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}
