import React, { useState, useEffect } from 'react';
import { logout } from './services/auth';
import { UserApp } from './screens/UserApp';
import { DriverApp } from './screens/DriverApp';
import { AdminDashboard } from './screens/AdminDashboard';
import { CompanyDashboard } from './screens/CompanyDashboard';
import { AuthScreen } from './screens/AuthScreen';
import { LandingPage } from './screens/LandingPage';
import { Role } from './types';
import { Smartphone, LayoutDashboard, Bike, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { APP_CONFIG } from './constants';
import { AuthProvider, useAuth } from './context/AuthContext';
import { isAppContext, getAppUrl } from './utils/url';

// --- APP ROUTER (Functional Application) ---
// This component runs when user navigates to /passageiro, /piloto, /admin, /empresas
const AppRouter = () => {
  const { user } = useAuth();

  // --- MOCK SIMULATION INIT ---
  useEffect(() => {
    // Dynamic import to avoid bundling mock logic in prod if possible (though checking inside is safer)
    import('./services/simulation').then(({ initSimulation }) => {
      const cleanup = initSimulation();
      // Store cleanup to run on unmount? 
      // Hook cleanup will handle it if we return it here, but we are inside .then
      // Simplified: The simulation service manages its own singular interval usually, 
      // but let's just let it run.
    });
  }, []);

  // Parse role from URL (e.g. /passageiro -> 'user')
  const getRoleFromUrl = (): Role | 'login' => {
    const path = window.location.pathname;

    // Also support legacy /app/* paths for backward compat
    const effectivePath = path.replace('/app', '') || '/';

    if (effectivePath.includes('/passageiro')) return 'user';
    if (effectivePath.includes('/piloto')) return 'driver';
    if (effectivePath.includes('/cadastro-motorista')) return 'driver-register';
    if (effectivePath.includes('/admin')) return 'admin';
    if (effectivePath.includes('/empresas')) return 'company';

    // Default to login if root of app or unknown
    return 'login';
  };

  const [role, setRole] = useState<Role | 'login'>(getRoleFromUrl);

  // Sync session check
  useEffect(() => {
    if (!user) return;

    const checkSession = async (isRetry = false) => {
      try {
        const { validateSession } = await import('./services/user');
        const isValid = await validateSession(user.uid);

        if (!isValid) {
          if (!isRetry) {
            console.warn("Session check failed. Retrying in 3s...");
            setTimeout(() => checkSession(true), 3000);
            return;
          }

          console.warn("Session invalidated after retry.");
          await logout();
          window.location.reload();
        }
      } catch (e) {
        console.error("Session check failed", e);
      }
    };

    // Check every 30 seconds instead of 10
    const interval = setInterval(() => checkSession(false), 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Handle Login State
  if (!user && role !== 'driver-register') {
    // If we are at a specific route like /app/admin but not logged in, 
    // we show the AuthScreen for that role (or generic).
    // Mapping URL role to AuthScreen expected role:
    const authRoleMap: Record<string, string> = {
      'user': 'user',
      'driver': 'driver',
      'admin': 'admin',
      'company': 'company',
      'login': 'user' // Default login screen
    };

    return (
      <AuthScreen
        role={authRoleMap[role as string] || 'user'}
        onLoginSuccess={() => {
          // After login, we stay on the same component but 'user' will be truthy,
          // so it will fall through to the App logic below.
          // We might want to force a re-evaluation or just let React handle it.
        }}
        onBack={() => {
          // Back from App Login -> Go to Landing Page (root)
          window.location.href = '/';
        }}
      />
    );
  }

  // Driver Registration (No Login Required)
  if (role === 'driver-register') {
    if (user) {
      setRole('driver'); // Auto-switch if registered
      return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Carregando App...</div>;
    }
    return (
      <AuthScreen
        role="driver-register"
        onLoginSuccess={() => setRole('driver')}
        onBack={() => { window.location.href = getAppUrl('piloto'); }} // Back simply reloads or goes to login
      />
    );
  }

  // App Wrapper to simulate mobile view on Desktop gracefully
  const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-[100dvh] w-full bg-gray-100 md:bg-gray-200 lg:bg-[#0F1D32] flex items-center justify-center font-sans overflow-hidden">
      {/* 
        This transform trick creates a new containing block for 'fixed' elements,
        so full-screen modals inside UserApp/DriverApp won't break out of the phone frame! 
      */}
      <div 
        className="w-full h-[100dvh] md:max-h-[85vh] md:h-[900px] md:max-w-[400px] bg-white relative overflow-hidden md:rounded-[40px] md:shadow-2xl md:border-[10px] md:border-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-100 translate-z-0"
        style={{ transform: 'scale(1) translateZ(0)' }}
      >
        {children}
      </div>
    </div>
  );

  // Logged In Views
  if (role === 'user') return <AppWrapper><UserApp /></AppWrapper>;
  if (role === 'driver') return <AppWrapper><DriverApp /></AppWrapper>;
  if (role === 'admin') return <AdminDashboard onLogout={logout} />;
  if (role === 'company') return <CompanyDashboard onBack={logout} />;

  // User logged in but unknown role or root /app
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-xl font-bold mb-4">Selecione o Acesso</h1>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-primary-500 text-white rounded" onClick={() => setRole('user')}>Passageiro</button>
        <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={() => setRole('driver')}>Piloto</button>
      </div>
    </div>
  );
}

// --- SITE ROUTER (Marketing & Presentation) ---
// This runs on the root path '/' and '/apresentacao'
const SiteRouter = () => {
  const [view, setView] = useState<'landing' | 'presentation'>('landing');

  useEffect(() => {
    // Simple path check for local nav
    if (window.location.pathname.includes('/apresentacao')) {
      setView('presentation');
    }
  }, []);

  const navigateToPres = () => {
    window.history.pushState({}, '', '/apresentacao');
    setView('presentation');
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setView('landing');
  };

  if (view === 'presentation') {
    return <DemoPresentation onBack={navigateToHome} />;
  }

  return <LandingPage onStartDemo={navigateToPres} />;
};


// --- DEMO PRESENTATION SCREEN (Replaces old 'Selection') ---
// No Login Logic Here. Just Links.
const DemoPresentation = ({ onBack }: { onBack: () => void }) => {
  const openApp = (path: string) => {
    // Navigate to the APP domain
    window.location.href = getAppUrl(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-900 flex flex-col items-center justify-center p-4 animate-fade-in relative overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white flex items-center gap-2 font-medium bg-black/20 px-4 py-2 rounded-full hover:bg-black/30 transition"
        >
          <ArrowLeft size={20} /> Voltar ao Site
        </button>
      </div>

      <div className="max-w-4xl w-full z-10">
        <div className="text-center text-white mb-12 animate-slide-up">
          <h1 className="text-5xl font-bold mb-4">{APP_CONFIG.name}</h1>
          <p className="text-xl opacity-90">Demonstração Interativa da Plataforma</p>
          <div className="mt-4 inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium border border-white/30">
            Ambiente de Teste • v1.0.0
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <RoleCard
            title="Passageiro"
            description="Solicitar mototáxi e entregas."
            icon={<Smartphone size={32} />}
            onClick={() => openApp('passageiro')}
          />
          <RoleCard
            title="Piloto"
            description="Receber corridas e lucrar."
            icon={<Bike size={32} />}
            onClick={() => openApp('piloto')}
          />
          <RoleCard
            title="Empresas"
            description="Gestão de corridas corporativas."
            icon={<Building2 size={32} />}
            onClick={() => openApp('empresas')}
          />
          <RoleCard
            title="Painel Admin"
            description="Gestão da plataforma."
            icon={<LayoutDashboard size={32} />}
            onClick={() => openApp('admin')}
          />
        </div>
      </div>

      <div className="absolute bottom-6 text-center text-white/40 text-xs w-full">
        {APP_CONFIG.name} &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

const RoleCard = ({ title, description, icon, onClick }: { title: string, description: string, icon: React.ReactNode, onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-xl group relative overflow-hidden h-full flex flex-col"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-[100px] -mr-4 -mt-4 z-0 transition-transform group-hover:scale-110"></div>
    <div className="relative z-10 flex-1 flex flex-col">
      <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-sm">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 leading-relaxed mb-4 flex-1">{description}</p>
      <div className="mt-auto flex items-center text-primary-600 font-bold group-hover:translate-x-2 transition-transform">
        Acessar <ArrowRight size={18} className="ml-2" />
      </div>
    </div>
  </div>
);

// --- MAIN ENTRY POINT ---
const Main = () => {
  const [inAppMode, setInAppMode] = useState(isAppContext());

  useEffect(() => {
    // Initial check
    setInAppMode(isAppContext());

    // Listener for popstate to handle browser navigation if needed
    const handleChange = () => setInAppMode(isAppContext());
    window.addEventListener('popstate', handleChange);
    return () => window.removeEventListener('popstate', handleChange);
  }, []);

  return inAppMode ? <AppRouter /> : <SiteRouter />;
};

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;