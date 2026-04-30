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
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-3xl font-bold text-white">Buscador</h2>
      
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Palabra clave" 
            className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="PA">Panamá</option>
            <option value="CO">Colombia</option>
          </select>
          <select className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Activos</option>
          </select>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.map((company, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">{company.name}</h3>
              <p className="text-slate-400">Anuncios detectados: {company.ads?.length || 1}</p>
            </div>
            <button 
              onClick={() => { setSelectedCompany(company); setShowDetails(true); }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {showDetails && selectedCompany && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full relative">
            <button onClick={() => setShowDetails(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-4">{selectedCompany.name}</h3>
            <div className="space-y-4 text-slate-300">
              <p><strong>Email:</strong> contacto@{selectedCompany.name?.toLowerCase().replace(/\s/g, '')}.com</p>
              <p><strong>Teléfono:</strong> +507 6000-0000</p>
              <div className="pt-4 flex gap-2">
                <button className="flex-1 bg-green-600 py-2 rounded-lg font-bold">WhatsApp</button>
                <button className="flex-1 bg-indigo-600 py-2 rounded-lg font-bold">Meta Ads</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
