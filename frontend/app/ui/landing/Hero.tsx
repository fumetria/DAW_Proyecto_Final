import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-stone-50 dark:bg-slate-950 pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Abstract Background Shapes */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[80px] mix-blend-multiply animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Novedad: Facturación automatizada 2.0
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-slate-50 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Tu facturación desde <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              la nube, simplificada
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-stone-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            Gestiona tu negocio desde cualquier lugar. Facturas, clientes y
            control total sin complicaciones. Diseñado para autónomos y PYMES
            que valoran su tiempo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 dark:bg-cyan-600 px-8 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Contáctanos
            </Link>
            <Link
              href="#features"
              className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-8 text-base font-medium text-stone-900 dark:text-slate-200 backdrop-blur-sm transition-all hover:bg-stone-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              Saber más
            </Link>
          </div>

          {/* Social Proof / Trust (Optional placeholder) */}
          <div className="pt-12 animate-in fade-in duration-1000 delay-700 opacity-70">
            <p className="text-sm text-stone-500 dark:text-slate-400 mb-4">
              Algunos de nuestros clientes
            </p>
            {/* Add logos here if available */}
            <div className="flex items-center justify-center">
              <Image
                src="/iestacio_logo.png"
                alt="Logo IES l'Estació"
                width={100}
                height={100}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
