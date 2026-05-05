import React, { useEffect, useState } from 'react';
import { Sparkles, Send, RefreshCw, Download } from 'lucide-react';
import { generateReviewSummary, chatWithConcierge } from '../services/aiService';

export const AIReviewSummary: React.FC<{ businessName: string; businessDescription: string }> = ({ businessName, businessDescription }) => {
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const result = await generateReviewSummary(businessName, businessDescription);
        if (mounted) setSummary(result || []);
      } catch (e) {
        console.error('AI Review Error', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [businessName, businessDescription]);

  if (loading) return (
    <div className="flex items-center gap-3 text-gray-500 text-sm">
      <RefreshCw className="animate-spin text-gold-500" /> Synthesizing guest feedback...
    </div>
  );

  if (!summary || summary.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-4">
      {summary.map((s, i) => (
        <li key={i} className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-2xl bg-gold-500/5 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles size={14} className="opacity-80" />
          </div>
          <div className="text-gray-300 italic">{s}</div>
        </li>
      ))}
    </ul>
  );
};

export const ConciergeChat: React.FC<{ businessName: string; businessDescription: string; onUserSend?: () => void }> = ({ businessName, businessDescription, onUserSend }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: `Welcome to ${businessName}. I'm your concierge — how can I help today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const user = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: user }]);
    if (onUserSend) onUserSend();
    setInput('');
    setIsTyping(true);
    try {
      const prompt = `User asking about ${businessName}. Description: ${businessDescription}. Question: ${user}`;
      const resp = await chatWithConcierge(prompt, messages);
      setMessages(prev => [...prev, { sender: 'ai', text: resp }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I can't reach the concierge right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const exportConversation = () => {
    const text = messages.map(m => `${m.sender === 'user' ? 'You' : 'Concierge'}: ${m.text}`).join('\n\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `${businessName}-concierge-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-white/10 text-white' : 'bg-gold-500/10 text-gray-200'}`}>{m.text}</div>
          </div>
        ))}
        {isTyping && (<div className="text-sm text-gray-400">Concierge is typing...</div>)}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about this business..." className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none" />
        <button onClick={send} className="bg-gold-500 text-black p-2.5 rounded-xl"><Send size={16} /></button>
        {messages.length > 2 && <button onClick={exportConversation} className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-colors" title="Download conversation"><Download size={16} /></button>}
      </div>
    </div>
  );
};

export default AIReviewSummary;
