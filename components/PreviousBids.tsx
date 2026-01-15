
import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Landmark, User, 
  CalendarDays, FileSearch, History, Files,
  CheckCircle2, XCircle, Ban, Octagon, MessageSquareQuote,
  ChevronRight, ExternalLink, Download
} from 'lucide-react';

type PreviousStatus = 'Vencido' | 'Perdido' | 'Cancelado' | 'Abandonado';

interface PreviousBid {
  id: string;
  portal: string;
  numero: string;
  uasg: string;
  responsavel: string;
  dataConclusao: string;
  orgao: string;
  objeto: string;
  localidade: string;
  status: PreviousStatus;
  justificativa: string;
}

const mockPrevious: PreviousBid[] = [
  {
    id: 'p1',
    portal: 'ComprasNet',
    numero: '45/2024',
    uasg: '120001',
    responsavel: 'Reinaldo Cavassena',
    dataConclusao: '15/01/2025',
    orgao: 'Ministério da Defesa',
    objeto: 'Aquisição de suprimentos de rede e equipamentos de switch core para modernização do datacenter principal localizado em Brasília.',
    localidade: 'Brasília - DF',
    status: 'Vencido',
    justificativa: 'Ganhamos no lance final após desclassificação do segundo colocado por falta de atestado técnico de capacidade operacional.'
  },
  {
    id: 'p2',
    portal: 'BEC/SP',
    numero: '112/2024',
    uasg: '925001',
    responsavel: 'Thaissa Danielle',
    dataConclusao: '10/12/2024',
    orgao: 'Secretaria da Saúde - SP',
    objeto: 'Contratação de empresa para fornecimento e instalação de sistemas de monitoramento por imagem para hospitais regionais.',
    localidade: 'São Paulo - SP',
    status: 'Perdido',
    justificativa: 'O concorrente apresentou uma margem agressiva de 15% abaixo do nosso preço de custo, tornando a disputa inviável.'
  },
  {
    id: 'p3',
    portal: 'ComprasNet',
    numero: '09/2024',
    uasg: '200010',
    responsavel: 'Marcos Viana',
    dataConclusao: '05/11/2024',
    orgao: 'IBAMA',
    objeto: 'Serviços de manutenção preventiva e corretiva em aeronaves não tripuladas (Drones) para fiscalização ambiental.',
    localidade: 'Manaus - AM',
    status: 'Cancelado',
    justificativa: 'O órgão revogou o processo por motivos de conveniência administrativa e readequação orçamentária para o exercício.'
  },
  {
    id: 'p4',
    portal: 'Licitações-e',
    numero: '221/2024',
    uasg: '001002',
    responsavel: 'Giovanna Oliveira',
    dataConclusao: '20/10/2024',
    orgao: 'Banco do Brasil',
    objeto: 'Licenciamento de software para gestão de ativos fixos e integração com sistemas legados de contabilidade bancária.',
    localidade: 'Rio de Janeiro - RJ',
    status: 'Abandonado',
    justificativa: 'Decidimos não prosseguir devido a uma alteração nas exigências técnicas que exigiria um parceiro internacional não disponível.'
  }
];

const PreviousBids: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusConfig = (status: PreviousStatus) => {
    switch (status) {
      case 'Vencido': 
        return { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: <CheckCircle2 size={12} /> };
      case 'Perdido': 
        return { color: 'bg-rose-50 text-rose-600 border-rose-100', icon: <XCircle size={12} /> };
      case 'Cancelado': 
        return { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: <Ban size={12} /> };
      case 'Abandonado': 
        return { color: 'bg-slate-100 text-slate-500 border-slate-200', icon: <Octagon size={12} /> };
      default: 
        return { color: 'bg-slate-50 text-slate-400 border-slate-100', icon: null };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Licitações Anteriores</h1>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Histórico completo de participações e resultados</p>
        </div>
        <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-2">
          <History size={18} className="text-slate-400" />
          <span className="text-xs font-black uppercase tracking-widest">{mockPrevious.length} Registros Históricos</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar histórico (Justificativa, Nº Edital, Órgão...)"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
          <Filter size={16} /> Status
        </button>
      </div>

      <div className="space-y-6">
        {mockPrevious.map((bid) => {
          const statusCfg = getStatusConfig(bid.status);
          return (
            <div key={bid.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all group">
              <div className="p-8 space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                        {bid.portal}
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
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 ${statusCfg.color}`}>
                    {statusCfg.icon}
                    {bid.status}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                        <FileSearch size={14} /> Resumo do Objeto
                      </div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
                        {bid.objeto.length > 200 ? bid.objeto.substring(0, 197) + '...' : bid.objeto}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 border-l-4 border-l-slate-300">
                       <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase mb-2">
                         <MessageSquareQuote size={14} className="text-slate-400" /> Justificativa Resumo
                       </div>
                       <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight italic">
                         "{bid.justificativa}"
                       </p>
                    </div>
                  </div>

                  <div className="w-full md:w-56 space-y-4">
                    <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-3">
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Responsável pela ação</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-600">
                            {bid.responsavel.substring(0, 2).toUpperCase()}
                          </div>
                          <p className="text-xs font-black text-slate-800 uppercase">{bid.responsavel}</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <CalendarDays size={10} /> Data Conclusão
                        </p>
                        <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">{bid.dataConclusao}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                  <button className="flex-1 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <History size={16} className="text-blue-600" /> Time Line do processo
                  </button>
                  <button className="flex-1 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Files size={16} className="text-indigo-600" /> Documentos do Processo
                  </button>
                  <button className="flex-1 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <Download size={16} className="text-emerald-600" /> Exportar Documentação
                  </button>
                  <button className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousBids;
