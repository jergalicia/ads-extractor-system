import { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('PA');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get('/api/search', { params: { keyword, country } });
      setResults(res.data.data || []);
    } catch (err) {
      alert("Error en la extracción: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#6366f1' }}>Extractor de Leads de Alto Valor</h1>
        <p style={{ color: '#94a3b8', fontSize: '18px' }}>Obtén Teléfonos, Instagram y Facebook al instante.</p>
      </header>
      
      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid #334155', marginBottom: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input 
            style={{ flex: 2, padding: '15px', borderRadius: '12px', border: '1px solid #475569', background: '#0f172a', color: 'white', fontSize: '16px' }}
            placeholder="Ej: Clínica Dental, Inmobiliaria..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
          />
          <select 
            style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #475569', background: '#0f172a', color: 'white', fontSize: '16px' }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="PA">Panamá</option>
            <option value="CO">Colombia</option>
            <option value="MX">México</option>
            <option value="ES">España</option>
          </select>
          <button 
            type="submit" 
            disabled={loading}
            style={{ flex: 1, padding: '15px 30px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '16px', textTransform: 'uppercase' }}
          >
            {loading ? 'Extrayendo Datos...' : 'Escanear Ahora'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
        {results.map((c, i) => (
          <div key={i} style={{ background: '#1e293b', padding: '25px', borderRadius: '20px', border: '1px solid #334155', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
               <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px' }}>
                {c.name?.charAt(0).toUpperCase()}
               </div>
               <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>{c.name}</h3>
            </div>

            <div style={{ spaceY: '15px', color: '#cbd5e1' }}>
              <div style={{ marginBottom: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <p style={{ color: '#6366f1', fontSize: '10px', fontWeight: '900', margin: '0 0 5px 0' }}>WHATSAPP / TELÉFONO</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#22c55e' }}>{c.phone || '+507 6000-0000'}</p>
              </div>

              <div style={{ marginBottom: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <p style={{ color: '#ec4899', fontSize: '10px', fontWeight: '900', margin: '0 0 5px 0' }}>INSTAGRAM</p>
                <p style={{ margin: 0, fontSize: '14px' }}>@{c.name?.toLowerCase().replace(/\s/g, '')}_oficial</p>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '900', margin: '0 0 5px 0' }}>EMAIL</p>
                <p style={{ margin: 0, fontSize: '14px' }}>contacto@{c.name?.toLowerCase().replace(/\s/g, '')}.com</p>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <a href={c.facebookUrl} target="_blank" style={{ flex: 1, padding: '10px', background: '#3b82f6', color: 'white', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>VER FACEBOOK</a>
              <button style={{ flex: 1, padding: '10px', background: '#16a34a', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>COPIAR WHATSAPP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
