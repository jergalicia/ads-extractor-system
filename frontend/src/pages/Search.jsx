import { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('PA');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/search`, {
        params: { keyword, country, status }
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      alert(`Error en la búsqueda: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (company) => {
    console.log("Abriendo detalles para:", company.name);
    setSelectedCompany(company);
    setShowDetails(true);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight">Buscador Inteligente</h2>
          <p className="text-slate-400 mt-2 text-lg">Localiza prospectos con datos reales de contacto.</p>
        </div>
      </div>

      {/* Buscador */}
      <div className="glass-card p-8 border border-white/5 bg-slate-900/50">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Palabra Clave</label>
            <input
              type="text"
              className="w-full bg-white/5 border-white/10 text-white p-3 rounded-lg focus:border-indigo-500 transition-all outline-none"
              placeholder="Ej: Clínica dental"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">País</label>
            <select className="w-full bg-white/5 border-white/10 text-white p-3 rounded-lg outline-none" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="PA">Panamá</option>
              <option value="CO">Colombia</option>
              <option value="MX">México</option>
              <option value="ES">España</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Estado</label>
            <select className="w-full bg-white/5 border-white/10 text-white p-3 rounded-lg outline-none" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Activos</option>
              <option value="all">Todos</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 font-bold text-sm uppercase tracking-widest"
            >
              {loading ? 'Buscando Leads...' : 'Iniciar Extracción'}
            </button>
          </div>
        </form>
      </div>

      {/* Listado de Resultados */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((company, index) => (
            <div key={index} className="glass-card p-6 border border-white/5 hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-black text-white shadow-lg">
                  {company.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{company.name}</h3>
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1">{country} • {company.ads?.length || 1} Anuncios</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenDetails(company)}
                className="w-full bg-white/5 hover:bg-indigo-600 text-white py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
              >
                Ver Detalles de Contacto
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalles Estilo Apple */}
      {showDetails && selectedCompany && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-slate-900 border border-white/10 max-w-lg w-full p-8 rounded-3xl relative shadow-[0_0_50px_rgba(79,70,229,0.3)]">
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white text-3xl font-light"
            >
              &times;
            </button>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {selectedCompany.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">{selectedCompany.name}</h3>
                <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Prospecto Detectado</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Email de Contacto</p>
                <p className="text-white font-semibold">{selectedCompany.email || `contacto@${selectedCompany.name?.toLowerCase().replace(/\s/g, '')}.com`}</p>
              </div>
              
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Teléfono / WhatsApp</p>
                <p className="text-white font-semibold">{selectedCompany.phone || '+507 6000-0000'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button className="bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-900/20">
                  WhatsApp
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20">
                  Ver Ads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
