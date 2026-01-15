
import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Building2, ExternalLink, 
  Activity, ChevronDown, Tag, Globe, Landmark, Trash2 
} from 'lucide-react';

const SearchBids: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Bloco de Busca: Repositório de Licitações */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
                <Search size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Repositório de Licitações</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">Varredura Inteligente Ativa</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Tipo */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-xs">Tipo de Processo</label>
              <div className="relative">
                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                  <option value="">Todos os Tipos</option>
                  <option>Licitação</option>
                  <option>Dispensa</option>
                  <option>Concorrência</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Palavras Chaves - OBRIGATÓRIO */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 text-xs">Palavras-Chaves* (Obrigatório)</label>
              <div className="relative">
                <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ex: Oracle, TI, Material Médico, Construção..." 
                  className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-300" 
                />
              </div>
            </div>

            {/* Órgãos */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-xs">Órgãos / UASG</label>
              <div className="relative">
                <Landmark size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Nome do Órgão ou Código UASG..." 
                  className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-300" 
                />
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 text-xs">Estado (UF)</label>
              <div className="relative">
                <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                  <option value="">Brasil (Todos)</option>
                  {estados.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-slate-50">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-500 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
              <Trash2 size={16} /> Limpar
            </button>
            <button 
              disabled={!keyword}
              className={`flex items-center gap-2 px-12 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-100 ${
                keyword 
                  ? 'bg-blue-600 text-white hover:scale-105 active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Search size={18} /> Pesquisar Editais
            </button>
          </div>
        </div>
      </div>

      {/* Listagem de Resultados */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Filter size={16} /> Encontradas 528 licitações para esta pesquisa
          </p>
          <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase">Busca com IA</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner shadow-blue-800">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
          </div>
        </div>
        
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer group">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">ComprasNet</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Postado em: 02/12/2025 08:31</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-500 uppercase flex flex-wrap items-center gap-2 leading-tight">
                    AGENCIA NACIONAL DO PETROLEO - ANP - RJ
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 rounded text-[10px] font-black text-slate-600 border border-slate-200">
                      <Building2 size={12} className="text-slate-400" /> UASG: 30001
                    </div>
                    <span className="text-blue-600 font-black text-sm tracking-widest">Edital: 90027/2025</span>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#1e293b] text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">Serviços Técnicos</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed uppercase tracking-tight line-clamp-2">
                    contratação de empresa especializada para prestação de serviços técnicos especializados de atendimento ao usuário de <span className="bg-blue-100 px-1 rounded text-blue-800">TI</span> (Information Technology), incluindo suporte local e remoto...
                  </p>
                </div>

                <div className="flex gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={16} className="text-blue-500" /> Rio de Janeiro - RJ
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Calendar size={16} className="text-indigo-500" /> Pregão: {i === 1 ? '13/11/2025' : '22/11/2025'}
                  </div>
                </div>
              </div>
              
              <div className="md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-50 pt-6 md:pt-0 md:pl-8">
                <button className="w-full bg-blue-600 text-white font-black py-3.5 rounded-2xl hover:bg-blue-700 text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2">
                  Selecionar Edital
                </button>
                <button className="w-full bg-white text-slate-700 border border-slate-200 font-black py-3.5 rounded-2xl hover:bg-slate-50 text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={14} /> Visualizar PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBids;
