
import React from 'react';
import { History, User, Database, ArrowRight, ShieldCheck, Search } from 'lucide-react';

const mockLogs = [
  {
    id: '1',
    timestamp: '2023-12-12 14:30:05',
    user: 'Carlos Alberto (ID: 0042)',
    action: 'UPDATE',
    table: 'configuracoes_disputa',
    old: { valor_minimo: 1200.00, estrategia: 'TOP_3' },
    new: { valor_minimo: 1000.00, estrategia: 'BEST_POSITION' }
  },
  {
    id: '2',
    timestamp: '2023-12-12 14:28:12',
    user: 'Sistema (Automação)',
    action: 'INSERT',
    table: 'lances',
    old: null,
    new: { valor: 1450.00, id_licitacao: 'LIC-009' }
  },
  {
    id: '3',
    timestamp: '2023-12-12 13:15:00',
    user: 'Maria Clara (ID: 0101)',
    action: 'DELETE',
    table: 'documentos',
    old: { tipo: 'Certidão Negativa', validade: '2023-12-31' },
    new: null
  }
];

const AuditTimeline: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Auditoria Forense</h1>
          <p className="text-slate-500 mt-1">Rastreamento completo de todas as alterações via banco de dados.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filtrar por usuário ou tabela..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Database size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
        <ShieldCheck className="text-emerald-600" size={24} />
        <div className="text-sm">
          <span className="font-bold text-emerald-800">Assinatura de Integridade Ativa:</span>
          <p className="text-emerald-700">Todos os logs são imutáveis e capturados via Triggers nativos do PostgreSQL.</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
        <div className="space-y-8">
          {mockLogs.map((log) => (
            <div key={log.id} className="relative pl-20 group">
              <div className="absolute left-6 top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-600 z-10 group-hover:scale-125 transition-transform"></div>
              
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action === 'UPDATE' ? 'bg-amber-100 text-amber-700' : 
                      log.action === 'INSERT' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {log.action}
                    </div>
                    <span className="text-xs font-bold text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User size={14} />
                    {log.user}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Database size={14} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{log.table}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Estado Anterior</span>
                    {log.old ? (
                       <pre className="text-[11px] text-slate-600 overflow-x-auto">
                        {JSON.stringify(log.old, null, 2)}
                       </pre>
                    ) : (
                      <span className="text-xs italic text-slate-400">Nenhum dado</span>
                    )}
                  </div>
                  <div className="relative">
                    <ArrowRight size={20} className="absolute -left-6 top-1/2 -translate-y-1/2 text-slate-300 hidden md:block" />
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Novo Estado</span>
                    {log.new ? (
                      <pre className="text-[11px] text-emerald-700 font-medium overflow-x-auto">
                        {JSON.stringify(log.new, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-xs italic text-slate-400">Dados removidos</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditTimeline;
