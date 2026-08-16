import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-text-muted mb-6">
          404
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
          Looks like this page entered a different dimension.
        </p>
        
        <p className="text-text-muted max-w-md mx-auto mb-10">
          The route you are looking for does not exist in this reality. 
          Let's get you back to familiar territory.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] group relative"
        >
          <ArrowLeft size={18} className="relative z-10 transition-transform group-hover:-translate-x-1" />
          <span className="relative z-10">Back to Home</span>
          <div className="absolute inset-0 bg-accent transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 z-0" />
        </Link>
      </div>
    </div>
  );
}
