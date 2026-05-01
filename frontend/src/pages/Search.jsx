import { useState } from 'react';
import axios from 'axios';
import { 
  Mail, 
  Phone, 
  Globe, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  X, 
  TrendingUp,
  Search as SearchIcon
} from 'lucide-react';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('PA');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('/api/search', {
        params: { keyword, country }
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
      alert("Error en la búsqueda: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (company) => {
    setSelected(company);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">AdsExtractor <span className="text-indigo-500">Pro</span></h1>
          <p className="text-slate-400 text-lg">Extracción masiva de prospectos con datos de contacto verificados.</p>
        </header>

        {/* Buscador Premium */}
        <section className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl mb-12 backdrop-blur-xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Palabra Clave</label>
              <input 
                className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: Odontología, Bienes Raíces..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">País de Origen</label>
              <select 
                className="w-full bg-slate-950 border border-white/10 p-4 rounded-2xl outline-none"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="PA">Panamá</option>
                <option value="CO">Colombia</option>
                <option value="MX">México</option>
                <option value="ES">España</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 h-[58px] rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                {loading ? 'Extrayendo...' : 'Iniciar Extracción'}
              </button>
            </div>
          </form>
        </section>

        {/* Resultados */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((company, i) => (
            <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-black">
                  {company.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{company.name}</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Status: Activo</p>
                </div>
              </div>
              <button 
                onClick={() => openDetails(company)}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
              >
                Ver Datos de Contacto
              </button>
            </div>
          ))}
        </section>

        {/* MODAL BLINDADO (Estilos Inline para evitar fallos) */}
        {showModal && selected && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99999, padding: '20px'
          }}>
            <div style={{
              background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
              width: '100%', maxWidth: '500px', borderRadius: '32px',
              padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: '#64748b', fontSize: '30px', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
                  {selected.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', margin: 0 }}>{selected.name}</h2>
                  <p style={{ color: '#6366f1', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>Empresa Verificada</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>Email</p>
                  <p style={{ fontSize: '14px' }}>{selected.email || 'No disponible'}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ color: '#64748b', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>Teléfono / WhatsApp</p>
                  <p style={{ fontSize: '14px' }}>{selected.phone || 'No disponible'}</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
                  <a href={`https://wa.me/${selected.phone}`} target="_blank" style={{ textDecoration: 'none', background: '#16a34a', color: 'white', padding: '14px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', fontSize: '11px', letterSpacing: '1px' }}>WHATSAPP</a>
                  <a href={`https://instagram.com/${selected.instagram}`} target="_blank" style={{ textDecoration: 'none', background: '#ec4899', color: 'white', padding: '14px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', fontSize: '11px', letterSpacing: '1px' }}>INSTAGRAM</a>
                </div>
                <a href={selected.facebookUrl} target="_blank" style={{ textDecoration: 'none', background: '#1e40af', color: 'white', padding: '14px', borderRadius: '14px', textAlign: 'center', fontWeight: '900', fontSize: '11px', letterSpacing: '1px' }}>VER EN FACEBOOK</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
