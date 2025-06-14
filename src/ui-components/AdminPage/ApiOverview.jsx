import { useState } from 'react';
import { Star, Code, Users, Tag, Zap, Gauge, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { apiData } from '../../utils/data';
import ContactModal from './ContactModal';
import Spinner from './Spinner';

const StatCard = ({ icon, label, value }) => (
  <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-background transition-all transform hover:-translate-y-1 shadow-sm">
    {icon}
    <span className="text-xl font-bold mt-2 text-foreground">{value}</span>
    <span className="text-sm text-muted">{label}</span>
  </div>
);

const PlanCard = ({ title, price, active }) => (
  <div className={`relative p-6 border rounded-lg text-center transition-all duration-300 overflow-hidden ${active ? 'border-accent ring-2 ring-accent bg-accent/5' : 'border-border bg-card hover:border-accent'}`}>
    <h4 className="font-semibold text-muted">{title}</h4>
    <p className="mt-1 text-2xl font-bold text-foreground">{price} <span className="font-normal text-muted-foreground">/ mo</span></p>
    {active && <span className="mt-4 inline-block text-xs font-semibold text-accent-hover bg-accent/20 px-3 py-1 rounded-full">Current Plan</span>}
  </div>
);

export default function ApiOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  const handleSendMessage = () => {
    setIsModalOpen(false);
    toast.success('Message sent successfully!');
  };
  
  const handleGetNotifications = () => {
    setIsNotifying(true);
    setTimeout(() => {
        setIsNotifying(false);
        toast.success('Notifications enabled!');
    }, 2000);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg"><Zap className="h-8 w-8 text-accent" /></div>
                <div><h1 className="text-3xl font-bold text-foreground">{apiData.name}</h1><p className="text-muted">{apiData.tagline}</p></div>
              </div>
              <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-border'}`} />)}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Zap className="w-6 h-6 text-accent"/>} label="Popularity" value={apiData.stats.popularity} />
                <StatCard icon={<Gauge className="w-6 h-6 text-green-500"/>} label="Service Level" value={apiData.stats.serviceLevel} />
                <StatCard icon={<Clock className="w-6 h-6 text-blue-500"/>} label="Latency" value={apiData.stats.latency} />
                <StatCard icon={<CheckCircle className="w-6 h-6 text-teal-500"/>} label="Success" value={apiData.stats.testSuccess} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{apiData.plans.map(plan => <PlanCard key={plan.title} {...plan} />)}</div>
            </div>
          </div>
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="p-6 bg-card border border-border rounded-xl space-y-6">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Provider Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">API CREATOR</p>
                    <div className="flex items-center gap-2 mt-1"><Code className="h-5 w-5 text-accent" /><span className="font-semibold text-accent">{apiData.provider}</span></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">SUBSCRIBERS</p>
                    <div className="flex items-center gap-2 mt-1"><Users className="h-5 w-5 text-muted" /><span className="font-semibold text-foreground">{apiData.subscribers}</span></div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">CATEGORY</p>
                    <div className="flex items-center gap-2 mt-1"><Tag className="h-5 w-5 text-muted" /><span className="bg-footer-bg text-muted px-2 py-0.5 rounded-md text-sm">{apiData.category}</span></div>
                  </div>
                </div>
                <div className="pt-6 border-t border-border space-y-2">
                    <button onClick={() => setIsModalOpen(true)} className="w-full py-2.5 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors">Contact Provider</button>
                    <button onClick={handleGetNotifications} disabled={isNotifying} className="w-full py-2.5 font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                        {isNotifying ? <><Spinner/> Enabling...</> : 'Get Notifications'}
                    </button>
                </div>
            </div>
          </aside>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSend={handleSendMessage} />
    </>
  );
}