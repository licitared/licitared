
import React from 'react';
import { Activity, Radio, PlayCircle, PauseCircle } from 'lucide-react';

const Monitor: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Monitoramento em Tempo Real</h1>
          <p className="text-slate-500 mt-1">Acompanhe suas disputas ativas e lances do robô.</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-500/20">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          CONECTADO AOS PORTAIS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border-2 border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Radio size={16} className="text-rose-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Pregão 00{i}/23 - SESC SP</span>
              </div>
              <div className="bg-emerald-500 text-[10px] px-2 py-0.5 rounded font-black">ATIVO</div>
            </div>

            <div className="p-6 space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Seu Último Lance</p>
                  <p className="text-xl font-black text-slate-900">R$ 1.420,00</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-400 uppercase">Lance Vencedor</p>
                  <p className="text-xl font-black text-blue-600">R$ 1.419,00</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Sua Posição Atual</span>
                  <span className="font-black text-amber-600">2º LUGAR</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[85%] rounded-full"></div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-y-auto space-y-2">
                <p className="text-[10px] text-slate-400 font-bold mb-2">LOG DE EVENTOS (ROBÔ)</p>
                <div className="flex gap-2 items-start">
                  <span className="text-[10px] text-slate-400 mt-0.5">14:30:12</span>
                  <p className="text-[11px] text-slate-700 font-medium leading-tight">Lance detectado de R$ 1.419,00. Calculando reação...</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[10px] text-slate-400 mt-0.5">14:30:15</span>
                  <p className="text-[11px] text-blue-600 font-bold leading-tight">Robô enviou lance de R$ 1.418,00 (Respeitando margem de 0.1%)</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
               <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                <PauseCircle size={16} />
                Pausar Robô
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                Intervir Manualmente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitor;
