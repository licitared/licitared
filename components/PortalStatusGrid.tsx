
import React from 'react';
import { Search, Filter, CheckCircle2, AlertCircle, StopCircle } from 'lucide-react';

const portals = [
  { name: 'ComprasNet', find: true, reg: true, disp: true, mon: true, status: 'OPERANTE' },
  { name: 'Licitações-e (portal antigo)', find: true, reg: true, disp: true, mon: true, status: 'OPERANTE' },
  { name: 'BLL', find: true, reg: 'INSTAVEL', disp: true, mon: 'INSTAVEL', status: 'INSTAVEL' },
  { name: 'Licitanet', find: true, reg: 'INSTAVEL', disp: 'PARADO', mon: 'INSTAVEL', status: 'PARADO' },
  { name: 'BNC', find: true, reg: 'INSTAVEL', disp: true, mon: true, status: 'INSTAVEL' },
  { name: 'Compras BR', find: true, reg: true, disp: false, mon: true, status: 'OPERANTE' },
];

const StatusBadge = ({ type }: { type: any }) => {
  if (type === 'OPERANTE' || type === true) return <span className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded font-black flex items-center gap-1"><CheckCircle2 size={10} /> OPERANTE</span>;
  if (type === 'INSTAVEL') return <span className="bg-amber-50 text-amber-600 text-[9px] px-1.5 py-0.5 rounded font-black flex items-center gap-1"><AlertCircle size={10} /> INSTÁVEL</span>;
  if (type === 'PARADO') return <span className="bg-rose-50 text-rose-600 text-[9px] px-1.5 py-0.5 rounded font-black flex items-center gap-1"><StopCircle size={10} /> PARADO</span>;
  return <span className="bg-slate-100 text-slate-400 text-[9px] px-1.5 py-0.5 rounded font-black">NÃO IMPLEM.</span>;
};

const PortalStatusGrid: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Status dos Portais</h1>
          <p className="text-sm text-slate-500 font-medium">Monitore a saúde técnica de cada integração em tempo real.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Filtrar portal..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((portal, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-300 transition-all">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-black text-slate-700 text-sm tracking-tight">{portal.name}</h3>
               <div className={`w-2.5 h-2.5 rounded-full ${portal.status === 'OPERANTE' ? 'bg-emerald-500' : portal.status === 'INSTAVEL' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4 flex-1">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Encontrar</p>
                <StatusBadge type={portal.find} />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Cadastrar</p>
                <StatusBadge type={portal.reg} />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Disputar</p>
                <StatusBadge type={portal.disp} />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1">Monitorar</p>
                <StatusBadge type={portal.mon} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortalStatusGrid;
