
import React, { useState, useEffect } from 'react';
import { Search, PlusSquare, Zap, Activity, Info, Newspaper, ExternalLink, RefreshCw, Scale, Globe, ShieldCheck, Database, CalendarDays, Landmark, Target, Briefcase } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  category: 'Portal' | 'Legislação' | 'Novidade' | 'Mercado';
  date: string;
}

interface SelectedBidSummary {
  id: string;
  orgao: string;
  numero: string;
  uasg: string;
  dataPregao: string;
}

const MOCK_SELECTED_RADAR: SelectedBidSummary[] = [
  {
    id: '1',
    orgao: 'AGU - Advocacia Geral da União',
    numero: '90027/2025',
    uasg: '110792',
    dataPregao: '13/11/2025'
  },
  {
    id: '2',
    orgao: 'SESC SP - Serviço Social do Comércio',
    numero: '045/2024',
    uasg: '925001',
    dataPregao: '28/10/2024'
  },
  {
    id: '3',
    orgao: 'ANP - Agência Nacional do Petróleo',
    numero: '112/2025',
    uasg: '300010',
    dataPregao: '15/01/2025'
  },
  {
    id: '4',
    orgao: 'Ministério da Defesa',
    numero: '45/2024',
    uasg: '120001',
    dataPregao: '15/11/2025'
  }
];

const MOCK_NEWS_FALLBACK: NewsItem[] = [
  {
    title: "Novas funcionalidades no Compras.gov.br",
    summary: "Portal do Governo Federal implementa melhorias na fase de lances e novos filtros de busca por região.",
    url: "https://www.gov.br/compras/pt-br",
    category: "Portal",
    date: "Hoje"
  },
  {
    title: "Atualização Lei 14.133/2021",
    summary: "Supremo Tribunal Federal decide sobre a aplicação de sanções em contratos vigentes da nova lei.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm",
    category: "Legislação",
    date: "Ontem"
  },
  {
    title: "BLL lança módulo de inteligência",
    summary: "Bolsa de Licitações e Leilões atualiza plataforma para suportar lances automáticos via API oficial.",
    url: "https://bll.org.br/",
    category: "Portal",
    date: "3 dias atrás"
  },
  {
    title: "Expansão do Mercado de Dispensa Eletrônica",
    summary: "Volume de compras via dispensa eletrônica cresce 25% no primeiro semestre com a adesão de novos municípios.",
    url: "https://www.gov.br/compras",
    category: "Mercado",
    date: "Esta semana"
  }
];

const NEWS_CACHE_KEY = 'licitared_news_cache_v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBiddingNews = async (forceRefresh = false) => {
    setIsLoading(true);

    if (!forceRefresh) {
      const cachedData = localStorage.getItem(NEWS_CACHE_KEY);
      if (cachedData) {
        try {
          const { timestamp, data } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setNews(data);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error("Erro ao ler cache de notícias:", e);
        }
      }
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Liste as 4 principais notícias recentes (últimos 30 dias) sobre o portal Compras.gov.br, atualizações da Lei 14.133/2021 (Nova Lei de Licitações) ou novidades no mercado de licitações públicas no Brasil. Retorne um JSON com um array de objetos contendo: title, summary, url e category (Portal, Legislação, Mercado). Use apenas notícias reais.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      let finalNews = MOCK_NEWS_FALLBACK;

      if (text) {
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
          try {
            const parsedNews = JSON.parse(jsonMatch[0]);
            finalNews = parsedNews.map((n: any) => ({ ...n, date: 'Recente' }));
          } catch (e) {
            console.warn("Falha no parse do JSON da API, usando fallback.");
          }
        }
      }

      setNews(finalNews);
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: finalNews
      }));

    } catch (error) {
      console.warn("Erro na API (429 ou Quota). Usando dados locais.", error);
      setNews(MOCK_NEWS_FALLBACK);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBiddingNews();
  }, []);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Portal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Legislação': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Mercado': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Portal': return <Globe size={14} />;
      case 'Legislação': return <Scale size={14} />;
      case 'Mercado': return <Activity size={14} />;
      default: return <Newspaper size={14} />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Radar de Licitações Selecionadas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Editais no Radar de Participação</h2>
           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">Atualizado em Tempo Real</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SELECTED_RADAR.map((bid) => (
            <div key={bid.id} className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Briefcase size={32} className="text-slate-900" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Órgão / Cliente</span>
                  <h3 className="text-sm font-black text-slate-800 uppercase leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">{bid.orgao}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Edital</span>
                    <p className="text-[11px] font-black text-slate-700">{bid.numero}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase">UASG</span>
                    <p className="text-[11px] font-black text-slate-700">{bid.uasg}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3 group-hover:bg-blue-50 transition-colors">
                  <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm border border-slate-200">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase leading-none">Pregão em</p>
                    <p className="text-xs font-black text-slate-800 uppercase mt-1">{bid.dataPregao}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligent News Feed */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Radar de Inteligência e Notícias</h2>
            <div className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-black flex items-center gap-1 border border-blue-100">
              <Zap size={10} className="fill-current" /> AI POWERED
            </div>
          </div>
          <button 
            onClick={() => fetchBiddingNews(true)}
            disabled={isLoading}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-black hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Forçar Atualização
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse h-40"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item, i) => (
              <a 
                key={i} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-50/50 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-blue-500" />
                </div>
                
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</span>
                  </div>
                  <h4 className="font-black text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
