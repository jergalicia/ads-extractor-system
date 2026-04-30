import React, { useState } from 'react';
import { Search as SearchIcon, Globe2, Activity, Filter, Loader2 } from 'lucide-react';
import axios from 'axios';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('PA');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

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
      const msg = error.response?.data?.details || error.message;
      alert(`Error en la búsqueda: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Buscador Inteligente</h2>
        <p className="text-slate-400 mt-1">Extrae prospectos directamente de Meta Ads Library.</p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <label className="block text-slate-400 text-sm font-medium mb-2">Palabra Clave</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                className="w-full pl-10"
                placeholder="Ej: Clínica dental"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">País</label>
            <div className="relative">
              <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <select className="w-full pl-10 appearance-none" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="ALL">Todos los países</option>
                <option value="PA">Panamá</option>
                <option value="CO">Colombia</option>
                <option value="MX">México</option>
                <option value="ES">España</option>
                <option value="US">Estados Unidos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Estado Anuncios</label>
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <select className="w-full pl-10 appearance-none" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="all">Todos</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 h-[42px]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <SearchIcon size={20} />}
              {loading ? 'Buscando...' : 'Iniciar Extracción'}
            </button>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Resultados Encontrados</h3>
            <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20">
              {results.length} Empresas
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Empresa</th>
                  <th className="p-4 font-semibold">Ubicación</th>
                  <th className="p-4 font-semibold">Anuncios</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {results.map((company, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{company.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{country}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs font-bold">
                        {company.ads.length} Activos
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-white/5 h-2 rounded-full max-w-[80px]">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold">Detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
