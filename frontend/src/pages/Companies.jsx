import React, { useState, useEffect } from 'react';
import { Building2, Globe2, Phone, Mail, ExternalLink, Filter, Download } from 'lucide-react';
import axios from 'axios';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type) => {
    window.open(`http://localhost:3000/api/export/${type}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Base de Datos</h2>
          <p className="text-slate-400 mt-1">Todas las empresas extraídas hasta el momento.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleExport('excel')} className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-500/20 transition-all">
            <Download size={18} />
            Excel
          </button>
          <button onClick={() => handleExport('csv')} className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500/20 transition-all">
            <Download size={18} />
            CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Cargando empresas...</div>
        ) : companies.length === 0 ? (
          <div className="glass-card p-20 text-center text-slate-400">
            <Building2 size={48} className="mx-auto mb-4 opacity-20" />
            <p>No hay empresas registradas aún. ¡Inicia una búsqueda!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div key={company.id} className="glass-card p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {company.company_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{company.company_name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Globe2 size={12} /> {company.country}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    company.opportunity_score > 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    Score: {company.opportunity_score}
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Anuncios:</span>
                    <span className="text-white font-medium">{company.ads_count} activos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Categoría:</span>
                    <span className="text-white font-medium">{company.industry || 'General'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <a href={`tel:${company.phone}`} className="flex items-center justify-center gap-2 p-2 bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-medium">
                    <Phone size={14} /> Llamar
                  </a>
                  <a href={`mailto:${company.email}`} className="flex items-center justify-center gap-2 p-2 bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-medium">
                    <Mail size={14} /> Email
                  </a>
                  {company.website_url && (
                    <a href={company.website_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-2 bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-medium col-span-2">
                      <ExternalLink size={14} /> Visitar Web
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
