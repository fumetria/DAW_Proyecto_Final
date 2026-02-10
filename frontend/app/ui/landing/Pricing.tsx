import Link from "next/link";

const tiers = [
  {
    name: 'Pequeña Empresa',
    price: '12',
    description: 'Ideal para autónomos y pequeños negocios que empiezan.',
    features: ['1 Usuario', 'Hasta 100 facturas/mes', 'Soporte por email', 'Copias de seguridad diarias'],
    cta: 'Empezar ahora',
    mostPopular: false,
  },
  {
    name: 'Pro',
    price: '29',
    description: 'Para negocios en crecimiento que necesitan más control.',
    features: ['3 Usuarios', 'Facturas ilimitadas', 'Soporte prioritario', 'Informes avanzados', 'Multi-divisa'],
    cta: 'Prueba gratuita de 14 días',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'A medida',
    description: 'Soluciones personalizadas para grandes infraestructuras.',
    features: ['Usuarios ilimitados', 'API personalizada', 'Gestor de cuenta dedicado', 'SLA garantizado', 'Formación equipo'],
    cta: 'Contactar ventas',
    mostPopular: false,
  },
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-stone-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-slate-50 sm:text-4xl mb-4">
            Planes simples y transparentes
          </h2>
          <p className="text-lg text-stone-600 dark:text-slate-300">
            Elige el plan que mejor se adapte a tu etapa actual. Sin costes ocultos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${tier.mostPopular ? 'border-blue-500 shadow-2xl scale-105 z-10 bg-white dark:bg-slate-900' : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-lg transition-shadow'}`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-md">
                  Más popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-stone-900 dark:text-slate-100 leading-8">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-stone-500 dark:text-slate-400 leading-6">
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-stone-900 dark:text-slate-50">
                  {tier.price !== 'A medida' ? `${tier.price}€` : tier.price}
                </span>
                {tier.price !== 'A medida' && <span className="text-sm font-semibold text-stone-500 dark:text-slate-400">/mes</span>}
              </div>

              <ul role="list" className="mb-8 space-y-3 text-sm leading-6 text-stone-600 dark:text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href={tier.price === 'A medida' ? '#contact' : '/signup'}
                  className={`block w-full rounded-full px-3 py-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ${tier.mostPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                      : 'bg-stone-100 dark:bg-slate-800 text-stone-900 dark:text-slate-200 hover:bg-stone-200 dark:hover:bg-slate-700'
                    }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
