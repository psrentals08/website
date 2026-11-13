import HeroSection from '@/components/home/HeroSection';
import VehicleShowcase from '@/components/home/VehicleShowcase';
import MotorcycleShowcase3D from '@/components/animations/MotorcycleShowcase3D';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VehicleShowcase />
      <section className="section-padding max-w-7xl mx-auto">
        <MotorcycleShowcase3D />
      </section>
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}
