import React, { useState } from 'react';
import { LOGO_URL } from '../constants';

interface AuthPageProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setIsSuccess(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Notify app of success
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 1500);
  };

  const LogoIcon = ({ animate = false }) => (
    <div className={`w-32 h-32 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] ${animate ? 'animate-pulse scale-110' : ''} transition-all duration-500`}>
      <LOGO_URL width="100%" height="100%" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[130] bg-black flex overflow-hidden animate-fade-in">
      {/* Close Button */}
      {!isLoading && (
        <button
          onClick={onClose}
          className="absolute top-10 right-10 z-[140] w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all group backdrop-blur-md"
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Left Decoration Panel (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-[#02142C] relative flex-col items-center justify-center p-24 overflow-hidden border-r border-white/5">
        {/* Animated Background Highlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial-gradient from-[#76ABB8]/10 to-transparent blur-[160px] animate-pulse-slow"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg animate-slide-up">
          {/* Symmetrical Logo Container */}
          <div className="mb-12 flex justify-center w-full">
            <LogoIcon animate={isLoading} />
          </div>

          <div className="space-y-6 flex flex-col items-center w-full text-center">
            <h2 className="text-5xl xl:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] text-center w-full">
              {isLoading ? 'Processing...' : (isSuccess ? 'Verified' : 'Build The\nFuture')}
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-[#76ABB8] to-transparent rounded-full opacity-50"></div>
            <p className="text-white/60 text-lg sm:text-xl font-medium max-w-md leading-relaxed text-balance">
              Join the largest community of student entrepreneurs and innovators at VIT Bhopal.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-12 w-full">
            {['Incubation', 'Mentorship', 'Capital'].map(tag => (
              <div key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40 tracking-[0.2em] uppercase backdrop-blur-sm hover:border-[#76ABB8]/40 hover:text-[#76ABB8] transition-all">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative bg-black lg:bg-transparent">
        <div className="max-w-md w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>

          {isSuccess ? (
            <div className="text-center space-y-6 animate-slide-up">
              <div className="w-24 h-24 bg-[#76ABB8] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(118,171,184,0.4)]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Success!</h1>
                <p className="text-white/40 font-medium">Redirecting to your dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center lg:text-left">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-white/40 font-medium">
                  {isLogin
                    ? 'Enter your credentials to access your dashboard.'
                    : 'Join the ecosystem and start your journey today.'}
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold py-3 px-4 rounded-xl animate-fade-in">
                    {error}
                  </div>
                )}

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      disabled={isLoading}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#76ABB8] transition-all disabled:opacity-50"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    disabled={isLoading}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#76ABB8] transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2 relative">
                  <div className="flex justify-between items-center pr-2">
                    <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-2">Password</label>
                    {isLogin && (
                      <button type="button" className="text-[10px] font-bold text-white/40 hover:text-[#76ABB8] uppercase tracking-wider transition-colors">Forgot?</button>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#76ABB8] transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] disabled:bg-[#76ABB8]/50 text-white py-4 rounded-2xl font-black text-sm tracking-[0.2em] uppercase shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* Social Auth Separator */}
              <div className="my-10 flex items-center gap-4 opacity-50">
                <div className="flex-grow h-px bg-white/5"></div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">or continue with</span>
                <div className="flex-grow h-px bg-white/5"></div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => !isLoading && handleSubmit({ preventDefault: () => { } } as any)}
                  className="w-full flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-white/5 border border-white/10 py-3 rounded-2xl transition-all group disabled:opacity-50"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-xs font-bold text-white/60">Google</span>
                </button>
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm font-medium text-white/40">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[#76ABB8] font-black hover:underline underline-offset-4 ml-1 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .bg-radial-gradient { background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to)); }
      `}</style>
    </div>
  );
};

export default AuthPage;