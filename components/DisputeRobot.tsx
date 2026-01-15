
import React, { useState } from 'react';
import { Zap, Shield, Target, MousePointer2, Settings2, Power, History, Info, ChevronDown } from 'lucide-react';

const DisputeRobot: React.FC = () => {
  const [activeTab, setActiveTab] = useState('config');

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#1e293b] uppercase tracking-tighter">Configurações de Disputa</h1>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <History size={16} /> Histórico
          </button>
          <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-100">
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-10 space-y-12">
          {/* Estratégias Exclusivas */}
          <section className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-4">Exclusivos do modo Aberto/Fechado</h3>
            <div className="space-y-4">
              {[
                { label: 'Excluir o seguinte colocado', desc: 'O robô efetuará um lance que eliminará o colocado selecionado.', input: true },
                { label: 'Distância máxima (%) do 1º colocado', desc: 'Determine o percentual máximo de distância do valor do 1º lugar.', input: true, val: '10,00' },
                { label: 'Ficar entre os três primeiros (top 3)', desc: 'O robô tentará ficar na melhor posição entre os 3 primeiros.' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.label}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  {item.input && (
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button className="px-3 py-1 bg-slate-50 text-slate-400 font-black">-</button>
                      <input type="text" value={item.val || '4'} className="w-16 text-center text-sm font-bold bg-white outline-none" readOnly />
                      <button className="px-3 py-1 bg-slate-50 text-slate-400 font-black">+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Configurações de Lances */}
          <section className="space-y-8 pt-8 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Variação de Redução por Lance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase">Tipo de Redução</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold appearance-none outline-none">
                    <option>Valor (R$)</option>
                    <option>Percentual (%)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase">Variação Mínima</label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button className="px-3 py-2 text-slate-400">-</button>
                  <input type="text" value="0,01" className="flex-1 text-center text-sm font-bold bg-transparent outline-none" />
                  <button className="px-3 py-2 text-slate-400">+</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase">Variação Máxima</label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button className="px-3 py-2 text-slate-400">-</button>
                  <input type="text" value="0,01" className="flex-1 text-center text-sm font-bold bg-transparent outline-none" />
                  <button className="px-3 py-2 text-slate-400">+</button>
                </div>
              </div>
            </div>
          </section>

          {/* Prorrogação Automática */}
          <section className="space-y-6 pt-8 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-500 pl-4">Prorrogação Automática</h3>
            <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Enviar lance faltando:</span>
              <div className="flex gap-2">
                <div className="flex items-center border border-slate-200 rounded bg-white"><input type="number" defaultValue={1} className="w-12 text-center text-sm font-bold" /></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase self-center">Minutos</span>
                <div className="flex items-center border border-slate-200 rounded bg-white"><input type="number" defaultValue={45} className="w-12 text-center text-sm font-bold" /></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase self-center">Segundos</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisputeRobot;
