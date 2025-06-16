import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code, Users, Tag, Zap, Gauge, Clock, CheckCircle, 
  Target, ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify';
import { apiData, collections } from '../../utils/data';
import ContactModal from './ContactModal';
import Spinner from './Spinner';

const analyticsEndpointUsage = collections.flatMap(collection => 
    collection.endpoints.map(endpoint => ({
        name: endpoint.name,
        value: Math.floor(Math.random() * 2000) + 50
    }))
).sort((a, b) => b.value - a.value).slice(0, 5);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between hover:bg-background transition-all transform hover:-translate-y-1 shadow-sm">
    <div className="flex items-center justify-between text-muted">
      <span>{label}</span>
      {icon}
    </div>
    <div className="mt-2">
      <span className="text-3xl font-bold text-foreground">{value}</span>
    </div>
  </div>
);

const PlanCard = ({ plan, onPlanSelect, isLoading }) => {
    const { title, price, active, features } = plan;
    const [integer, decimal] = price.replace('$', '').split('.');

    return (
        <div className={`p-6 w-full border rounded-lg transition-all duration-300 flex flex-col gap-6 ${active ? 'border-accent ring-2 ring-accent bg-accent/5' : 'border-border bg-card'}`}>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground">{title}</h4>
                    <ul className="mt-4 space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-shrink-0 flex flex-col items-center md:items-end">
                    <p className="flex items-baseline text-foreground">
                        <span className="text-2xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">{integer}</span>
                        <span className="text-2xl font-semibold">.{decimal}</span>
                    </p>
                    <p className="text-sm text-muted -mt-1">Per Month</p>
                </div>
            </div>

            <div>
                <button 
                    onClick={() => onPlanSelect(plan)}
                    disabled={active || isLoading}
                    className={`w-full py-2.5 font-semibold rounded-md transition-colors flex items-center justify-center ${active ? 'bg-accent/30 text-accent-hover cursor-not-allowed' : 'bg-accent text-white hover:bg-accent-hover'}`}
                >
                    {isLoading ? <Spinner /> : (active ? 'Current Plan' : 'Subscribe')}
                </button>
            </div>
        </div>
    );
};

const CollectionRow = ({ collection }) => {
  if (!collection.endpoints || collection.endpoints.length === 0) {
    return null;
  }

  const firstEndpointSlug = collection.endpoints[0].slug;

  return (
    <Link 
      to={`/endpoint/${firstEndpointSlug}`} 
      className="flex items-center justify-between p-4 -m-2 rounded-lg hover:bg-footer-bg transition-colors group"
    >
      <div className="flex flex-col">
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{collection.name}</h3>
        <p className="text-sm text-muted-foreground">{collection.endpoints.length} endpoints</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
};

const AnalyticsChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxValue = Math.max(...data);
  const labels = ['7d ago', '6d', '5d', '4d', '3d', '2d', 'Today'];

  return (
    <div className="relative" onMouseLeave={() => setHoveredIndex(null)}>
      <div 
        className="w-full h-56 rounded-lg flex items-end gap-2 p-4 pt-8"
        style={{
          backgroundImage: 'repeating-linear-gradient(to top, #27272a 1px, transparent 1px, transparent 20%)',
          backgroundSize: '100% 20%'
        }}
      >
        {data.map((val, i) => (
          <div 
            key={i} 
            className="flex-1 rounded-t-md transition-all duration-300 ease-out cursor-pointer group" 
            style={{ height: `${(val / maxValue) * 100}%` }}
            onMouseEnter={() => setHoveredIndex(i)}
          >
             <div className="w-full h-full rounded-t-md bg-gradient-to-t from-accent/70 to-accent group-hover:from-accent group-hover:to-purple-500"></div>
          </div>
        ))}
      </div>
      
      {hoveredIndex !== null && (
        <div 
          className="absolute bg-background text-white text-xs font-bold px-2 py-1 rounded-md pointer-events-none shadow-lg border border-border"
          style={{
            top: `${70 - (data[hoveredIndex] / maxValue) * 80}%`,
            left: `${(hoveredIndex / data.length) * 100 + (1 / data.length / 2) * 100}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {data[hoveredIndex].toLocaleString()}
        </div>
      )}

      <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
        {labels.map(label => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
};

const EndpointUsageList = ({ data }) => (
    <div className="p-6 bg-card border border-border rounded-xl">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Top Endpoint Usage</h3>
        <div className="space-y-4">
            {data.map(ep => (
                <div key={ep.name}>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{ep.name}</span>
                        <span className="font-semibold text-foreground">{ep.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-footer-bg rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: `${(ep.value / Math.max(...data.map(d => d.value))) * 100}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function ApiOverview() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotifying, setIsNotifying] = useState(false);
    const [loadingPlanId, setLoadingPlanId] = useState(null);
    const navigate = useNavigate();

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

    const handlePlanSelect = (plan) => {
        if (!plan.stripeLink) return;
        setLoadingPlanId(plan.id);
        setTimeout(() => {
            window.location.href = plan.stripeLink;
        }, 1500);
    };

    return (
        <>
            <div className="space-y-10">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                    <main className="flex-1 space-y-10 w-full">
                        <header className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <h1 className="text-3xl font-bold text-foreground">{apiData.name}</h1>
                                    <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        <CheckCircle className="h-3.5 w-3.5"/>
                                        Operational
                                    </span>
                                </div>
                                <p className="text-muted-foreground mt-1">{apiData.tagline}</p>
                            </div>
                        </header>
                        <section>
                            <div className="grid grid-cols-2 gap-6">
                                <StatCard icon={<Zap className="w-5 h-5"/>} label="Popularity" value={apiData.stats.popularity} />
                                <StatCard icon={<Gauge className="w-5 h-5"/>} label="Uptime" value={apiData.stats.serviceLevel} />
                                <StatCard icon={<Clock className="w-5 h-5"/>} label="Avg. Latency" value={apiData.stats.latency} />
                                <StatCard icon={<Target className="w-5 h-5"/>} label="Success Rate" value={apiData.stats.testSuccess} />
                            </div>
                        </section>
                        <section>
                            <div className="p-6 bg-card border border-border rounded-xl">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h2 className="text-xl font-bold text-foreground">Analytics</h2>
                                    <p className="text-sm text-muted-foreground">Last 7 Days</p>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">Total calls this period: {(Math.floor(Math.random() * 5000) + 2000).toLocaleString()}</p>
                                <AnalyticsChart data={Array.from({length: 7}, () => Math.floor(Math.random() * 1200))} />
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-foreground mb-4">Pricing Plan</h2>
                            <div className="flex justify-center mt-6">
                                {apiData.plans.map(plan => (
                                    <PlanCard key={plan.id} plan={plan} onPlanSelect={handlePlanSelect} isLoading={loadingPlanId === plan.id} />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-foreground mb-4">API Collections</h2>
                            <div className="p-6 bg-card border border-border rounded-xl">
                                <div className="space-y-1 divide-y divide-border -my-2">
                                    {collections.map(collection => (
                                        <CollectionRow key={collection.id} collection={collection} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-8">
                        <div id="contact-provider" className="p-6 bg-card border border-border rounded-xl space-y-6">
                            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Provider Info</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Creator</span> <div className="flex items-center gap-2"><Code className="h-4 w-4 text-accent" /><span className="font-semibold text-foreground">{apiData.provider}</span></div></div>
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Subscribers</span> <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted" /><span className="font-semibold text-foreground">{apiData.subscribers.toLocaleString()}</span></div></div>
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Category</span> <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-muted" /><span className="bg-footer-bg text-muted px-2 py-0.5 rounded-md text-sm">{apiData.category}</span></div></div>
                            </div>
                            <div className="pt-6 border-t border-border space-y-2">
                                <button onClick={() => setIsModalOpen(true)} className="w-full py-2.5 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors">Contact Provider</button>
                                <button onClick={handleGetNotifications} disabled={isNotifying} className="w-full py-2.5 font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                                    {isNotifying ? <Spinner/> : 'Get Notifications'}
                                </button>
                            </div>
                        </div>
                        <EndpointUsageList data={analyticsEndpointUsage} />
                    </aside>
                </div>
            </div>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSend={handleSendMessage} />
        </>
    );
}