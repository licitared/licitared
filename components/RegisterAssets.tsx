
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
  Save, Layers, UserPlus, ShieldAlert, FileStack, BadgeCheck, History,
  FileQuestion, HelpCircle as HelpIcon, UserCog, AlertOctagon, Scale as GavelIcon,
  Ban, Hash, Banknote, Receipt, DollarSign, UserCheck2
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

interface DiligenciaDoc {
  id: string;
  lote: string;
  cnpj: string;
  tipo: 'Jurídico' | 'Financeiro' | 'Fiscal' | 'Técnico';
  resumo: string;
  data: string;
  referencia: string;
  arquivo: string;
  responsavel: string;
  status: 'Ativo' | 'Desabilitado';
}

interface ConcorrenciaDoc {
  id: string;
  lote: string;
  cnpj: string;
  tipo: 'Jurídico' | 'Financeiro' | 'Fiscal' | 'Técnico';
  resumo: string;
  data: string;
  referencia: string;
  arquivo: string;
  responsavel: string;
  versao: string;
  status: 'Ativo' | 'Desabilitado';
}

interface RecursoDoc {
  id: string;
  lote: string;
  cnpjRecorrido: string;
  tipo: 'Impugnação' | 'Recurso' | 'Contra-razões' | 'Reconsideração';
  resumo: string;
  data: string;
  referencia: string;
  arquivo: string;
  responsavel: string;
  versao: string;
  status: 'Ativo' | 'Desabilitado';
}

interface OrcamentoParceiro {
  id: string;
  lote: string;
  parceiro: string;
  item: string;
  valorUnitario: string;
  valorTotal: string;
  status: 'Cotação' | 'Validado' | 'Negociado';
  arquivo: string;
}

interface PropostaComercial {
  id: string;
  lote: string;
  descricao: string;
  valorProposto: string;
  margem: string;
  status: 'Draft' | 'Final' | 'Enviada';
  responsavel: string;
}

interface HabilitacaoDoc {
  id: string;
  tipo: 'Social' | 'Fiscal' | 'Trabalhista' | 'Econômica' | 'Técnica';
  nome: string;
  emissao: string;
  validade: string;
  status: 'Válido' | 'Vencido' | 'Pendente';
  arquivo: string;
}

const RegisterAssets: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const { activeEdital } = useEdital();
  const [docGroups, setDocGroups] = useState<DocumentGroup[]>([]);
  const [editalFileGroups, setEditalFileGroups] = useState<DocumentGroup[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Mock Data
  const [diligencias] = useState<DiligenciaDoc[]>([
    { id: 'd1', lote: '01', cnpj: '42.345.678/0001-90', tipo: 'Técnico', resumo: 'Relatório de vistoria técnica nas instalações do datacenter. Validada capacidade de hosting.', data: '2025-11-20', referencia: 'Vistoria Brasília Sede', arquivo: 'RELAT_VISTORIA_TEC_L1.PDF', responsavel: 'Thaissa D.', status: 'Ativo' },
  ]);

  const [concorrenciaDocs] = useState<ConcorrenciaDoc[]>([
    { id: 'c1', lote: '01', cnpj: '12.987.654/0001-21', tipo: 'Técnico', resumo: 'Atestado de capacidade técnica para fornecimento de cloud.', data: '2025-11-25', referencia: 'Atestado Órgão X', arquivo: 'ATESTADO_TECNICO_L1.PDF', responsavel: 'Thaissa D.', versao: '1.0', status: 'Ativo' },
  ]);

  const [recursoDocs] = useState<RecursoDoc[]>([
    { id: 'r1', lote: '01', cnpjRecorrido: 'Órgão Licitante', tipo: 'Impugnação', resumo: 'Contestação contra cláusula de exclusividade técnica injustificada no item 4.2.', data: '2025-10-15', referencia: 'Impugnação Edital AGU', arquivo: 'IMPUGNACAO_EDITAL_V1.PDF', responsavel: 'Thaissa D.', versao: '1.0', status: 'Ativo' },
  ]);

  const [orcamentos] = useState<OrcamentoParceiro[]>([
    { id: 'o1', lote: '01', parceiro: 'Oracle Brasil', item: 'Exadata Cloud at Customer X11M', valorUnitario: 'R$ 15.000.000,00', valorTotal: 'R$ 15.000.000,00', status: 'Validado', arquivo: 'COTACAO_ORACLE_X11M.PDF' },
    { id: 'o2', lote: '01', parceiro: 'Ingram Micro', item: 'Serviços de Implementação', valorUnitario: 'R$ 1.200.000,00', valorTotal: 'R$ 1.200.000,00', status: 'Negociado', arquivo: 'COTACAO_INGRAM_SERV.PDF' },
  ]);

  const [propostas] = useState<PropostaComercial[]>([
    { id: 'p1', lote: '01', descricao: 'Solução Completa Cloud Dedicada AGU', valorProposto: 'R$ 18.900.000,00', margem: '18.5%', status: 'Draft', responsavel: 'Reinaldo C.' },
  ]);

  const [habilitacaoDocs] = useState<HabilitacaoDoc[]>([
    { id: 'h1', tipo: 'Fiscal', nome: 'Certidão Negativa de Débitos Federais', emissao: '01/10/2025', validade: '01/04/2026', status: 'Válido', arquivo: 'CND_FEDERAL_WK3.PDF' },
    { id: 'h2', tipo: 'Social', nome: 'Contrato Social Consolidado', emissao: '15/05/2024', validade: 'N/A', status: 'Válido', arquivo: 'CONTRATO_SOCIAL_WK3.PDF' },
    { id: 'h3', tipo: 'Trabalhista', nome: 'CNDT - Certidão Negativa de Débitos Trabalhistas', emissao: '20/10/2025', validade: '20/04/2026', status: 'Válido', arquivo: 'CNDT_WK3.PDF' },
  ]);

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
    'esclarecimentos': { 
      title: 'Esclarecimento e Impugnação', 
      subtitle: 'Gestão de Dúvidas e Questionamentos',
      icon: <MessageSquare size={28} />,
      color: 'bg-cyan-600'
    },
    'orcamentacao-parceiros': { 
      title: 'Orçamentação e Parceiros', 
      subtitle: 'Gestão de Custos e Alianças',
      icon: <Building2 size={28} />,
      color: 'bg-amber-500'
    },
    'proposta-comercial': { 
      title: 'Propostas e Habilitação Técnica', 
      subtitle: 'Configuração de Preços e Prazos',
      icon: <Calculator size={28} />,
      color: 'bg-emerald-600'
    },
    'habilitacao-declaracoes': { 
      title: 'Habilitação Geral', 
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
    'impugnacoes': { 
      title: 'Recurso', 
      subtitle: 'Gestão de Contestações do Edital',
      icon: <AlertOctagon size={28} />,
      color: 'bg-orange-600'
    },
    'diligencia': { 
      title: 'Diligência', 
      subtitle: 'Acompanhamento de Diligências e Vistorias Técnicas',
      icon: <FileSearch size={28} />,
      color: 'bg-indigo-500'
    },
    'atas-classificacao': { 
      title: 'Atas e Classificação', 
      subtitle: 'Resultados e Transparência do Processo',
      icon: <ListOrdered size={28} />,
      color: 'bg-purple-600'
    },
    'concorrencia': { 
      title: 'Concorrência', 
      subtitle: 'Análise e Gestão de Competidores',
      icon: <Gavel size={28} />,
      color: 'bg-slate-700'
    },
    'prova-conceito': { 
      title: 'Prova de Conceito', 
      subtitle: 'Validação Técnica e Testes de Solução',
      icon: <Cpu size={28} />,
      color: 'bg-slate-800'
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
  }, [type]);

  const toggleGroup = (groupId: string, section: 'viability' | 'edital') => {
    if (section === 'viability') {
      setDocGroups(prev => prev.map(g => g.id === groupId ? { ...g, isExpanded: !g.isExpanded } : g));
    } else if (section === 'edital') {
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
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const aguFullData = {
    uasg: "110792",
    responsavelAnalise: "Thaissa Danielle",
    modalidade: "Pregão Eletrônico",
    siteDisputa: "https://www.gov.br/compras/pt-br",
    prazoEnvioProposta: "13/11/2025 às 10h",
    prazoQuestionamento: "08/11/2025 às 17h",
    dataLances: "13/11/2025 às 10h",
    vigenciaContrato: "CONTRATO - 2.1. O PRAZO DE VIGÊNCIA DA CONTRATAÇÃO É DE 48 MESES CONTADOS DA ASSINATURA, PRORROGÁVEL SUCESSIVAMENTE POR ATÉ 10 ANOS.",
    vigenciaARP: "ARP - 1.4. A ATA DE REGISTRO DE PREÇOS TERÁ VIGÊNCIA DE 1 (UM) ANO, PRORROGÁVEL POR IGUAL PERÍODO.",
    valorGlobal: "R$ 19.257.923,54",
    resumoDescritivo: "Contratação de Solução redundante de nuvem dedicada Oracle Exadata Cloud at Customer (ExaCC), na versão X11M ou superior, incluindo Oracle PaaS e IaaS Universal Credit por demanda e sem consumo mínimo, bem como os serviços necessários para ativação completa da solução, migração de dados e serviços técnicos especializados por demanda.",
    permiteConsorcio: "4.21.2. Não se vislumbra necessidade de permissão da participação em concórcio, tendo em vista as características técnicas do objeto.",
    permiteSubcontratacao: "4.21. Subcontratação. 4.21.1. Não é admitida a subcontratação do objeto contratual.",
    vistoria: "4.16. Vistoria. 4.16.1. Não há necessidade de realização de avaliação prévia do local de execução dos serviços.",
    prazoRecurso: "13.3.2. O PRAZO PARA A INTENÇÃO DE RECURSO É DE 10 (DEZ) MINUTOS. 13.2. O PRAZO RECURSAL É DE 3 (TRÊS) DIAS ÚTEIS.",
    amostra: "4.22. DA VERIFICAÇÃO DE AMOSTRA DO OBJETO. 4.22.1. NÃO SE APLICA",
    seguroGarantia: "11.2. SERÁ EXIGIDA A GARANTIA DA CONTRATAÇÃO DE QUE TRATAM OS ARTS. 96 E SEGUINTES DA LEI Nº 14.133, DE 2021, COM VALIDADE DURANTE A EXECUÇÃO DO CONTRA...",
    modoDisputa: "7.10. O PROCEDIMENTO SEGUIRÁ DE ACORDO COM O MODO DE DISPUTA ABERTO.",
    disputaDetalhamento: "10 MIN NORMAIS WITH PRORROGAÇÃO DE 2 EM 2 MIN.",
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
          
          {/* ABA RESTAURADA: Dossiê do Edital */}
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

              {/* SEÇÃO 3: REGRAS DE PARTICIPAÇÃO E CONDIÇÕES ADICIONAIS */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Gavel size={20} className="text-indigo-600" /> Regras, Amostras e Prazos do Processo
                  </h3>
                  <div className="h-px bg-slate-100 flex-1 ml-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* CARD: Alertas Críticos */}
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

                  {/* CARD: Qualificação Técnica */}
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

                  {/* CARD: Garantias Operacionais */}
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
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MessageSquare size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Jurídico</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Prazo / Recurso</h4>
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
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
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
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
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.seguroGarantia}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Vigência Contratual */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl group-hover:bg-slate-800 group-hover:text-white transition-all">
                        <Timer size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Prazos</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Vigência Contratual</h4>
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.vigenciaContrato}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Modelo de Contratação */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <FileCheck size={20} />
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Modelo</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Modelo de Contratação</h4>
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.vigenciaARP}
                      </p>
                    </div>
                  </div>

                  {/* CARD: Modo de Disputa */}
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <Timer size={20} />
                      </div>
                      <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Lances</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">Modo de Disputa</h4>
                      <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-tight text-justify">
                        {aguFullData.modoDisputa} <span className="text-red-600 font-black">{aguFullData.disputaDetalhamento}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA RESTAURADA: Inteligência e Viabilidade */}
          {type === 'inteligencia-viabilidade' && (
            <div className="space-y-12 animate-in fade-in duration-500">
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
                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight italic">
                          "{item.justificativa}"
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                         <div className="flex justify-between items-end">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nível de Confiança</span>
                            <span className="text-10px font-black text-blue-600">{item.confianca}%</span>
                         </div>
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
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

          {/* ABA RESTAURADA: Esclarecimentos */}
          {type === 'esclarecimentos' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-lg">
                      <MessageSquare size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cadastrar Novo Esclarecimento / Impugnação</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={14} className="text-cyan-500" /> Data*
                      </label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <FileQuestion size={14} className="text-cyan-500" /> Tipo*
                      </label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/20 appearance-none">
                        <option>Técnico</option>
                        <option>Comercial</option>
                        <option>Jurídico</option>
                        <option>Processo</option>
                        <option>Impugnação</option>
                        <option>Outro</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Users2 size={14} className="text-cyan-500" /> Questionador*
                      </label>
                      <input type="text" placeholder="Nome da empresa ou interessado..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/20" />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <FileSearch size={14} className="text-cyan-500" /> Resumo do Documento*
                      </label>
                      <textarea rows={3} placeholder="Breve descrição do teor do esclarecimento e resposta do órgão..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <UserCog size={14} className="text-cyan-500" /> Responsável Cadastramento*
                      </label>
                      <input type="text" defaultValue="Reinaldo Cavassena" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Upload size={14} className="text-cyan-500" /> Anexar Documento de Resposta*
                      </label>
                      <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-3.5 rounded-[20px] text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                         <Plus size={14} /> Selecionar PDF do Esclarecimento
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-cyan-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-cyan-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Salvar Registro
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                       <ClipboardList size={18} className="text-cyan-600" /> Dossiê de Esclarecimentos e Impugnações
                    </h3>
                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest">3 Documentos Registrados</span>
                 </div>
                 <div className="grid grid-cols-1 gap-6">
                    {[
                      { type: 'Técnico', date: '22/10/2025', questioner: 'Softplan Planejamento', resumo: 'Questionamento sobre requisitos de interoperabilidade entre Oracle ExaCC e sistemas legados de tribunal superior.', file: 'ESCLARECIMENTO_01_TECNICO.PDF', responsible: 'Reinaldo C.' },
                      { type: 'Comercial', date: '25/10/2025', questioner: 'WK3 Soluções', resumo: 'Dúvida sobre cronograma de faturamento e emissão de notas SIAFI.', file: 'ESCLARECIMENTO_02_COMERCIAL.PDF', responsible: 'Marcos V.' },
                      { type: 'Processo', date: '28/10/2025', questioner: 'Consórcio Cloud Brasil', resumo: 'Pedido de prorrogação do prazo para envio de proposta técnica devido à complexidade da versão X11M.', file: 'ESCLARECIMENTO_03_PRAZO.PDF', responsible: 'Giovanna O.' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-cyan-200 transition-all group">
                         <div className="p-8 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                               <div className="flex items-center gap-4">
                                  <span className="bg-cyan-50 text-cyan-600 border border-cyan-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.type}</span>
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> Recebido em {item.date}</span>
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Questionador / Interessado</p>
                                  <h4 className="text-sm font-black text-slate-800 uppercase">{item.questioner}</h4>
                               </div>
                               <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight italic">"{item.resumo}"</p>
                               </div>
                            </div>
                            <div className="md:w-72 flex flex-col gap-4">
                               <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 group-hover:border-cyan-100 transition-all">
                                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:text-cyan-600"><FileText size={20} /></div>
                                  <div className="flex-1 overflow-hidden">
                                     <p className="text-[10px] font-black text-slate-800 uppercase truncate leading-none">{item.file}</p>
                                     <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Versão v1.0 • 1.4 MB</p>
                                  </div>
                                  <button className="p-2 bg-slate-50 text-slate-400 hover:text-cyan-600 rounded-lg"><Download size={14} /></button>
                               </div>
                               <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-50">
                                  <div className="flex items-center gap-2">
                                     <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[8px] font-black text-slate-500">{item.responsible.substring(0, 2).toUpperCase()}</div>
                                     <span className="text-[9px] font-bold text-slate-400 uppercase">{item.responsible}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                     <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors"><Edit3 size={14} /></button>
                                     <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* ABA: Orçamentação e Parceiros */}
          {type === 'orcamentacao-parceiros' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-lg">
                      <Building2 size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Novo Orçamento / Parceiro</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lote*</label>
                      <input type="text" placeholder="Ex: 01" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Parceiro / Fabricante*</label>
                      <input type="text" placeholder="Nome da empresa parceira..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status*</label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none">
                        <option>Cotação</option>
                        <option>Validado</option>
                        <option>Negociado</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Item Orçado*</label>
                      <input type="text" placeholder="Descrição do produto ou serviço..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor Unitário*</label>
                      <input type="text" placeholder="R$ 0,00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor Total*</label>
                      <input type="text" placeholder="R$ 0,00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/20" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-amber-500 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-amber-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Registrar Orçamento
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 {['01'].map(loteNum => (
                   <div key={loteNum} className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                      <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Layers className="text-amber-500" size={18} />
                            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Lote {loteNum} - Gestão de Custos</h3>
                         </div>
                      </div>
                      <div className="overflow-x-auto">
                         <table className="w-full text-left">
                            <thead>
                               <tr className="border-b border-slate-50">
                                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Parceiro / Item</th>
                                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Valor Unitário</th>
                                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Valor Total</th>
                                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                               {orcamentos.map(item => (
                                 <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-5">
                                       <div className="flex flex-col">
                                          <span className="text-xs font-black text-slate-800 uppercase">{item.parceiro}</span>
                                          <span className="text-[9px] font-bold text-slate-400 uppercase">{item.item}</span>
                                       </div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-[11px] font-bold text-slate-600">{item.valorUnitario}</td>
                                    <td className="px-6 py-5 text-center text-[11px] font-black text-slate-800">{item.valorTotal}</td>
                                    <td className="px-6 py-5 text-center">
                                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border shadow-sm ${
                                         item.status === 'Validado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                       }`}>{item.status}</span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600"><Download size={14} /></button>
                                          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
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

          {/* ABA: Propostas e Habilitação Técnica */}
          {type === 'proposta-comercial' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg">
                      <Calculator size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Definição de Proposta Comercial</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lote*</label>
                      <input type="text" placeholder="Ex: 01" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição da Proposta*</label>
                      <input type="text" placeholder="Título identificador da proposta..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor Final Proposto*</label>
                      <input type="text" placeholder="R$ 0,00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Margem Líquida Estimada (%)*</label>
                      <input type="text" placeholder="0.00%" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Responsável pela Proposta*</label>
                      <input type="text" defaultValue="Reinaldo Cavassena" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-emerald-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Salvar Proposta
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {propostas.map(p => (
                  <div key={p.id} className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group">
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                           <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">Lote {p.lote}</span>
                           <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{p.descricao}</h3>
                        </div>
                        <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">{p.status}</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valor Proposto</p>
                           <p className="text-xl font-black text-slate-800">{p.valorProposto}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Margem Estimada</p>
                           <p className="text-xl font-black text-emerald-600">{p.margem}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Responsável</p>
                           <p className="text-sm font-bold text-slate-600 uppercase">{p.responsavel}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-colors"><Edit3 size={18} /></button>
                           <button className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-colors"><FileSignature size={18} /></button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA: Habilitação Geral */}
          {type === 'habilitacao-declaracoes' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg">
                      <ShieldCheck size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Gestão de Documentos de Habilitação</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Habilitação*</label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none">
                        <option>Jurídica (Social)</option>
                        <option>Regularidade Fiscal</option>
                        <option>Regularidade Trabalhista</option>
                        <option>Qualificação Econômica</option>
                        <option>Qualificação Técnica</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Documento*</label>
                      <input type="text" placeholder="Ex: CND Federal, Balanço 2024..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Emissão*</label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Validade*</label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload do PDF*</label>
                       <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-3 rounded-[20px] text-[10px] font-black text-slate-400 uppercase flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                          <Plus size={14} /> Selecionar Arquivo
                       </button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-indigo-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Registrar Documento
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                 <div className="px-8 py-5 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Documentos Habilitatórios Ativos</h3>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-slate-50">
                             <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo / Nome</th>
                             <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Emissão</th>
                             <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Validade</th>
                             <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                             <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {habilitacaoDocs.map(doc => (
                            <tr key={doc.id} className="hover:bg-slate-50 transition-all group">
                               <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm">
                                        <FileText size={18} />
                                     </div>
                                     <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{doc.tipo}</span>
                                        <span className="text-xs font-black text-slate-800 uppercase">{doc.nome}</span>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-5 text-center text-[11px] font-bold text-slate-500">{doc.emissao}</td>
                               <td className="px-6 py-5 text-center text-[11px] font-bold text-slate-500">{doc.validade}</td>
                               <td className="px-6 py-5 text-center">
                                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase border shadow-sm ${
                                    doc.status === 'Válido' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                  }`}>{doc.status}</span>
                               </td>
                               <td className="px-8 py-5 text-right">
                                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600"><Download size={14} /></button>
                                     <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            </div>
          )}

          {/* ABA: Diligência */}
          {type === 'diligencia' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               {/* Formulário de Cadastramento */}
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg">
                      <FileSearch size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cadastrar Documento de Diligência</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Layers size={14} className="text-indigo-500" /> Lote*
                      </label>
                      <input type="text" placeholder="Ex: 01" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Hash size={14} className="text-indigo-500" /> CNPJ Diligenciado*
                      </label>
                      <input type="text" placeholder="00.000.000/0001-00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileQuestion size={14} className="text-indigo-500" /> Tipo de Documento*
                      </label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none">
                        <option>Jurídico</option>
                        <option>Financeiro</option>
                        <option>Fiscal</option>
                        <option>Técnico</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Calendar size={14} className="text-indigo-500" /> Data Documento*
                      </label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <BookmarkCheck size={14} className="text-indigo-500" /> Referência (Breve Descrição)*
                      </label>
                      <input type="text" placeholder="Ex: Vistoria in-loco Brasília sede..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileSearch size={14} className="text-indigo-500" /> Resumo do Documento*
                      </label>
                      <textarea rows={3} placeholder="Descreva os achados e o teor da diligência..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Upload size={14} className="text-indigo-500" /> Upload de Documentos*
                      </label>
                      <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-3.5 rounded-[20px] text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                         <Plus size={14} /> Selecionar Arquivos PDF
                      </button>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <UserCog size={14} className="text-indigo-500" /> Responsável*
                      </label>
                      <input type="text" defaultValue="Thaissa Danielle" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-indigo-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Salvar Diligência
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA: Concorrência */}
          {type === 'concorrencia' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               {/* Formulário de Cadastramento - Concorrência */}
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-slate-700 text-white rounded-xl shadow-lg">
                      <Gavel size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cadastrar Documento de Concorrência</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Layers size={14} className="text-slate-500" /> Lote*
                      </label>
                      <input type="text" placeholder="Ex: 01" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Hash size={14} className="text-slate-500" /> CNPJ Concorrente*
                      </label>
                      <input type="text" placeholder="00.000.000/0001-00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileQuestion size={14} className="text-slate-500" /> Tipo de Documento*
                      </label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20 appearance-none">
                        <option>Jurídico</option>
                        <option>Financeiro</option>
                        <option>Fiscal</option>
                        <option>Técnico</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Calendar size={14} className="text-slate-500" /> Data Documento*
                      </label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <BookmarkCheck size={14} className="text-slate-500" /> Referência (Breve Descrição)*
                      </label>
                      <input type="text" placeholder="Ex: Qualificação técnica lote 01..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <GitBranch size={14} className="text-slate-500" /> Versão*
                      </label>
                      <input type="text" placeholder="Ex: 1.0" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20" />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileSearch size={14} className="text-slate-500" /> Resumo do Documento*
                      </label>
                      <textarea rows={3} placeholder="Descreva os detalhes da documentação concorrencial..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-500/20 resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Upload size={14} className="text-slate-500" /> Upload de Documentos*
                      </label>
                      <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-3.5 rounded-[20px] text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                         <Plus size={14} /> Selecionar Arquivos PDF
                      </button>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <UserCog size={14} className="text-slate-500" /> Responsável*
                      </label>
                      <input type="text" defaultValue="Thaissa Danielle" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-slate-700 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Salvar Documentação
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA: Recurso */}
          {type === 'impugnacoes' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
               {/* Formulário de Cadastramento - Recurso */}
               <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                    <div className="p-2.5 bg-orange-600 text-white rounded-xl shadow-lg">
                      <AlertOctagon size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cadastrar Documentação de Recurso / Impugnação</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Layers size={14} className="text-orange-500" /> Lote*
                      </label>
                      <input type="text" placeholder="Ex: 01" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Hash size={14} className="text-orange-500" /> CNPJ Recorrido/Participante*
                      </label>
                      <input type="text" placeholder="00.000.000/0001-00" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileQuestion size={14} className="text-orange-500" /> Tipo de Recurso*
                      </label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none">
                        <option>Impugnação</option>
                        <option>Recurso</option>
                        <option>Contra-razões</option>
                        <option>Reconsideração</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Calendar size={14} className="text-orange-500" /> Data Documento*
                      </label>
                      <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <BookmarkCheck size={14} className="text-orange-500" /> Referência (Breve Descrição)*
                      </label>
                      <input type="text" placeholder="Ex: Contestação cláusula 7.1..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <GitBranch size={14} className="text-orange-500" /> Versão*
                      </label>
                      <input type="text" placeholder="Ex: 1.0" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <FileSearch size={14} className="text-orange-500" /> Resumo do Recurso*
                      </label>
                      <textarea rows={3} placeholder="Descreva os argumentos e fundamentos do recurso..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"></textarea>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Upload size={14} className="text-orange-500" /> Upload de Documentos*
                      </label>
                      <button className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-3.5 rounded-[20px] text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                         <Plus size={14} /> Selecionar Arquivos PDF
                      </button>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <UserCog size={14} className="text-orange-500" /> Responsável*
                      </label>
                      <input type="text" defaultValue="Reinaldo Cavassena" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button className="bg-orange-600 text-white px-12 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-105 transition-all flex items-center gap-2">
                      <Save size={18} /> Salvar Recurso
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seções Placeholder remanescentes */}
          {type && !['inteligencia-viabilidade', 'edital-referencia', 'esclarecimentos', 'orcamentacao-parceiros', 'proposta-comercial', 'habilitacao-declaracoes', 'concorrencia', 'prova-conceito', 'impugnacoes', 'diligencia', 'atas-classificacao', 'homologacao-contrato', 'pos-venda-booking'].includes(type) && (
             <div className="p-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="max-w-md mx-auto space-y-4">
                  <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg ${currentSection.color}`}>{currentSection.icon}</div>
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Módulo em Configuração</h2>
                </div>
             </div>
          )}

          {/* TABELA DE ARQUIVOS (PARA ABAS GENÉRICAS) */}
          {!['orcamentacao-parceiros', 'proposta-comercial', 'habilitacao-declaracoes', 'impugnacoes', 'diligencia', 'concorrencia', 'esclarecimentos'].includes(type || '') && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><FileCheck size={16} className="text-blue-600" /> Documentação Associada</h3>
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
                            <td className="px-8 py-5"><div className="flex items-center gap-4"><GitBranch size={18} className="text-slate-400" /><div className="flex flex-col"><span className="text-xs font-black text-slate-800 uppercase">{group.mainName}</span><span className="text-[10px] font-bold text-slate-400 uppercase">{group.versions.length} Versões</span></div></div></td>
                            <td className="px-8 py-5 text-center"><span className="text-[9px] font-black text-blue-600 uppercase">{group.type}</span></td>
                            <td className="px-8 py-5 text-center">-</td>
                            <td className="px-8 py-5 text-center">-</td>
                            <td className="px-8 py-5 text-right"><MoreHorizontal size={16} className="text-slate-400 ml-auto" /></td>
                          </tr>
                          {group.isExpanded && group.versions.map((ver) => (
                            <tr key={ver.id} className="bg-white hover:bg-slate-50/50 transition-all border-l-4 border-l-blue-600/30">
                              <td className="px-8 py-4 pl-16"><div className="flex items-center gap-4"><FileText size={14} className="text-slate-400" /><span className="text-[11px] font-black text-slate-600 uppercase">{ver.name}</span></div></td>
                              <td className="px-8 py-4 text-center"><span className="text-[8px] font-bold text-slate-400 uppercase">{group.type}</span></td>
                              <td className="px-8 py-4 text-center text-[10px] font-bold text-slate-500">{ver.date}</td>
                              <td className="px-8 py-4 text-center"><span className={`text-[9px] font-black border px-3 py-1 rounded-full uppercase shadow-sm ${getStatusStyle(ver.status)}`}>{ver.status}</span></td>
                              <td className="px-8 py-4 text-right"><Download size={14} className="text-slate-400 ml-auto" /></td>
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
