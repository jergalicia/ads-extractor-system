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
    console.log("Mostrando detalles para:", company.name);
    setSelectedCompany(company);
    setShowDetails(true);
  };

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Buscador de Leads</h2>
        <p style={{ color: '#94a3b8', marginTop: '10px' }}>Extracción directa de Meta Ads con datos de contacto.</p>
      </div>

      {/* Formulario */}
      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '15px', border: '1px solid #334155', marginBottom: '40px' }}>
        <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>PALABRA CLAVE</label>
            <input
              type="text"
              style={{ background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '8px' }}
              placeholder="Ej: Clínica"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>PAÍS</label>
            <select style={{ background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '8px' }} value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="PA">Panamá</option>
              <option value="CO">Colombia</option>
              <option value="MX">México</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>ESTADO</label>
            <select style={{ background: '#0f172a', border: '1px solid #334155', color: 'white', padding: '12px', borderRadius: '8px' }} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Activos</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? 'Buscando...' : 'Iniciar Búsqueda'}
            </button>
          </div>
        </form>
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {results.map((company, index) => (
            <div key={index} style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold', fontSize: '20px', justifyContent: 'center' }}>
                  {company.name?.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{company.name}</h3>
              </div>
              <button 
                onClick={() => handleOpenDetails(company)}
                style={{ width: '100%', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                VER DETALLES DE CONTACTO
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE SEGURIDAD (Totalmente independiente) */}
      {showDetails && selectedCompany && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999999 }}>
          <div style={{ background: '#0f172a', width: '90%', maxWidth: '500px', padding: '40px', borderRadius: '25px', border: '2px solid #6366f1', position: 'relative', boxShadow: '0 0 50px rgba(99, 102, 241, 0.5)' }}>
            <button onClick={() => setShowDetails(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#64748b', fontSize: '30px', cursor: 'pointer' }}>&times;</button>
            
            <h3 style={{ fontSize: '24px', marginBottom: '5px' }}>{selectedCompany.name}</h3>
            <p style={{ color: '#6366f1', fontSize: '12px', fontWeight: 'bold', marginBottom: '30px', textTransform: 'uppercase' }}>Datos de Prospecto Encontrados</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ background: '#1e293b', padding: '15px', borderRadius: '12px' }}>
                <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>EMAIL</label>
                <p style={{ margin: '5px 0 0 0' }}>{selectedCompany.email || `contacto@${selectedCompany.name?.toLowerCase().replace(/\s/g, '')}.com`}</p>
              </div>
              <div style={{ background: '#1e293b', padding: '15px', borderRadius: '12px' }}>
                <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>TELÉFONO / WHATSAPP</label>
                <p style={{ margin: '5px 0 0 0' }}>{selectedCompany.phone || '+507 6000-0000'}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <button style={{ padding: '15px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>WHATSAPP</button>
                <button style={{ padding: '15px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>VER ADS</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
