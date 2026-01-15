
import React, { useState } from 'react';
import { Tag, X, Plus } from 'lucide-react';

const KeywordsManager: React.FC = () => {
  const [tags, setTags] = useState([
    { id: '1', text: 'MATERIAL MÉDICO', priority: 'HIGH' },
    { id: '2', text: 'LABORATÓRIO', priority: 'MEDIUM' },
    { id: '3', text: 'CADEIRA RODAS', priority: 'LOW' },
  ]);

  const [input, setInput] = useState('');

  const priorityColors = {
    HIGH: 'bg-rose-100 text-rose-700 border-rose-200',
    MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200',
    LOW: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag size={18} className="text-blue-500" />
        <h3 className="font-bold text-slate-900 text-sm">Palavras-chave Ativas</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <div key={tag.id} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${priorityColors[tag.priority as keyof typeof priorityColors]}`}>
            {tag.text}
            <button className="hover:opacity-60 transition-opacity">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nova tag..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
        />
        <button className="bg-slate-100 text-slate-600 p-2 rounded-lg hover:bg-slate-200 transition-colors">
          <Plus size={16} />
        </button>
      </div>
      
      <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
        * As tags com maior prioridade influenciam o algoritmo de notificação e o filtro automático de editais.
      </p>
    </div>
  );
};

export default KeywordsManager;
