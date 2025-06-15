import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { collections } from '../../utils/data';

const EndpointLink = ({ to, method, name }) => {
    const getMethodColor = (m) => {
        switch(m) {
            case 'POST': return 'text-green-600';
            case 'GET': return 'text-blue-600';
            case 'PUT': return 'text-orange-600';
            case 'DELETE': return 'text-red-600';
            default: return 'text-muted';
        }
    }
    return (
      <li>
        <NavLink to={to} className={({ isActive }) => `flex items-center group py-1.5 px-2 rounded-md transition-colors ${isActive ? 'bg-accent/10' : 'hover:bg-background'}`}>
          <span className={`w-16 text-left text-xs font-bold ${getMethodColor(method)}`}>{method}</span>
          <span className="text-sm text-muted group-hover:text-foreground">{name}</span>
        </NavLink>
      </li>
    );
};

const Collection = ({ collection, searchTerm }) => {
    const [isOpen, setIsOpen] = useState(true);

    const filteredEndpoints = collection.endpoints.filter(ep => 
        ep.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm && filteredEndpoints.length === 0) {
        return null;
    }

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-background">
                <span className="font-semibold text-sm text-foreground">{collection.name}</span>
                <ChevronRight className={`h-4 w-4 text-muted transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <ul className="pl-4 mt-1 space-y-1 border-l border-border ml-2">
                    {filteredEndpoints.map(endpoint => (
                        <EndpointLink key={endpoint.slug} to={`/endpoint/${endpoint.slug}`} {...endpoint} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function MainSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <aside className="w-80 bg-card border-r border-border p-4 flex-shrink-0 hidden md:flex flex-col">
      <NavLink 
        to="/dashboard" 
        end
        className={({ isActive }) => `block mb-4 py-2 px-3 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-accent/10 text-accent' : 'bg-footer-bg text-foreground'}`}
      >
        API Overview
      </NavLink>

      <div className="mb-4">
        <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Version</label>
        <div className="relative mt-1">
          <button disabled className="w-full text-left flex justify-between items-center pl-3 pr-2 py-2 text-sm bg-background border border-border rounded-md cursor-not-allowed opacity-70">
            <span>1.0.0 (current)</span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border flex flex-col flex-1 min-h-0">
        <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Endpoints</h3>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Filter endpoints..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent" 
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {collections.map(collection => (
              <Collection key={collection.id} collection={collection} searchTerm={searchTerm} />
          ))}
        </div>
      </div>
    </aside>
  );
}