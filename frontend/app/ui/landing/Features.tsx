import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

// Helper for icons
function IconCloud() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <FontAwesomeIcon icon={faLeaf} className="w-6 h-6" />
  );
}

function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  );
}


const features = [
  {
    name: 'Todo en la nube',
    description: 'Accede a tus datos desde cualquier dispositivo. Olvídate de copias de seguridad manuales y servidores locales.',
    icon: IconCloud,
    className: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
  },
  {
    name: 'Seguridad garantizada',
    description: 'Tus datos están encriptados y protegidos con los más altos estándares de seguridad.',
    icon: IconLock,
    className: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
  },
  {
    name: 'Eco-friendly',
    description: 'Envía el ticket de compra digitalmente a tus clientes.',
    icon: IconLeaf,
    className: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
  },
  {
    name: 'Informes detallados',
    description: 'Conoce en tiempo real el estado de tu negocio. Ventas, gastos y beneficios al alcance de un clic.',
    icon: IconChart,
    className: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-slate-50 sm:text-4xl mb-4">
            Todo lo que necesitas para tu negocio
          </h2>
          <p className="text-lg text-stone-600 dark:text-slate-300">
            Una plataforma potente diseñada para simplificar tu gestión diaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-start p-6 rounded-2xl border border-stone-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:shadow-xl transition-shadow duration-300">
              <div className={`p-3 rounded-xl mb-4 ${feature.className}`}>
                <feature.icon />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-slate-100 mb-2">
                {feature.name}
              </h3>
              <p className="text-stone-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
