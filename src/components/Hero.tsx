
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import ScribbleHighlight from './ui/ScribbleHighlight';
import CircleScribble from './ui/CircleScribble';
import { getWaitlistCount } from '@/lib/firebase';

const Hero = () => {
  const [waitlistCount, setWaitlistCount] = useState(120); // Default fallback
  
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount();
        setWaitlistCount(Math.max(count, 120)); // Ensure at least 120 to avoid looking empty
      } catch (error) {
        console.error("Error fetching waitlist count:", error);
      }
    };
    
    fetchWaitlistCount();
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-floopr-purple-bg opacity-50 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-floopr-purple-bg opacity-40 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-floopr-purple-bg border border-floopr-purple/20 mb-6">
            <Sparkles className="h-4 w-4 text-floopr-purple mr-2" />
            <span className="text-sm font-medium text-floopr-purple-dark">Early waitlist open</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
            Collect and manage feedback <span className="relative">
              <ScribbleHighlight>effortlessly</ScribbleHighlight>
              <CircleScribble className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-20 opacity-10" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black max-w-3xl mb-8">
            The all-in-one platform to collect, organize, and act on user feedback
          </p>
          
          <WaitlistForm />
          
          <div className="flex items-center justify-center mt-8 text-sm text-black">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                  {i}
                </div>
              ))}
            </div>
            <span>Join {waitlistCount}+ early adopters</span>
          </div>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-xl shadow-floopr-purple/5 bg-white border border-gray-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="aspect-[16/9] w-full bg-gray-100 relative overflow-hidden">
            {/* Simplified placeholder for the no-images branch */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-floopr-purple-bg to-white p-8">
              <div className="glass-card p-8 w-full max-w-3xl">
                <h3 className="text-2xl font-bold mb-4">Floopr Dashboard Preview</h3>
                <p className="mb-4">Organize feedback, prioritize features, and keep your users in the loop - all in one place.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">Feature Requests</h4>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">User Feedback</h4>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-16">
        <a 
          href="#features" 
          className="inline-flex items-center text-base font-medium text-floopr-purple hover:text-floopr-purple-dark transition-colors"
        >
          <span>Discover features</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
