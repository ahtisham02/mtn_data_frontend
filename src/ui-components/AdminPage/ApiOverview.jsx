import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code, Users, Tag, Zap, Gauge, Clock, CheckCircle, 
  Clipboard, Target
} from 'lucide-react';
import { toast } from 'react-toastify';
import ContactModal from './ContactModal';
import Spinner from './Spinner';

export const apiData = {
  name: 'MtnAPI Services',
  provider: 'Mtn Devs',
  tagline: 'A suite of powerful, reliable APIs for modern applications.',
  subscribers: 1842,
  category: 'Developer Tools',
  status: 'Operational',
  stats: {
    popularity: '9.9/10',
    serviceLevel: '99.8%',
    latency: '120ms',
    testSuccess: '99%',
  },
  plans: [
    { id: 'plan_basic', title: 'BASIC', price: '$0.00', active: true },
    { id: 'plan_pro', title: 'PRO', price: '$49.00', active: false, stripeLink: 'https://buy.stripe.com/test_28E3cv32C1mi9HFd2A7wA02' },
    { id: 'plan_ultra', title: 'ULTRA', price: '$199.00', active: false, stripeLink: 'https://buy.stripe.com/test_28E6oH6eO9SO4nl3s07wA01' },
    { id: 'plan_enterprise', title: 'Enterprise', price: 'Custom', active: false, type: 'contact' }
  ],
  analytics: {
    calls: [301, 404, 652, 801, 559, 903, 1120],
  },
};

export const collections = [
  {
    id: 'user-management',
    name: 'User Management API',
    endpoints: [
      { slug: 'create-user', method: 'POST', name: 'Create User', url: 'https://api.mtn.com/v1/users' },
      { slug: 'get-user', method: 'GET', name: 'Get User by ID', url: 'https://api.mtn.com/v1/users/usr_12345' },
      { slug: 'update-user', method: 'PUT', name: 'Update User', url: 'https://api.mtn.com/v1/users/usr_12345' },
      { slug: 'delete-user', method: 'DELETE', name: 'Delete User', url: 'https://api.mtn.com/v1/users/usr_12345' }
    ]
  },
  {
    id: 'linkedin-scraper',
    name: 'LinkedIn ScraperX',
    endpoints: [
      { slug: 'person-followers-count', method: 'POST', name: 'Person Followers Count', url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/followers' },
      { slug: 'person-skills', method: 'GET', name: 'Person Skills', url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/person/skills' },
      { slug: 'update-scrape-config', method: 'PUT', name: 'Update Scrape Config', url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/config' },
      { slug: 'delete-scrape-job', method: 'DELETE', name: 'Delete Scrape Job', url: 'https://mtn-linkedin-scraperx-api.p.mtnapi.com/api/job/job_xyz' }
    ]
  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway API',
    endpoints: [
      { slug: 'create-charge', method: 'POST', name: 'Create Charge', url: 'https://api.mtn.com/v1/charge' },
      { slug: 'get-charge', method: 'GET', name: 'Get Charge Details', url: 'https://api.mtn.com/v1/charge/ch_9876' },
      { slug: 'update-charge-metadata', method: 'PUT', name: 'Update Charge Metadata', url: 'https://api.mtn.com/v1/charge/ch_9876' },
      { slug: 'refund-charge', method: 'DELETE', name: 'Refund Charge', url: 'https://api.mtn.com/v1/charge/ch_9876/refund' }
    ]
  }
];

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
    const { title, price, active, type } = plan;

    return (
        <div className={`relative p-6 border rounded-lg text-center transition-all duration-300 overflow-hidden flex flex-col justify-between ${active ? 'border-accent ring-2 ring-accent bg-accent/5' : 'border-border bg-card hover:border-accent'}`}>
            <div>
                <h4 className="font-semibold text-muted">{title}</h4>
                <p className="mt-1 text-3xl font-bold text-foreground">{price} {price !== 'Custom' && <span className="font-normal text-sm text-muted-foreground">/ mo</span>}</p>
                {active && <span className="mt-4 inline-block text-xs font-semibold text-accent-hover bg-accent/20 px-3 py-1 rounded-full">Current Plan</span>}
            </div>
            <div className="mt-6">
                 <button 
                    onClick={() => onPlanSelect(plan)}
                    disabled={active && type !== 'contact' || isLoading}
                    className={`w-full py-2 font-semibold rounded-md transition-colors flex items-center justify-center ${active && type !== 'contact' ? 'bg-accent/30 text-accent-hover cursor-not-allowed' : 'bg-accent text-white hover:bg-accent-hover'}`}
                >
                    {isLoading ? <Spinner /> : (type === 'contact' ? 'Contact Support' : (active ? 'Active' : 'Upgrade'))}
                </button>
            </div>
        </div>
    );
};

const EndpointRow = ({ method, name, url, slug }) => {
    const methodColors = {
        'GET': 'text-green-400 bg-green-400/10',
        'POST': 'text-blue-400 bg-blue-400/10',
        'PUT': 'text-yellow-400 bg-yellow-400/10',
        'DELETE': 'text-red-400 bg-red-400/10',
    };

    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(url);
        toast.success("Endpoint URL copied!");
    };

    return (
        <Link to={`/endpoint/${slug}`} className="flex items-center p-3 -mx-3 rounded-lg hover:bg-footer-bg transition-colors group">
            <div className="flex-grow flex items-center gap-4">
                <span className={`w-16 text-center text-xs font-bold px-2 py-1 rounded-md ${methodColors[method] || 'text-gray-400 bg-gray-400/10'}`}>
                    {method}
                </span>
                <p className="font-semibold text-sm text-foreground">{name}</p>
                <p className="font-mono text-sm text-muted-foreground hidden md:block">- {url}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleCopy}>
                <Clipboard className="h-4 w-4 text-muted-foreground hover:text-accent"/>
            </button>
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
        if (plan.type === 'contact') {
            navigate('/', { state: { scrollTo: 'booking' } });
            return;
        }

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
                                        {apiData.status}
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
                                <p className="text-sm text-muted-foreground mb-4">Total calls this period: {apiData.analytics.calls.reduce((a, b) => a + b, 0).toLocaleString()}</p>
                                <AnalyticsChart data={apiData.analytics.calls} />
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-foreground mb-4">Available Plans</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {apiData.plans.map(plan => (
                                    <PlanCard key={plan.id} plan={plan} onPlanSelect={handlePlanSelect} isLoading={loadingPlanId === plan.id} />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-foreground mb-4">API Endpoints</h2>
                            <div className="p-6 bg-card border border-border rounded-xl">
                                <div className="space-y-6">
                                    {collections.map(collection => (
                                        <div key={collection.id}>
                                            <h3 className="text-lg font-semibold text-foreground mb-3">{collection.name}</h3>
                                            <div className="space-y-2">
                                                {collection.endpoints.map(ep => <EndpointRow key={ep.slug} {...ep} />)}
                                            </div>
                                        </div>
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