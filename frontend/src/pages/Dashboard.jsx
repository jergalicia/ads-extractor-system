// Dashboard.jsx
import { Building2, MousePointer2, Globe2, Briefcase } from 'lucide-react';
import StatCard from '../components/StatCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 mt-1">Resumen del sistema de extracción comercial.</p>
        </div>
        <button className="btn-primary">Nueva Extracción</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard 
            title="Empresas Detectadas" 
            value="1,284" 
            icon={<Building2 size={24} />} 
            trend="up" 
            trendValue="12" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard 
            title="Anuncios Activos" 
            value="856" 
            icon={<MousePointer2 size={24} />} 
            trend="up" 
            trendValue="8" 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatCard 
            title="Países Cubiertos" 
            value="14" 
            icon={<Globe2 size={24} />} 
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <StatCard 
            title="Industrias" 
            value="32" 
            icon={<Briefcase size={24} />} 
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-6">Últimas Extracciones</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="text-white font-medium">Keyword: "Clínica Estética"</p>
                  <p className="text-slate-400 text-xs">Panamá • Hace 2 horas</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">24 Empresas</p>
                  <p className="text-slate-500 text-xs">Completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-6">Oportunidades de Venta</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold">
                  {i === 1 ? 'CE' : i === 2 ? 'DA' : 'MS'}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {i === 1 ? 'Clínica Estética Bella' : i === 2 ? 'Dental Advanced' : 'MediSpa Pro'}
                  </p>
                  <p className="text-slate-400 text-xs">Score: {95 - i * 5}/100 • Alta Prioridad</p>
                </div>
                <button className="text-indigo-400 text-sm font-semibold hover:underline">Ver</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
