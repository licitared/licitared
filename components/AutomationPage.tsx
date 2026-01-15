
import React, { useState } from 'react';
import { 
  Zap, Plus, Search, Mail, MessageSquare, Bell, Calendar, 
  Trash2, Edit3, PauseCircle, PlayCircle, Filter, 
  Building2, Tag, Clock, AlertCircle, ChevronDown, CheckCircle2,
  XCircle, Ban
} from 'lucide-react';

interface Automation {
  id: string;
  tipo: string;
  palavrasChaves: string;
  orgaos: string;
  envio: string[];
  periodicidade: string;
  status: 'Ligado' | 'Suspenso' | 'Cancelado';
  dataLimiteSuspensao?: string;
}

const AutomationPage: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      tipo: 'Licitação',
      palavrasChaves: 'Oracle, Exadata, Cloud',
      orgaos: 'AGU, STF, PGR',
      envio: ['Email', 'App'],
      periodicidade: '1x por dia',
      status: 'Ligado'
    },
    {
      id: '2',
      tipo: 'Dispensa',
      palavrasChaves: 'Material de Escritório, Papelaria',
      orgaos: 'Prefeituras SP',
      envio: ['WhatsApp'],
      periodicidade: '2x por dia',
      status: 'Suspenso',
      dataLimiteSuspensao: '2025-12-31'
    }
  ]);

  const getStatusBadge = (status: Automation['status']) => {
    switch (status) {
      case 'Ligado':
        return <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5"><PlayCircle size={12} /> Ligado</span>;
      case 'Suspenso':
        return <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5"><PauseCircle size={12} /> Suspenso</span>;
      case 'Cancelado':
        return <span className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5"><XCircle size={12} /> Cancelado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 text-white rounded-[24px] shadow-2xl shadow-blue-100 flex items-center justify-center">
            <Zap size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">Automação de Busca</h1>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">Configure alertas inteligentes e robôs de monitoramento</p>
          </div>
        </div>
      </div>

      {/* Formulário de Cadastro */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-10 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <Plus size={20} className="text-blue-600" />
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Nova Configuração de Alerta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tipo */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Processo*</label>
              <div className="relative">
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                  <option>Licitação</option>
                  <option>Dispensa</option>
                  <option>Concorrência</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Palavras Chaves */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Palavras-Chaves (Separadas por vírgula)*</label>
              <div className="relative">
                <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Ex: Software, TI, Consultoria..." className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            {/* Órgãos */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Filtrar por Órgãos / UASGs</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Ex: AGU, STF ou Código UASG..." className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            {/* Periodicidade */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Periodicidade de Varredura*</label>
              <div className="relative">
                <Clock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                  <option>1x por dia</option>
                  <option>2x por dia</option>
                  <option>de 2 em 2 dias</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Meios de Envio */}
            <div className="space-y-2 md:col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notificar via</label>
              <div className="flex gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Mail size={18} />
                  </div>
                  <input type="checkbox" className="hidden" />
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <MessageSquare size={18} />
                  </div>
                  <input type="checkbox" className="hidden" />
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                    <Bell size={18} />
                  </div>
                  <input type="checkbox" className="hidden" />
                </label>
              </div>
            </div>

            {/* Status Inicial */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status Inicial*</label>
              <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>Ligado</option>
                <option>Suspenso</option>
              </select>
            </div>

            {/* Data Limite Suspensão */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data Limite Suspensão (Opcional)</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="date" className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 transition-all flex items-center gap-2">
              <Zap size={18} className="fill-current" /> Ativar Automação
            </button>
          </div>
        </div>
      </div>

      {/* Listagem de Automações Ativas */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-3">
            <Filter size={20} className="text-blue-600" /> Automações Configuradas
          </h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{automations.length} Filtros Ativos</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {automations.map((auto) => (
            <div key={auto.id} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-6 flex-1 min-w-[300px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${auto.status === 'Ligado' ? 'bg-emerald-500' : auto.status === 'Suspenso' ? 'bg-amber-500' : 'bg-slate-400'}`}>
                  <Zap size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">{auto.tipo}</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{auto.palavrasChaves}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                      <Building2 size={12} /> {auto.orgaos}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                      <Clock size={12} /> {auto.periodicidade}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Envio */}
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Notificações</span>
                  <div className="flex gap-1.5">
                    {auto.envio.map((e) => (
                      <div key={e} className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-400" title={e}>
                        {e === 'Email' && <Mail size={14} />}
                        {e === 'WhatsApp' && <MessageSquare size={14} />}
                        {e === 'App' && <Bell size={14} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                  {getStatusBadge(auto.status)}
                </div>

                {/* Suspensão */}
                {auto.dataLimiteSuspensao && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Limite Suspensão</span>
                    <span className="text-[10px] font-black text-amber-600 uppercase flex items-center gap-1">
                      <Calendar size={12} /> {auto.dataLimiteSuspensao}
                    </span>
                  </div>
                )}

                {/* Ações */}
                <div className="flex items-center gap-2 pl-4 border-l border-slate-100">
                  <button title="Editar" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button title="Suspender" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all">
                    <PauseCircle size={18} />
                  </button>
                  <button title="Excluir" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
