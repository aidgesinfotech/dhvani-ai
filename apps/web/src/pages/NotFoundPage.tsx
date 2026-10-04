import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center pt-32 pb-20">
      <Seo title="Page not found | Dhvani.ai" />
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[30rem] w-[40rem] max-w-[140vw] glow-blue" aria-hidden />
      <div className="container-x relative text-center">
        <p className="font-display text-[7rem] md:text-[11rem] font-bold leading-none stroke-num">404</p>
        <h1 className="mt-2 font-display text-3xl md:text-5xl font-semibold text-white">
          This page went <span className="text-gradient-gold">silent.</span>
        </h1>
        <p className="mt-4 text-fg-2 max-w-md mx-auto">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Back to Home <ArrowUpRight size={16} />
          </Link>
          <Link to="/services" className="btn btn-ghost">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
