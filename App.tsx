
import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Search, PlusSquare, Zap, Activity, 
  ShieldCheck, ChevronRight, Bell, Settings, LogOut, 
  BarChart3, Globe, Users, ChevronDown, FileCheck, FileText, Gavel, HelpCircle, AlertOctagon, 
  ClipboardList, Banknote, BookOpen, SearchCode, Calculator, FileSignature, Building2, Users2, 
  ListOrdered, ShieldAlert, LifeBuoy, BookmarkCheck, MoreHorizontal, FileSearch, Target, Briefcase,
  History, Building, MessageSquare, Cpu
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import SearchBids from './components/SearchBids';
import RegisterAssets from './components/RegisterAssets';
import DisputeRobot from './components/DisputeRobot';
import Monitor from './components/Monitor';
import AuditTimeline from './components/AuditTimeline';
import PortalStatusGrid from './components/PortalStatusGrid';
import SettingsPage from './components/SettingsPage';
import SelectedBids from './components/SelectedBids';
import PreviousBids from './components/PreviousBids';
import AutomationPage from './components/AutomationPage';

// Contexto para o Edital Ativo
interface Edital {
  id: string;
  numero: string;
  uasg: string;
  cliente: string;
  objeto: string;
  valor: string;
  veredito: 'GO' | 'NO-GO' | 'PENDING';
}

const editaisMock: Edital[] = [
  { id: '1', numero: '90027/2025', uasg: '110792', cliente: 'AGU - Advocacia Geral da União', objeto: 'Oracle Exadata Cloud at Customer (ExaCC) v11M', valor: 'R$ 19.257.923,54', veredito: 'GO' },
  { id: '2', numero: '045/2024', uasg: '925001', cliente: 'SESC SP', objeto: 'Materiais Médicos Hospitalares', valor: 'R$ 450.000,00', veredito: 'PENDING' },
  { id: '3', numero: '112/2025', uasg: '300010', cliente: 'ANP - Agência Nacional do Petróleo', objeto: 'Serviços Técnicos de TI e Suporte', valor: 'R$ 5.800.000,00', veredito: 'NO-GO' }
];

interface EditalContextType {
  activeEdital: Edital;
  setActiveEdital: (e: Edital) => void;
}

const EditalContext = createContext<EditalContextType | undefined>(undefined);

export const useEdital = () => {
  const context = useContext(EditalContext);
  if (!context) throw new Error("useEdital deve ser usado dentro de um EditalProvider");
  return context;
};

const Sidebar = () => {
  const location = useLocation();
  const [isRegisterOpen, setIsRegisterOpen] = useState(location.pathname.startsWith('/register'));
  const [isPesquisasOpen, setIsPesquisasOpen] = useState(location.pathname.startsWith('/find'));
  const isActive = (path: string) => location.pathname === path;

  const registerSubItems = [
    { path: '/register/edital-referencia', icon: BookOpen, label: 'Edital e Referência' },
    { path: '/register/inteligencia-viabilidade', icon: SearchCode, label: 'Inteligência e Viabilidade' },
    { path: '/register/esclarecimentos', icon: MessageSquare, label: 'Esclarecimento e Impugnação' },
    { path: '/register/orcamentacao-parceiros', icon: Building2, label: 'Orçamentação e Parceiros' },
    { path: '/register/proposta-comercial', icon: Calculator, label: 'Propostas e Habilitação Técnica' },
    { path: '/register/habilitacao-declaracoes', icon: ShieldCheck, label: 'Habilitação Geral' },
    { path: '/register/sessao-lances', icon: Zap, label: 'Sessão Pública e Lances' },
    { path: '/register/impugnacoes', icon: AlertOctagon, label: 'Recurso' },
    { path: '/register/diligencia', icon: FileSearch, label: 'Diligência' },
    { path: '/register/concorrencia', icon: Gavel, label: 'Concorrência' },
    { path: '/register/prova-conceito', icon: Cpu, label: 'Prova de Conceito' },
    { path: '/register/atas-classificacao', icon: ListOrdered, label: 'Atas e Classificação' },
    { path: '/register/homologacao-contrato', icon: FileSignature, label: 'Homologação e Contrato' },
    { path: '/register/pos-venda-booking', icon: BookmarkCheck, label: 'Pós-Venda e Entrega' },
  ];

  const pesquisasSubItems = [
    { path: '/find', icon: Search, label: 'Buscar' },
    { path: '/find/automation', icon: Zap, label: 'Automatizar' },
  ];

  return (
    <aside className="w-64 bg-[#f8fafc] border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-50 overflow-y-auto">
      <div className="p-6 flex items-center justify-center sticky top-0 bg-[#f8fafc] z-10 border-b border-slate-100 mb-4">
        <Link to="/" className="hover:opacity-90 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Logo com tons de vermelho escuro (Dark Red tones) */}
              <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-950 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 ring-2 ring-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 5V11C4 16.19 7.41 21.05 12 22.5C16.59 21.05 20 16.19 20 11V5L12 2ZM12 11.5L16.5 9.25V11C16.5 13.97 14.58 16.71 12 17.65V11.5Z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-800 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-800 tracking-tighter leading-none">
                Licita<span className="text-red-800">Red</span>
              </span>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 bg-slate-100 px-1 rounded">
                Gestão Inteligente
              </span>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 pb-8">
        <Link to="/" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/') ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><LayoutDashboard size={18} /> Home</Link>
        
        <div className="space-y-1">
          <button onClick={() => setIsPesquisasOpen(!isPesquisasOpen)} className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${location.pathname.startsWith('/find') ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
            <div className="flex items-center gap-3"><Search size={18} /> Pesquisas</div>
            <div className={`transition-transform duration-200 ${isPesquisasOpen ? 'rotate-180' : ''}`}><ChevronDown size={14} /></div>
          </button>
          {isPesquisasOpen && (
            <div className="pl-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {pesquisasSubItems.map((sub) => (
                <Link key={sub.path} to={sub.path} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] font-bold transition-all leading-tight ${isActive(sub.path) ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}>
                  <sub.icon size={13} /> {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/selected" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/selected') ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><BookmarkCheck size={18} /> Selecionados</Link>

        <div className="space-y-1">
          <button onClick={() => setIsRegisterOpen(!isRegisterOpen)} className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${location.pathname.startsWith('/register') ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}>
            <div className="flex items-center gap-3"><PlusSquare size={18} /> Andamento</div>
            <div className={`transition-transform duration-200 ${isRegisterOpen ? 'rotate-180' : ''}`}><ChevronDown size={14} /></div>
          </button>
          {isRegisterOpen && (
            <div className="pl-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {registerSubItems.map((sub) => (
                <Link key={sub.path} to={sub.path} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] font-bold transition-all leading-tight ${isActive(sub.path) ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}>
                  <sub.icon size={13} /> {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/dispute" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/dispute') ? 'bg-blue-50 text-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><Zap size={18} /> Disputar</Link>
        <Link to="/monitor" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/monitor') ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><Activity size={18} /> Monitorar</Link>
        <Link to="/audit" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/audit') ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><ShieldCheck size={18} /> Auditoria</Link>
        <Link to="/previous" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive('/previous') ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}><History size={18} /> Anteriores</Link>
      </nav>

      <div className="p-4 border-t border-slate-200 mt-auto bg-[#f8fafc]">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-blue-600 mb-2">
          <Settings size={18} /> <span className="text-sm font-bold">Configurações</span>
        </Link>
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">RE</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">reinaldo@wk3.com.br</p>
          </div>
          <button className="text-slate-400 hover:text-rose-500"><LogOut size={16}/></button>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ editais, active, onSelect }: { editais: Edital[], active: Edital, onSelect: (e: Edital) => void }) => (
  <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 flex items-center justify-between px-8 z-40 shadow-sm">
    <div className="flex items-center gap-8">
      {/* Empresa Operadora (Tenant) */}
      <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-sm">
          <Building size={16} />
        </div>
        <div>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block leading-none">Empresa em Operação</span>
          <span className="text-xs font-black text-slate-800 uppercase tracking-tight">WK3 Soluções Digitais Ltda</span>
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200"></div>

      <div className="flex items-center gap-3">
        <div className="bg-slate-100 p-2 rounded-lg text-slate-500"><Briefcase size={18} /></div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Edital Selecionado</span>
          <select 
            className="bg-transparent text-sm font-black text-slate-800 outline-none border-none cursor-pointer hover:text-blue-600 transition-colors"
            value={active.id}
            onChange={(e) => onSelect(editais.find(ed => ed.id === e.target.value)!)}
          >
            {editais.map(ed => (
              <option key={ed.id} value={ed.id}>{ed.cliente}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
        <Target size={14} className="text-blue-500" /> UASG: {active.uasg}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Conectado
        </div>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [activeEdital, setActiveEdital] = useState<Edital>(editaisMock[0]);

  return (
    <EditalContext.Provider value={{ activeEdital, setActiveEdital }}>
      <Router>
        <div className="flex min-h-screen bg-[#f1f5f9]">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header editais={editaisMock} active={activeEdital} onSelect={setActiveEdital} />
            <main className="pt-24 px-8 pb-12 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/find" element={<SearchBids />} />
                <Route path="/find/automation" element={<AutomationPage />} />
                <Route path="/selected" element={<SelectedBids />} />
                <Route path="/register" element={<RegisterAssets />} />
                <Route path="/register/:type" element={<RegisterAssets />} />
                <Route path="/dispute" element={<DisputeRobot />} />
                <Route path="/monitor" element={<Monitor />} />
                <Route path="/audit" element={<AuditTimeline />} />
                <Route path="/previous" element={<PreviousBids />} />
                <Route path="/portals" element={<PortalStatusGrid />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </EditalContext.Provider>
  );
};

export default App;
