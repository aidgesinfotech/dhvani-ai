import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { SmoothScroll } from '../components/SmoothScroll';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PageTransition } from '../components/PageTransition';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-ink text-fg">
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main>
        <PageTransition />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
