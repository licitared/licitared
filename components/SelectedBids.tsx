
import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Building2, User, 
  ExternalLink, Ban, AlertCircle, BookmarkCheck,
  ChevronRight, MoreHorizontal, FileSearch, ShieldAlert,
  Landmark, CalendarDays, Banknote, Clock, Gavel
} from 'lucide-react';

interface SelectedBid {
  id: string;
  portal: string;
  numero: string;
  uasg: string;
  responsavel: string;
  dataSelecao: string;
  orgao: string;
  objeto: string;
  localidade: string;
  status: 'Andamento' | 'Suspenso';
  valorPrevisto: string;
  dataPregao: string;
  tipo: 'Pregão' | 'Dispensa' | 'Concorrência';
}

const mockSelected: SelectedBid[] = [
  {
    id: '1',
    portal: 'ComprasNet',
    numero: '90027/2025',
    uasg: '110792',
    responsavel: 'Thaissa Danielle',
    dataSelecao: '25/10/2025',
    orgao: 'AGU - Advocacia Geral da União',
    objeto: 'Contratação de Solução redundante de nuvem dedicada Oracle Exadata Cloud at Customer (ExaCC), na versão X11M ou superior, incluindo Oracle PaaS e IaaS Universal Credit por demanda.',
    localidade: 'Brasília - DF',
    status: 'Andamento',
    valorPrevisto: 'R$ 19.257.923,54',
    dataPregao: '13/11/2025',
    tipo: 'Pregão'
  },
  {
    id: '2',
    portal: 'BEC/SP',
    numero: '045/2024',
    uasg: '925001',
    responsavel: 'Reinaldo Cavassena',
    dataSelecao: '18/10/2024',
    orgao: 'SESC SP - Serviço Social do Comércio',
    objeto: 'Registro de Preços para aquisição de materiais médicos hospitalares (cateteres, agulhas e seringas) para atendimento das unidades do SESC no estado de São Paulo.',
    localidade: 'São Paulo - SP',
    status: 'Suspenso',
    valorPrevisto: 'R$ 450.000,00',
    dataPregao: '28/10/2024',
    tipo: 'Dispensa'
  },
  {
    id: '3',
    portal: 'ComprasNet',
    numero: '112/2025',
    uasg: '300010',
    responsavel: 'Marcos Viana',
    dataSelecao: '12/01/2025',
    orgao: 'ANP - Agência Nacional do Petróleo',
    objeto: 'Prestação de serviços técnicos especializados de atendimento ao usuário de TI (Service Desk) com suporte local e remoto para a Agência Nacional do Petróleo.',
    localidade: 'Rio de Janeiro - RJ',
    status: 'Andamento',
    valorPrevisto: 'R$ 5.800.000,00',
    dataPregao: '15/01/2025',
    tipo: 'Concorrência'
  }
];

const SelectedBids: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Licitações Selecionadas</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Gestão de editais favoritados para participação</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl border border-blue-100 flex items-center gap-2">
          <BookmarkCheck size={18} className="fill-current" />
          <span className="text-xs font-black uppercase tracking-widest">{mockSelected.length} Editais no Radar</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar em selecionados (Nº Edital, Objeto, UASG...)"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
          <Filter size={16} /> Filtrar
        </button>
      </div>

      <div className="space-y-6">
        {mockSelected.map((bid) => (
          <div key={bid.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all group">
            <div className="p-8 space-y-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                      {bid.portal}
                    </span>
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Gavel size={12} className="text-slate-400" />
                      {bid.tipo}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                      Edital {bid.numero} <span className="text-slate-400 font-bold ml-1">• UASG {bid.uasg}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {bid.localidade}</div>
                    <div className="flex items-center gap-1.5"><Landmark size={14} className="text-indigo-500" /> {bid.orgao}</div>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 ${
                  bid.status === 'Andamento' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${bid.status === 'Andamento' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                  {bid.status}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase">
                    <FileSearch size={14} className="text-slate-400" /> Resumo do Objeto
                  </div>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
                    {bid.objeto.length > 200 ? bid.objeto.substring(0, 197) + '...' : bid.objeto}
                  </p>
                </div>
                <div className="w-full md:w-64 space-y-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Responsável</p>
                        <p className="text-xs font-black text-slate-800 uppercase leading-none truncate">{bid.responsavel}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200/60 space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Banknote size={10} className="text-emerald-500" /> Valor Previsto
                          </p>
                          <p className="text-[10px] font-black text-emerald-600 uppercase leading-none">{bid.valorPrevisto}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={10} className="text-indigo-500" /> Data Pregão
                          </p>
                          <p className="text-[10px] font-bold text-slate-700 uppercase leading-none">{bid.dataPregao}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <CalendarDays size={10} className="text-blue-500" /> Seleção
                          </p>
                          <p className="text-[10px] font-bold text-blue-600 uppercase leading-none">{bid.dataSelecao}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <button className="flex-1 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Visualizar Edital
                </button>
                <button className="flex-1 bg-amber-50 text-amber-600 border border-amber-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center justify-center gap-2">
                  <ShieldAlert size={16} /> Suspender Participação
                </button>
                <button className="flex-1 bg-rose-50 text-rose-600 border border-rose-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  <Ban size={16} /> Cancelar Participação
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedBids;
