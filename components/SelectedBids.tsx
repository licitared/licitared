
import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Building2, User, 
  ExternalLink, Ban, AlertCircle, BookmarkCheck,
  ChevronRight, MoreHorizontal, FileSearch, ShieldAlert,
  Landmark, CalendarDays, Banknote, Clock, Gavel,
  ShieldCheck, Info, Link as LinkIcon, FileText, Globe, 
  HelpCircle, Receipt, Save, Upload, Plus, History,
  FilePlus, AlertTriangle, FileUp, Database, Zap, Calendar
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
  }
];

const SelectedBids: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegForm, setShowRegForm] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Licitações Selecionadas</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Gestão de editais favoritados para participação</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setShowRegForm(!showRegForm)}
                className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
            >
                {showRegForm ? 'Ocultar Cadastro' : 'Novo Cadastro'}
            </button>
            <div className="bg-blue-50 text-blue-600 px-4 py-2.5 rounded-2xl border border-blue-100 flex items-center gap-2">
                <BookmarkCheck size={18} className="fill-current" />
                <span className="text-xs font-black uppercase tracking-widest">{mockSelected.length} Radar</span>
            </div>
        </div>
      </div>

      {/* BLOCO DE CADASTRAMENTO - BASEADO NA IMAGEM */}
      {showRegForm && (
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-700">
          <div className="bg-slate-900 px-10 py-6 text-white flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg">
                <FilePlus size={20} />
              </div>
              <h2 className="text-lg font-black uppercase tracking-widest">Ficha Técnica de Cadastramento</h2>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocolo Automatizado v1.4</span>
          </div>

          <div className="p-10 space-y-10">
            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* COLUNA ESQUERDA: DADOS DO PROCESSO */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <MapPin size={14} className="text-blue-500" /> Local*
                    </label>
                    <input type="text" placeholder="Ex: Marabá/PA" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Landmark size={14} className="text-indigo-500" /> Órgão*
                    </label>
                    <input type="text" placeholder="Ex: MUNICIPIO DE MARABA" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Building2 size={14} className="text-amber-500" /> Unidade Compradora*
                    </label>
                    <input type="text" placeholder="Ex: 929648 - SERVIÇO DE SANEAMENTO AMBIENTAL..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Gavel size={14} className="text-blue-600" /> Modalidade de Contratação*
                    </label>
                    <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                      <option>Pregão - Eletrônico</option>
                      <option>Dispensa - Eletrônica</option>
                      <option>Concorrência</option>
                      <option>Leilão</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <ShieldCheck size={14} className="text-emerald-500" /> Amparo Legal*
                    </label>
                    <input type="text" placeholder="Ex: Lei 14.133/2021, Art. 28, I" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Receipt size={14} className="text-rose-500" /> Modo de Disputa*
                    </label>
                    <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                      <option>Aberto-Fechado</option>
                      <option>Aberto</option>
                      <option>Fechado</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Database size={14} className="text-blue-400" /> Registro de Preço
                    </label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-all">
                           <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></div>
                        </div>
                        <span className="text-xs font-black text-slate-600 uppercase">Sim</span>
                        <input type="radio" name="rp" className="hidden" defaultChecked />
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-lg flex items-center justify-center group-hover:border-blue-500 transition-all"></div>
                        <span className="text-xs font-black text-slate-600 uppercase">Não</span>
                        <input type="radio" name="rp" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* DATAS - CRONOGRAMA AJUSTADO */}
                <div className="bg-slate-50/50 rounded-[32px] border border-slate-200 p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-600" />
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Cronograma do Processo</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-rose-400 uppercase tracking-widest block">Prazo Final Envio Proposta*</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" />
                        <input type="datetime-local" defaultValue="2025-10-23T09:00" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-rose-500/20" />
                      </div>
                    </div>
                    <div className="space-y-2 bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                      <label className="text-[9px] font-black text-amber-600 uppercase tracking-widest block flex items-center gap-1.5">
                        <HelpCircle size={12} /> Prazo Final Questionamento*
                      </label>
                      <input type="datetime-local" defaultValue="2025-10-18T17:00" className="w-full px-2 py-2 bg-white border border-amber-200 rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest block">Início da Disputa (Lances)*</label>
                      <div className="relative">
                        <Zap size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
                        <input type="datetime-local" defaultValue="2025-10-23T10:00" className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEXTAREAS */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Objeto do Edital*</label>
                    <textarea 
                      rows={3} 
                      placeholder="Descrição completa do objeto..." 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[24px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Informação Complementar (Link Externo)</label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" placeholder="https://..." className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA: VALORES E UPLOAD */}
              <div className="lg:col-span-4 space-y-8">
                {/* BLOCO DE VALOR - COR CYAN CONFORME IMAGEM */}
                <div className="bg-[#4dd0e1] rounded-[32px] p-8 text-white shadow-xl shadow-cyan-100/50 flex flex-col justify-between min-h-[200px] relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                    <Receipt size={64} className="rotate-12" />
                  </div>
                  <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-tight">Valor Total Estimado da Compra</p>
                    <div className="h-px bg-white/20 w-12 my-2"></div>
                  </div>
                  <div className="relative z-10">
                    <input 
                        type="text" 
                        defaultValue="R$ 3.217.295,20" 
                        className="bg-transparent border-none text-3xl font-black tracking-tight leading-none w-full outline-none focus:ring-0 p-0 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                {/* ID PNCP E FONTE */}
                <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-6">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ID Contratação PNCP</p>
                    <input type="text" placeholder="Ex: 05853163000..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black text-blue-400 outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fonte de Disputa</p>
                    <input type="text" placeholder="Ex: Compras.gov.br" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black text-white outline-none focus:border-blue-500" />
                  </div>
                </div>

                {/* UPLOAD DE ARQUIVOS */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Anexar Documentação do Edital</p>
                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-[32px] p-8 text-center group hover:bg-blue-100/50 hover:border-blue-400 transition-all cursor-pointer">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                            <FileUp size={28} />
                        </div>
                        <h4 className="text-xs font-black text-slate-700 uppercase tracking-tight">Arraste seu PDF aqui</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">ou clique para selecionar (Máx. 20MB)</p>
                    </div>
                </div>
              </div>
            </div>

            {/* AÇÕES FINAIS DO CADASTRO */}
            <div className="pt-10 border-t border-slate-100 flex justify-end gap-4">
              <button onClick={() => setShowRegForm(false)} className="px-10 py-4 bg-white border border-slate-200 text-slate-400 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                Cancelar
              </button>
              <button className="px-16 py-4 bg-blue-600 text-white rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <Save size={18} /> Salvar e Iniciar Participação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILTROS EXISTENTES */}
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

      {/* LISTAGEM EXISTENTE */}
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
