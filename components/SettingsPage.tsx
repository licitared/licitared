
import React, { useState } from 'react';
import { 
  Bell, Shield, Key, ChevronRight, Database, Clock, Save, RefreshCcw, 
  History, CheckCircle2, Building2, Upload, Mail, Phone, MapPin, Globe,
  User, Calendar, Briefcase, Search, Eye, HelpCircle, Plus, MinusCircle,
  ShieldCheck, UserPlus, Lock, Landmark, Hash, CreditCard, Receipt, 
  Zap, ArrowUpCircle, Check, XCircle, Download
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('empresa');
  const [showPassword, setShowPassword] = useState(false);

  const snapshots = [
    { id: 'LCT-REF-20251114-V4', date: '14/11/2025 15:45', status: 'ATUAL', desc: 'Concorrência e Padronização de Qualificação Técnica' },
    { id: 'LCT-REF-20251113-V3', date: '13/11/2025 11:30', status: 'ARQUIVADO', desc: 'Redesign Moderno: Objeto da Contratação e Regras de Participação' },
    { id: 'LCT-REF-20251025-V2', date: '25/10/2025 14:45', status: 'ARQUIVADO', desc: 'Ponto de Restauração (Alta Fidelidade - Oracle Exadata)' },
    { id: 'LCT-REF-20251025-V1', date: '25/10/2025 10:20', status: 'ARQUIVADO', desc: 'Versão Inicial de Inteligência e Viabilidade' },
    { id: 'LCT-REF-20251024-V0', date: '24/10/2024 18:00', status: 'ARQUIVADO', desc: 'Baseline de Sistema Multi-tenant' }
  ];

  const permissionsList = [
    'Gerenciar usuários',
    'Monitorar (Todos os Usuários)',
    'Financeiro',
    'Monitorar',
    'Disputar',
    'Encontrar'
  ];

  const billingHistory = [
    { date: '01/11/2025', description: 'Assinatura Mensal - Plano Enterprise', amount: 'R$ 2.490,00', status: 'Pago' },
    { date: '01/10/2025', description: 'Assinatura Mensal - Plano Enterprise', amount: 'R$ 2.490,00', status: 'Pago' },
    { date: '01/09/2025', description: 'Assinatura Mensal - Plano Enterprise', amount: 'R$ 2.490,00', status: 'Pago' },
    { date: '01/08/2025', description: 'Upgrade de Plano: Básico -> Enterprise', amount: 'R$ 1.500,00', status: 'Pago' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Configurações do Sistema</h1>
        {(activeTab === 'sistema e backups' || activeTab === 'empresa' || activeTab === 'usuários' || activeTab === 'assinatura') && (
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2 hover:scale-105 transition-all">
            <Save size={16} /> Salvar Alterações
          </button>
        )}
      </div>
      
      <div className="flex gap-8 border-b border-slate-200">
        {['Empresa', 'Assinatura', 'Usuários', 'Notificações', 'Sistema e Backups', 'Segurança'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-3 text-sm font-black uppercase tracking-widest transition-all ${
              activeTab === tab.toLowerCase() 
                ? 'border-b-4 border-blue-600 text-blue-600' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'assinatura' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-top-2 duration-500">
          {/* Status da Assinatura */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-blue-200 shrink-0">
                    <Zap size={36} className="fill-current" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Plano Enterprise</h3>
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 size={12} /> Assinatura Ativa
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Acesso total a todos os módulos e IA avançada</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                    Alterar Plano
                  </button>
                  <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
                    <ArrowUpCircle size={16} /> Gerenciar Billing
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-[28px] space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar size={14} className="text-blue-500" /> Próxima Renovação
                  </span>
                  <p className="text-lg font-black text-slate-800 uppercase">01 de Dezembro, 2025</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-[28px] space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <CreditCard size={14} className="text-emerald-500" /> Método de Pagamento
                  </span>
                  <p className="text-lg font-black text-slate-800 uppercase flex items-center gap-2">
                    •••• 4242 <span className="text-[10px] font-black bg-white border border-slate-200 px-2 py-0.5 rounded uppercase text-slate-400">VISA</span>
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-[28px] space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Landmark size={14} className="text-indigo-500" /> Valor Mensal
                  </span>
                  <p className="text-lg font-black text-slate-800 uppercase">R$ 2.490,00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparação de Planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-10 space-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all relative overflow-hidden">
               <div className="space-y-2">
                 <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Plano Básico</h4>
                 <p className="text-3xl font-black text-slate-900 tracking-tight">R$ 890,00 <span className="text-sm font-bold text-slate-400 uppercase">/mês</span></p>
               </div>
               <div className="space-y-4">
                 {[
                   { text: 'Busca ilimitada de editais', check: true },
                   { text: 'Até 5 disputas mensais', check: true },
                   { text: 'Robô de lances básico', check: true },
                   { text: 'Auditoria forense completa', check: false },
                   { text: 'Inteligência Artificial de editais', check: false },
                   { text: 'Multi-tenant Enterprise', check: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     {item.check ? <Check size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-slate-300" />}
                     <span className={`text-xs font-bold uppercase tracking-tight ${item.check ? 'text-slate-600' : 'text-slate-300'}`}>{item.text}</span>
                   </div>
                 ))}
               </div>
               <button className="w-full py-4 border-2 border-slate-100 rounded-[20px] text-xs font-black uppercase tracking-widest text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                 Mudar para Básico
               </button>
            </div>

            <div className="bg-slate-900 rounded-[40px] shadow-2xl p-10 space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={120} className="text-white" />
               </div>
               <div className="space-y-2 relative z-10">
                 <div className="flex items-center gap-2">
                   <h4 className="text-xl font-black text-white uppercase tracking-tighter">Plano Enterprise</h4>
                   <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Atual</span>
                 </div>
                 <p className="text-3xl font-black text-white tracking-tight">R$ 2.490,00 <span className="text-sm font-bold text-slate-500 uppercase">/mês</span></p>
               </div>
               <div className="space-y-4 relative z-10">
                 {[
                   'Busca ilimitada de editais',
                   'Disputas simultâneas ilimitadas',
                   'Robô de lances de alta performance',
                   'Auditoria forense avançada (Logs imutáveis)',
                   'IA de análise de riscos e Go/No-Go',
                   'Multi-tenant e suporte 24/7 via WhatsApp'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <Check size={16} className="text-blue-400" />
                     <span className="text-xs font-bold uppercase tracking-tight text-slate-400">{item}</span>
                   </div>
                 ))}
               </div>
               <div className="pt-4 relative z-10">
                 <div className="bg-blue-600/10 border border-blue-600/20 p-4 rounded-2xl flex items-center gap-3">
                   <div className="bg-blue-600 p-2 rounded-lg text-white">
                      <Zap size={16} className="fill-current" />
                   </div>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Você está economizando 15% no plano anual</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Histórico de Faturamento */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Receipt size={20} className="text-slate-400" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Histórico de Faturamento</h3>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Ver faturas completas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {billingHistory.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-all group">
                      <td className="px-10 py-5 text-[11px] font-black text-slate-800">{item.date}</td>
                      <td className="px-10 py-5 text-[11px] font-bold text-slate-500 uppercase">{item.description}</td>
                      <td className="px-10 py-5 text-[11px] font-black text-slate-800">{item.amount}</td>
                      <td className="px-10 py-5">
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-10 py-5 text-right">
                        {/* Fix: Use the imported Download icon */}
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100">
                          <Download size={14} className="mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'empresa' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-10 space-y-12">
              {/* Header Empresa */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group shrink-0">
                  <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex items-center justify-center text-slate-400 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all cursor-pointer overflow-hidden shadow-inner">
                    <Building2 size={56} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <Upload className="text-white mx-auto mb-1" size={24} />
                        <span className="text-[10px] text-white font-black uppercase">Alterar Logo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">WK3 Soluções Digitais Ltda</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tenant Público: wk3-saas-enterprise-01</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase shadow-sm flex items-center gap-2">
                      <CheckCircle2 size={14} /> Assinatura Ativa (Enterprise)
                    </span>
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase shadow-sm flex items-center gap-2">
                      <ShieldCheck size={14} /> Auditoria Forense Habilitada
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid de Informações Jurídicas */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 px-1">
                  <Landmark size={18} className="text-blue-600" />
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Informações Cadastrais e Jurídicas</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social*</label>
                    <input type="text" defaultValue="WK3 SOLUCOES DIGITAIS LTDA" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Fantasia</label>
                    <input type="text" defaultValue="WK3 SOLUTIONS" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ*</label>
                    <div className="relative">
                      <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" defaultValue="42.345.678/0001-90" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inscrição Estadual</label>
                    <input type="text" defaultValue="111.222.333.444" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inscrição Municipal</label>
                    <input type="text" defaultValue="8.765.432-1" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNAE Principal</label>
                    <input type="text" defaultValue="62.01-1-00 - Desenv. Software" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
              </div>

              {/* Endereço e Contatos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-100 pt-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-1">
                    <MapPin size={18} className="text-blue-600" />
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Localização da Sede</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço Completo</label>
                      <input type="text" defaultValue="Av. Paulista, 2000 - Bela Vista" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade</label>
                      <input type="text" defaultValue="São Paulo" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CEP</label>
                      <input type="text" defaultValue="01310-200" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-1">
                    <Mail size={18} className="text-blue-600" />
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Canais de Comunicação</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" defaultValue="contato@wk3.com.br" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone Principal</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" defaultValue="(11) 4004-9000" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-200">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Próximo Faturamento</p>
                  <p className="text-xs font-black text-slate-800 uppercase">01/12/2025 • R$ 2.490,00</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Última Atualização dos Dados</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase">10 de Novembro, 2025 às 14:22</p>
                 </div>
                 <button className="bg-slate-800 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center gap-2">
                    <Globe size={14} /> Ver Painel do Cliente
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usuários' && (
        <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-10 space-y-12">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Criar Novo Usuário</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Os usuários serão vinculados ao tenant: <span className="text-blue-600">WK3 Soluções Digitais</span></p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Usuário (E-mail)* <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Digite um usuário..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Nome e sobrenome* <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Digite um nome..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Data de nascimento <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Digite a data..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Cargo* <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Digite seu cargo..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Número de celular <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Digite seu Celular..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div className="space-y-2 col-span-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Perfil de busca <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                      <option>Selecione</option>
                      <option>Técnico em Licitações</option>
                      <option>Diretor Comercial</option>
                    </select>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Senha* <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Digite uma senha..." className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Confirmar senha* <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Confirme sua senha..." className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Tempo para expiração da senha <HelpCircle size={12} className="text-slate-300" /></label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                      <option>Selecione</option>
                      <option>30 dias</option>
                      <option>90 dias</option>
                      <option>Nunca expira</option>
                    </select>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="col-span-4 space-y-2">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                    {[
                      'Conter ao menos 1 caractere maiúsculo',
                      'Conter ao menos 1 caractere minúsculo',
                      'Conter ao menos 1 número',
                      'Conter ao menos 1 caractere especial (@, $, #, !, entre outros)',
                      'Mínimo de 10 caracteres'
                    ].map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase">
                        <div className="w-1.5 h-1.5 bg-rose-600 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="space-y-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Permissões</h3>
                  <div className="bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                    <Shield size={14} className="text-blue-500" /> Você precisa ser administrador para alterar as permissões.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Função* <HelpCircle size={12} className="text-slate-300" /></label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>Administrador</option>
                      <option>Operador</option>
                      <option>Financeiro</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">Permissões <HelpCircle size={12} className="text-slate-300" /></label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[18px] text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>Selecione</option>
                      <option>Configurações Globais</option>
                      <option>Relatórios Forenses</option>
                    </select>
                  </div>
                  <button className="bg-[#5c6d91] text-white px-6 py-4 rounded-[18px] text-xs font-black uppercase flex items-center justify-center gap-2 shadow-lg shadow-slate-100 hover:bg-[#4a5a7a] transition-all">
                    <Plus size={18} /> Adicionar Permissão
                  </button>
                </div>

                {/* Permissions List */}
                <div className="bg-slate-50/50 rounded-[32px] border border-slate-100 overflow-hidden">
                  <div className="divide-y divide-slate-100">
                    {permissionsList.map((perm, idx) => (
                      <div key={idx} className="px-8 py-4 flex items-center justify-between hover:bg-white transition-colors">
                        <span className="text-sm font-bold text-slate-700">{perm}</span>
                        <button className="text-rose-300 hover:text-rose-600 transition-colors">
                          <MinusCircle size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Actions */}
              <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                <button className="bg-white border border-slate-200 text-slate-400 px-10 py-4 rounded-[18px] text-xs font-black uppercase hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button className="bg-[#5c6d91] text-white px-12 py-4 rounded-[18px] text-xs font-black uppercase shadow-xl shadow-slate-100 flex items-center gap-2 hover:bg-[#4a5a7a] transition-all">
                   <UserPlus size={18} /> Criar novo usuário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notificações' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">Alertas de Disputa</h3>
              <div className="space-y-4">
                {[
                  { label: 'Lances de concorrentes', active: true },
                  { label: 'Início de sessão iminente', active: true },
                  { label: 'Mensagens do pregoeiro', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-amber-500 pl-4">Monitoramento AI</h3>
              <div className="space-y-4">
                {[
                  { label: 'Novos editais (Match de Keywords)', active: true },
                  { label: 'Alterações em editais favoritados', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button className="bg-[#1e293b] text-white px-8 py-2 rounded-lg font-black text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 uppercase">
              Salvar Configurações
            </button>
          </div>
        </div>
      )}

      {activeTab === 'sistema e backups' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-[32px] flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black text-blue-900 uppercase tracking-tight">Estado Atual: Protegido</h3>
              <p className="text-xs font-bold text-blue-700 uppercase opacity-70">O sistema possui um ponto de restauração selado para a versão estável atual.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center gap-2">
              <History size={18} className="text-slate-400" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Histórico de Snapshots</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {snapshots.map((snap) => (
                <div key={snap.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${snap.status === 'ATUAL' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {snap.status === 'ATUAL' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-800">{snap.id}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${
                          snap.status === 'ATUAL' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {snap.status}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase mt-1">{snap.desc}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{snap.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {snap.status !== 'ATUAL' && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-white transition-all">
                        <RefreshCcw size={14} /> Restaurar Este Ponto
                      </button>
                    )}
                    <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segurança' && (
        <div className="p-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200 animate-in fade-in duration-300">
           <div className="max-w-md mx-auto space-y-4">
              <div className="bg-slate-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                 <ShieldCheck size={32} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Segurança de Dados Forense</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">Configurações de Criptografia AES-256 e Logs Imutáveis em carga...</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
