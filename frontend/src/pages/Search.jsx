import { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('PA');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get('/api/search', { params: { keyword, country } });
      setResults(res.data.data || []);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Buscador de Anuncios</h1>
      
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
            placeholder="Escribe una palabra clave..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="PA">Panamá</option>
            <option value="CO">Colombia</option>
            <option value="MX">México</option>
          </select>
          <button 
            type="submit" 
            style={{ padding: '12px 25px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Buscando...' : 'Buscar Leads'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {results.map((c, i) => (
          <div key={i} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{c.name}</h3>
            <button 
              onClick={() => { setSelected(c); setModal(true); }}
              style={{ width: '100%', padding: '10px', background: '#334155', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              VER DETALLES
            </button>
          </div>
        ))}
      </div>

      {modal && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#1e293b', padding: '40px', borderRadius: '20px', width: '90%', maxWidth: '450px', border: '1px solid #6366f1' }}>
            <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
            <div style={{ margin: '20px 0', color: '#cbd5e1' }}>
              <p><strong>Email:</strong> {selected.email || 'No disponible'}</p>
              <p><strong>Teléfono:</strong> {selected.phone || 'No disponible'}</p>
              <p><strong>Instagram:</strong> {selected.instagram || 'No disponible'}</p>
            </div>
            <button 
              onClick={() => setModal(false)}
              style={{ width: '100%', padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              CERRAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
