
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEdital } from '../App';
import { 
  Plus, Search, Download, Trash2, FileText, 
  BookOpen, Zap, Gavel, Landmark, Calendar, Clock, 
  PhoneCall, Phone, Mail, Newspaper, FileCheck, 
  TrendingUp, Cpu, Target, Briefcase, ShieldCheck, 
  MoreHorizontal, Edit3, ClipboardList, CheckCircle2, XCircle, FileSearch,
  Upload, ChevronLeft, Shield, ArrowRight,
  GitBranch, ChevronDown, ChevronUp, SearchCode, Building2,
  Calculator, ListOrdered, FileSignature, BookmarkCheck, FilePlus,
  BarChart3, AlertTriangle, Fingerprint, PieChart, Activity, AlertCircle,
  Scale, FileWarning, ExternalLink, UserCheck, HardDrive, Info, HelpCircle,
  Users2, Eye, MessageSquare, PackageSearch, FileLock2, Timer, BellRing,
  Save
} from 'lucide-react';

type DocStatus = 'VÁLIDA' | 'DRAFT' | 'ANTIGA' | 'INVÁLIDA' | 'CANCELADA';

interface DocumentVersion {
  id: string;
  versionLabel: string;
  name: string;
  date: string;
  size: string;
  responsible: string;
  status: DocStatus;
  validity?: string;
}

interface DocumentGroup {
  id: string;
  type: string;
  mainName: string;
  versions: DocumentVersion[];
  isExpanded?: boolean;
}

interface ViabilityItem {
  title: string;
  status: 'GO' | 'NO-GO';
  justificativa: string;
  dataAnalise: string;
  responsavel: string;
  confianca: number;
  impacto: 'Alto' | 'Médio' | 'Baixo';
  aprovadoPor: {
    nome: string;
    cargo: string;
  };
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

const RegisterAssets: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const { activeEdital } = useEdital();
  const [docGroups, setDocGroups] = useState<DocumentGroup[]>([]);
  const [editalFileGroups, setEditalFileGroups] = useState<DocumentGroup[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Dados de Viabilidade de Alta Fidelidade
  const viabilityData: ViabilityItem[] = [
    { 
      title: "Viabilidade Econômica", 
      status: "GO", 
      justificativa: "Margem líquida de 18.5% após impostos. Fluxo de caixa suporta pagamentos SIAFI. ROI estimado de 24% supera meta interna de 15%. Riscos inflacionários mitigados por cláusula de reajuste contratual.",
      dataAnalise: "16/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 95,
      impacto: 'Alto',
      aprovadoPor: { nome: "Sérgio Mendes", cargo: "CFO" }, 
      icon: <TrendingUp size={24} />,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50'
    },
    { 
      title: "Viabilidade Técnica", 
      status: "GO", 
      justificativa: "Equipe com 4 arquitetos Oracle OCP v21 atende requisito 7.2. Infraestrutura capaz de hosting. Atestados STF e PGR compatíveis em complexidade. Capacidade técnica validada pela engenharia.",
      dataAnalise: "16/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 92,
      impacto: 'Alto',
      aprovadoPor: { nome: "Cláudia Rocha", cargo: "CTO" }, 
      icon: <Cpu size={24} />,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50'
    },
    { 
      title: "Viabilidade Estratégica", 
      status: "GO", 
      justificativa: "Contrato crítico para Cloud Government federal. Impede avanço da concorrência na AGU e abre portas para órgãos vinculados. Alinhamento total com OKR 2025/2026 de expansão em infraestrutura.",
      dataAnalise: "17/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 88,
      impacto: 'Médio',
      aprovadoPor: { nome: "Roberto Silva", cargo: "Dir. Comercial" }, 
      icon: <Target size={24} />,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-50'
    },
    { 
      title: "Escopo & Capacidade", 
      status: "GO", 
      justificativa: "CNAE 62.01-1-00 cobre integralmente o objeto. Balanço auditado com liquidez corrente de 1.8 atende requisitos. Logística de entrega validada com parceiros locais em Brasília.",
      dataAnalise: "17/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 98,
      impacto: 'Alto',
      aprovadoPor: { nome: "Aline Souza", cargo: "Ger. Ops" }, 
      icon: <Briefcase size={24} />,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50'
    },
    { 
      title: "Compliance & Riscos", 
      status: "GO", 
      justificativa: "Background check limpo nos sistemas CEIS/CNEP/CEPIM. Jurídico validou penalidades. Risco de importação X11M classificado como médio, com plano de mitigação via estoque reserva estratégico.",
      dataAnalise: "18/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 90,
      impacto: 'Alto',
      aprovadoPor: { nome: "Marcos Viana", cargo: "Compliance" }, 
      icon: <ShieldCheck size={24} />,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50'
    },
    { 
      title: "Análise de Concorrência", 
      status: "GO", 
      justificativa: "Vantagem técnica em performance IOPS e latência zero contra Azure/AWS. Diferenciais decisivos para pontuação técnica máxima prevista no edital. Preço estimado altamente competitivo.",
      dataAnalise: "18/10/2025", 
      responsavel: "Reinaldo Cavassena", 
      confianca: 75,
      impacto: 'Médio',
      aprovadoPor: { nome: "Thiago Lima", cargo: "Pricing" }, 
      icon: <BarChart3 size={24} />,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50'
    }
  ];

  const isGlobalGo = viabilityData.every(item => item.status === 'GO');

  const sectionsMap: Record<string, { title: string; subtitle: string; icon: React.ReactNode; color: string }> = {
    'edital-referencia': { 
      title: 'Dossiê do Edital', 
      subtitle: 'Repositório de Inteligência Forense',
      icon: <BookOpen size={28} />,
      color: 'bg-blue-600'
    },
    'inteligencia-viabilidade': { 
      title: 'Inteligência e Viabilidade', 
      subtitle: 'Análise de Go/No-Go e Estratégia',
      icon: isGlobalGo ? <CheckCircle2 size={28} className="text-emerald-400" /> : <XCircle size={28} className="text-rose-400" />,
      color: 'bg-slate-900'
    },
    'orcamentacao-parceiros': { 
      title: 'Orçamentação e Parceiros', 
      subtitle: 'Gestão de Custos e Alianças',
      icon: <Building2 size={28} />,
      color: 'bg-amber-500'
    },
    'proposta-comercial': { 
      title: 'Proposta Comercial', 
      subtitle: 'Configuração de Preços e Prazos',
      icon: <Calculator size={28} />,
      color: 'bg-emerald-600'
    },
    'habilitacao-declaracoes': { 
      title: 'Habilitação e Declarações', 
      subtitle: 'Conformidade Documental e Jurídica',
      icon: <ShieldCheck size={28} />,
      color: 'bg-indigo-600'
    },
    'sessao-lances': { 
      title: 'Sessão Pública e Lances', 
      subtitle: 'Monitoramento da Disputa em Tempo Real',
      icon: <Zap size={28} />,
      color: 'bg-rose-600'
    },
    'atas-classificacao': { 
      title: 'Atas e Classificação', 
      subtitle: 'Resultados e Transparência do Processo',
      icon: <ListOrdered size={28} />,
      color: 'bg-purple-600'
    },
    'concorrencia': { 
      title: 'Concorrência e Prova de Conceito', 
      subtitle: 'Análise e Gestão de Concorrência',
      icon: <Gavel size={28} />,
      color: 'bg-slate-700'
    },
    'homologacao-contrato': { 
      title: 'Homologação e Contrato', 
      subtitle: 'Formalização e Assinaturas',
      icon: <FileSignature size={28} />,
      color: 'bg-teal-600'
    },
    'pos-venda-booking': { 
      title: 'Pós-Venda e Entrega', 
      subtitle: 'Acompanhamento de OS e Satisfação',
      icon: <BookmarkCheck size={28} />,
      color: 'bg-pink-600'
    }
  };

  const currentSection = sectionsMap[type || 'edital-referencia'] || sectionsMap['edital-referencia'];

  useEffect(() => {
    setEditalFileGroups([
      {
        id: 'ef1',
        type: 'Edital',
        mainName: 'Edital de Pregão Eletrônico',
        isExpanded: true,
        versions: [
          { id: 'ev1.1', versionLabel: 'v1.1', name: 'EDITAL_PREGAO_90027_2025_RETIFICADO.pdf', date: '20/10/2025', size: '2.5 MB', responsible: 'Sistema', status: 'VÁLIDA' },
          { id: 'ev1.0', versionLabel: 'v1.0', name: 'EDITAL_PREGAO_90027_2025.pdf', date: '15/10/2025', size: '2.4 MB', responsible: 'Sistema', status: 'ANTIGA' },
        ]
      }
    ]);

    if (type === 'inteligencia-viabilidade') {
      setDocGroups([
        {
          id: 'g1',
          type: 'Viabilidade Econômica',
          mainName: 'Relatório de Margem e Fluxo de Caixa',
          isExpanded: true,
          versions: [
            { id: 'v1.1', versionLabel: 'v2.0', name: 'RELATORIO_FINANCEIRO_PROJETADO_V2.pdf', date: '16/10/2025', size: '850 KB', responsible: 'Reinaldo Cavassena', status: 'VÁLIDA' },
          ]
        }
      ]);
    }
  }, [type]);

  const toggleGroup = (groupId: string, section: 'viability' | 'edital') => {
    if (section === 'viability') {
      setDocGroups(prev => prev.map(g => g.id === groupId ? { ...g, isExpanded: !g.isExpanded } : g));
    } else {
      setEditalFileGroups(prev => prev.map(g => g.id === groupId ? { ...g, isExpanded: !g.isExpanded } : g));
    }
  };

  const handleUploadClick = () => setIsUploading(true);
  const handleBack = () => setIsUploading(false);

  const getStatusStyle = (status: DocStatus) => {
    switch (status) {
      case 'VÁLIDA': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'DRAFT': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'ANTIGA': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'INVÁLIDA': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'CANCELADA': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const aguFullData = {
    uasg: "110792",
    responsavelAnalise: "Thaissa Danielle",
    modalidade: "Pregão Eletrônico",
    equipe: { gn: "Marcos", dirA: "Reinaldo Cavassena", dirOp: "Giovanna" },
    licitante: { nome: "Dr. Alberto Fonseca", cargo: "Pregoeiro", departamento: "DLOG", telefone: "(61) 2026-7798", email: "dlog.licitacao@agu.gov.br" },
    siteDisputa: "https://www.gov.br/compras/pt-br",
    prazoEnvioProposta: "13/11/2025 às 10h",
    prazoQuestionamento: "08/11/2025 às 17h",
    dataLances: "13/11/2025 às 10h",
    vigenciaContrato: "CONTRATO - 2.1. O prazo de vigência da contratação é de 48 meses contados da assinatura, prorrogável sucessivamente por até 10 anos.",
    vigenciaARP: "ARP - 1.4. A ata de registro de preços terá vigência de 1 (um) ano, prorrogável por igual período.",
    prazoEntrega: "Ativação em 60 dias úteis.",
    valorGlobal: "R$ 19.257.923,54",
    resumoDescritivo: "Contratação de Solução redundante de nuvem dedicada Oracle Exadata Cloud at Customer (ExaCC), na versão X11M ou superior, incluindo Oracle PaaS e IaaS Universal Credit por demanda e sem consumo mínimo, bem como os serviços necessários para ativação completa da solução, migração de dados e serviços técnicos especializados por demanda.",
    permiteConsorcio: "4.21.2. Não se vislumbra necessidade de permissão da participação em consórcio, tendo em vista as características técnicas do objeto.",
    permiteSubcontratacao: "4.21. Subcontratação. 4.21.1. Não é admitida a subcontratação do objeto contratual.",
    vistoria: "4.16. Vistoria. 4.16.1. Não há necessidade de realização de avaliação prévia do local de execução dos serviços.",
    prazoRecurso: "13.3.2. O prazo para a intenção de recurso é de 10 (dez) minutos. 13.2. O prazo recursal é de 3 (três) dias úteis.",
    amostra: "4.22. Da verificação de amostra do objeto. 4.22.1. Não se aplica",
    seguroGarantia: "11.2. Será exigida a garantia da contratação de que tratam os arts. 96 e seguintes da Lei nº 14.133, de 2021, com validade durante a execução do contrato e 90 (noventa) dias após término da vigência contratual, podendo o Contratado optar pela caução em dinheiro ou em títulos da dívida pública, seguro-garantia, fiança bancária ou título de capitalização, em valor correspondente a 5% (cinco por cento) total da contratação.",
    modoDisputa: "7.10. O procedimento seguirá de acordo com o modo de disputa aberto. 10 min normais with prorrogação de 2 em 2 min.",
    alertasCriticos: [
      { text: "PROPOSTA ADEQUADA:", detail: "Prazo de 180 minutos (3 horas) após negociação.", icon: <Clock size={12} className="text-rose-500" /> },
      { text: "INTERVALO MÍNIMO:", detail: "1% (um por cento) entre lances.", icon: <Scale size={12} className="text-amber-500" /> },
      { text: "MODO DISPUTA:", detail: "Aberto/Fechado (10 min + 2 min prorrogáveis).", icon: <Activity size={12} className="text-blue-500" /> }
    ]
  };

  if (isUploading) {
    return (
      <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-20">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Novo Documento</h1>
        </div>
        <div className="bg-white rounded-[40px] border border-slate-200 p-12 text-center">
            <Upload size={48} className="mx-auto text-blue-500 mb-6" />
            <h2 className="text-xl font-black uppercase">Arraste seus arquivos aqui</h2>
            <button onClick={handleBack} className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase">Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* CABEÇALHO PADRONIZADO */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <div className={`p-4 text-white rounded-[24px] shadow-2xl flex items-center justify-center ${currentSection.color}`}>
            {currentSection.icon}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">{currentSection.title}</h1>
            <p className="text-xs text-slate-400 font-bold uppercase mt-1">{currentSection.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
             <Download size={16} /> Exportar Completo
           </button>
           <button onClick={handleUploadClick} className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 transition-all flex items-center gap-2">
             <Plus size={18} /> Novo Registro
           </button>
        </div>
      </div>

      {/* BANNER DO EDITAL */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-[#1e293b] p-8 text-white flex flex-wrap justify-between items-start gap-8 border-b border-white/5">
          <div className="flex-1 min-w-[300px] space-y-4">
             <div className="flex items-center gap-4">
                <div className="bg-blue-500 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
                  <Landmark size={24} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest block">Edital: {activeEdital.numero} • UASG: {aguFullData.uasg}</span>
                  <h2 className="text-2xl font-black uppercase tracking-widest leading-none">Advocacia Geral da União - AGU</h2>
                </div>
             </div>
             <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight ml-14">{activeEdital.objeto}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">Responsável</span>
                <span className="text-sm font-black text-blue-400">{aguFullData.responsavelAnalise}</span>
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">Modalidade</span>
                <span className="text-sm font-black text-white">{aguFullData.modalidade}</span>
             </div>
             <div className="space-y-1 text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase block">Valor Global Estimado</span>
                <span className="text-sm font-black text-emerald-400">{aguFullData.valorGlobal}</span>
             </div>
          </div>
        </div>

        <div className="p-10 space-y-10">
          
          {/* ABA: Dossiê do Edital (DETALHADA CONFORME IMAGEM) */}
          {(type === 'edital-referencia' || !type) && (
            <div className="space-y-10">
              
              {/* SEÇÃO 1: INFOS GERAIS DA DISPUTA */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Prazo Final Envio Proposta</span>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-blue-600" />
                    <span className="text-sm font-black text-slate-800 uppercase">{aguFullData.prazoEnvioProposta}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Prazo Final Questionamento</span>
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-indigo-600" />
                    <span className="text-sm font-black text-slate-800 uppercase">{aguFullData.prazoQuestionamento}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Início da Disputa (Lances)</span>
                  <div className="flex items-center gap-3">
                    <Zap size={20} className="text-amber-500" />
                    <span className="text-sm font-black text-slate-800 uppercase">{aguFullData.dataLances}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-[28px] p-6 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Local da Disputa</span>
                  <a href={aguFullData.siteDisputa} target="_blank" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ExternalLink size={18} />
                    <span className="text-[11px] font-black uppercase truncate">Compras.gov.br</span>
                  </a>
                </div>
              </div>

              {/* SEÇÃO 2: OBJETO - LARGURA TOTAL */}
              <div className="bg-white border border-slate-200 rounded-[32px] p-8 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <HardDrive size={18} className="text-blue-600" /> Objeto da contratação
                </h3>
                <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight text-justify">
                  {aguFullData.resumoDescritivo}
                </p>
              </div>

              {/* SEÇÃO 3: REGRAS DE PARTICIPAÇÃO E CONDIÇÕES ADICIONAIS (DESIGN MODERNO CARDS) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Gavel size={20} className="text-indigo-600" /> Regras, Amostras e Prazos do Processo
                  </h3>
                  <div className="h-px bg-slate-100 flex-1 ml-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* CARD: Alertas Críticos (MOVIMENTADO) */}
                  <div className="bg-rose-50/50 border border-rose-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-200">
                        <BellRing size={20} />
                      </div>
                      <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Atenção Máxima</span>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-rose-900 uppercase tracking-tight">Alertas Críticos</h4>
                      <div className="space-y-2">
                        {aguFullData.alertasCriticos.map((alerta, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="mt-0.5">{alerta.icon}</span>
                            <p className="text-[10px] font-bold text-slate-600 uppercase leading-tight">
                              <span className="text-slate-800 font-black">{alerta.text}</span> {alerta.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CARD: Qualificação Técnica (NOVO PADRONIZADO) */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                        <UserCheck size={20} />
                      </div>
                      <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Equipe</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-tight">Qualificação Técnica</h4>
                      <p className="text-[11px] font-bold text-slate-500 uppercase leading-snug text-justify">
                        Certificações <span className="text-slate-900 font-black">Oracle OCP v21</span> obrigatórias. Min. 3 anos de exp. comprovada. <span className="text-blue-600 font-black">Carta de Solidariedade Exigida</span>. Reajuste anual pelo ICT.
                      </p>
                    </div>
                  </div>

                  {/* CARD: Garantias Operacionais (MOVIMENTADO) */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200">
                        <Shield size={20} />
                      </div>
                      <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">Execução</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-tight">Garantias Operacionais</h4>
                      <p className="text-[11px] font-bold text-slate-500 uppercase leading-snug">
                        Execução: <span className="text-slate-900 font-black">5% do global</span>. Entrega: <span className="text-emerald-600 font-black">60 dias úteis</span>. Manutenção pós-vigência: 90 dias.
                      </p>
                    </div>
                  </div>

                  {/* CARD: Permite Consórcio */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Users2 size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Participação</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Permite Consórcio</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.permiteConsorcio}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Permite Subcontratação */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <GitBranch size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Operação</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Permite Subcontratação</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.permiteSubcontratacao}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Vistoria */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Eye size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Técnico</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Vistoria</h4>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.vistoria}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Prazo / Recurso */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <MessageSquare size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Jurídico</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Prazo / Recurso</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.prazoRecurso}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Amostra */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <PackageSearch size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Produto</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Amostra</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.amostra}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Seguro Garantia */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-600 group-hover:text-white transition-all">
                        <FileLock2 size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Financeiro</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Seguro Garantia</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify text-[10px] line-clamp-4 hover:line-clamp-none transition-all">
                        {aguFullData.seguroGarantia}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Vigência Contratual */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl group-hover:bg-slate-700 group-hover:text-white transition-all">
                        <Clock size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Prazos</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Vigência Contratual</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.vigenciaContrato}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Modelo de Contratação */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <FileCheck size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Modelo</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Modelo de Contratação</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.vigenciaARP}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Modo de Disputa */}
                  <div className="bg-slate-50/50 border border-slate-200 border-dashed rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <Timer size={20} />
                      </div>
                      <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Lances</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Modo de Disputa</h4>
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        7.10. O procedimento seguirá de acordo com o modo de disputa aberto. <span className="text-rose-600 font-black">10 min normais with prorrogação de 2 em 2 min.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 4: TABELA DE ARQUIVOS (PADRÃO) */}
              <div className="space-y-4 pt-4">
                 <div className="flex justify-between items-center px-2">
                   <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                     <FileCheck size={16} className="text-blue-600" /> Documentação Associada
                   </h3>
                   <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest">Auditoria Forense Habilitada</span>
                 </div>
                 
                 <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento / Versão</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tipo</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Data</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Responsável</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {editalFileGroups.map(group => (
                          <React.Fragment key={group.id}>
                            <tr className="bg-slate-50/20 hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => toggleGroup(group.id, 'edital')}>
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center group-hover:text-blue-600 transition-all shadow-sm">
                                    <GitBranch size={18} />
                                  </div>
                                  <div className="flex flex-col">
                                     <div className="flex items-center gap-2">
                                       <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{group.mainName}</span>
                                       {group.isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                                     </div>
                                     <span className="text-[10px] font-bold text-slate-400 uppercase">{group.versions.length} Versões</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-5 text-center">
                                <span className="text-[9px] font-black bg-white text-blue-600 border border-blue-100 px-3 py-1 rounded-full uppercase shadow-sm">{group.type}</span>
                              </td>
                              <td className="px-8 py-5 text-center">-</td>
                              <td className="px-8 py-5 text-center">-</td>
                              <td className="px-8 py-5 text-center">
                                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">COLEÇÃO</span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                 <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                                   <MoreHorizontal size={16} />
                                 </button>
                              </td>
                            </tr>
                            
                            {group.isExpanded && group.versions.map((ver) => (
                               <tr key={ver.id} className="bg-white hover:bg-slate-50/50 transition-all group border-l-4 border-l-blue-600/30">
                                 <td className="px-8 py-4 pl-16">
                                   <div className="flex items-center gap-4">
                                      <div className="w-8 h-8 bg-slate-50 border border-slate-100 text-slate-400 rounded-lg flex items-center justify-center">
                                        <FileText size={14} />
                                      </div>
                                      <div className="flex flex-col">
                                         <div className="flex items-center gap-2">
                                           <span className="text-[11px] font-black text-slate-600 uppercase truncate max-w-[250px]">{ver.name}</span>
                                           <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">{ver.versionLabel}</span>
                                         </div>
                                         <span className="text-[9px] font-bold text-slate-400 uppercase">{ver.size}</span>
                                      </div>
                                   </div>
                                 </td>
                                 <td className="px-8 py-4 text-center">
                                   <span className="text-[8px] font-bold text-slate-400 uppercase">{group.type}</span>
                                 </td>
                                 <td className="px-8 py-4 text-center text-[10px] font-bold text-slate-500">{ver.date}</td>
                                 <td className="px-8 py-4 text-center">
                                    <span className="text-[10px] font-black text-slate-700 uppercase">{ver.responsible}</span>
                                 </td>
                                 <td className="px-8 py-4 text-center">
                                    <span className={`text-[9px] font-black border px-3 py-1 rounded-full uppercase shadow-sm ${getStatusStyle(ver.status)}`}>
                                      {ver.status}
                                    </span>
                                 </td>
                                 <td className="px-8 py-4 text-right">
                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button title="Editar" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all"><Edit3 size={14} /></button>
                                      <button title="Upload" onClick={handleUploadClick} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"><Upload size={14} /></button>
                                      <button title="Download" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"><Download size={14} /></button>
                                      <button title="Apagar" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all"><Trash2 size={14} /></button>
                                    </div>
                                 </td>
                               </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>
            </div>
          )}

          {/* ABA: Inteligência e Viabilidade (ALTA FIDELIDADE) */}
          {type === 'inteligencia-viabilidade' && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                 <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                   <Fingerprint size={18} className="text-blue-600" /> Matriz de Inteligência Competitiva
                 </h2>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Índice de Certeza Global</span>
                   <div className="bg-slate-100 w-32 h-2 rounded-full overflow-hidden">
                     <div className="bg-blue-600 h-full w-[92%]"></div>
                   </div>
                   <span className="text-xs font-black text-blue-600">92%</span>
                 </div>
               </div>

               {/* Veredito da Inteligência - TONS DE CINZA */}
               <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-10 flex flex-wrap gap-10 items-center justify-between relative overflow-hidden shadow-sm">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full -mr-32 -mt-32"></div>
                 <div className="relative z-10 flex items-center gap-8">
                    <div className="w-24 h-24 bg-slate-800 rounded-[32px] flex items-center justify-center shadow-2xl shadow-slate-900/20">
                       <PieChart size={40} className="text-white" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Veredito da Inteligência</h4>
                       <p className="text-xs font-bold text-slate-500 uppercase leading-tight max-w-sm">O projeto apresenta alto grau de aderência estratégica com riscos financeiros controlados e margem de segurança operacional.</p>
                    </div>
                 </div>
                 <div className="relative z-10 flex gap-4">
                    <div className="bg-white border border-slate-200 p-6 rounded-[28px] text-center min-w-[140px] shadow-sm">
                       <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Certeza Técnica</span>
                       <span className="text-3xl font-black text-slate-900">92.4%</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-6 rounded-[28px] text-center min-w-[140px] shadow-sm">
                       <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Status Geral</span>
                       <span className="text-3xl font-black text-emerald-600 uppercase tracking-widest">GO</span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {viabilityData.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all group flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50/50 transition-colors"></div>
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-center">
                        <div className={`p-4 ${item.iconBg} ${item.iconColor} rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm`}>
                          {item.icon}
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 shadow-sm ${
                          item.status === 'GO' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          {item.status === 'GO' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {item.status}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{item.title}</h3>
                        <div className="flex items-center gap-2">
                           <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                             item.impacto === 'Alto' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                           }`}>Impacto {item.impacto}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase">Analista: {item.responsavel.split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors min-h-[120px]">
                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase italic">
                          "{item.justificativa}"
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                         <div className="flex justify-between items-end">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nível de Confiança</span>
                            <span className="text-10px font-black text-blue-600">{item.confianca}%</span>
                         </div>
                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${item.confianca > 90 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                              style={{ width: `${item.confianca}%` }}
                            ></div>
                         </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black border border-blue-100">
                          {item.responsavel.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase leading-none">Verificado</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{item.dataAnalise}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-800 uppercase leading-none">{item.aprovadoPor.nome}</p>
                        <p className="text-[9px] font-bold text-blue-600 uppercase mt-1">Validação Final</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: Orçamentação e Parceiros (NOVO CONTEÚDO) */}
          {type === 'orcamentacao-parceiros' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Bloco de Cadastro */}
              <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <FilePlus size={20} className="text-amber-500" />
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Registrar Orçamento Recebido</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parceiro*</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-amber-500/20">
                        <option>Oracle</option>
                        <option>Microsoft</option>
                        <option>IBM</option>
                        <option>H2o</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Recebimento*</label>
                      <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solicitante*</label>
                      <input type="text" placeholder="Nome do solicitante..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Global*</label>
                      <input type="text" placeholder="R$ 0,00" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validade*</label>
                      <input type="text" placeholder="30 dias..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="md:col-span-3 lg:col-span-6 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumo Produtos/Serviços</label>
                      <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/20 h-24" placeholder="Descreva os itens do orçamento..."></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="bg-amber-500 text-white px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={16} /> Salvar Orçamento
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub blocos por Parceiros */}
              <div className="space-y-8">
                {['Oracle', 'Microsoft', 'IBM', 'H2o'].map(partner => (
                  <div key={partner} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                           <Building2 size={20} />
                         </div>
                         <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">Parceiro: {partner}</h3>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orçamentos Ativos</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/30">
                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento / Resumo</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Versão</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Recebimento</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Valor Global</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Validade</th>
                            <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[1, 2].map(i => (
                            <tr key={i} className="hover:bg-slate-50 transition-all group">
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shadow-inner">
                                    <FileText size={18} />
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-xs font-black text-slate-800 uppercase tracking-tight">ORÇAMENTO_{partner}_00{i}.PDF</span>
                                     <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5 line-clamp-1">Resumo: Solução Cloud para ambiente AGU e suporte premium 24/7...</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 text-center text-[11px] font-black text-slate-500 uppercase tracking-tighter">v{i}.0</td>
                              <td className="px-6 py-5 text-center text-[11px] font-bold text-slate-500">1{i}/11/2025</td>
                              <td className="px-6 py-5 text-center text-[11px] font-black text-slate-800">R$ {i === 1 ? '1.250.000,00' : '980.000,00'}</td>
                              <td className="px-6 py-5 text-center text-[11px] font-bold text-slate-500 uppercase">30 DIAS</td>
                              <td className="px-8 py-5">
                                 <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all" title="Ver"><Eye size={14} /></button>
                                   <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all" title="Baixar"><Download size={14} /></button>
                                   <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all" title="Excluir"><Trash2 size={14} /></button>
                                 </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outras Seções */}
          {type && !['inteligencia-viabilidade', 'edital-referencia', 'orcamentacao-parceiros'].includes(type) && (
             <div className="p-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="max-w-md mx-auto space-y-4">
                  <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg ${currentSection.color}`}>
                     {currentSection.icon}
                  </div>
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Módulo de {currentSection.title} em Configuração</h2>
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Integração nativa com robô de automação LicitaRed</p>
                </div>
             </div>
          )}

          {/* TABELA DE ARQUIVOS (PADRÃO PARA TODAS AS ABAS) - Somente se não for a aba de parceiros que tem tabela própria */}
          {type !== 'orcamentacao-parceiros' && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <FileCheck size={16} className="text-blue-600" /> Documentação Associada
                </h3>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento / Versão</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tipo</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Data</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {(type === 'inteligencia-viabilidade' ? docGroups : editalFileGroups).map(group => (
                        <React.Fragment key={group.id}>
                          <tr className="bg-slate-50/20 hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => toggleGroup(group.id, type === 'inteligencia-viabilidade' ? 'viability' : 'edital')}>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <GitBranch size={18} className="text-slate-400" />
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-slate-800 uppercase">{group.mainName}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase">{group.versions.length} Versões</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-center">
                              <span className="text-[9px] font-black text-blue-600 uppercase">{group.type}</span>
                            </td>
                            <td className="px-8 py-5 text-center">-</td>
                            <td className="px-8 py-5 text-center">-</td>
                            <td className="px-8 py-5 text-right">
                              <MoreHorizontal size={16} className="text-slate-400" />
                            </td>
                          </tr>
                          {group.isExpanded && group.versions.map((ver) => (
                            <tr key={ver.id} className="bg-white hover:bg-slate-50/50 transition-all border-l-4 border-l-blue-600/30">
                              <td className="px-8 py-4 pl-16">
                                <div className="flex items-center gap-4">
                                    <FileText size={14} className="text-slate-400" />
                                    <span className="text-[11px] font-black text-slate-600 uppercase">{ver.name}</span>
                                </div>
                              </td>
                              <td className="px-8 py-4 text-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">{group.type}</span>
                              </td>
                              <td className="px-8 py-4 text-center text-[10px] font-bold text-slate-500">{ver.date}</td>
                              <td className="px-8 py-4 text-center">
                                  <span className={`text-[9px] font-black border px-3 py-1 rounded-full uppercase shadow-sm ${getStatusStyle(ver.status)}`}>
                                    {ver.status}
                                  </span>
                              </td>
                              <td className="px-8 py-4 text-right">
                                  <Download size={14} className="text-slate-400 ml-auto" />
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterAssets;
