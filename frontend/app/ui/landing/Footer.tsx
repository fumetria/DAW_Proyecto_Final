
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800">
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo2.svg"
                alt="Bsness app logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-stone-900 dark:text-slate-50">BsnessApp</span>
            </Link>
            <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
              La plataforma de facturación en la nube definitiva para autónomos y PYMES. Simplifica tu negocio hoy.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-start-3 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-slate-100 mb-4">Producto</h4>
              <ul className="space-y-3 text-sm text-stone-600 dark:text-slate-400">
                <li><Link href="#features" className="hover:text-blue-500 transition-colors">Características</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-500 transition-colors">Precios</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Guías</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 dark:text-slate-100 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-stone-600 dark:text-slate-400">
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Privacidad</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500 dark:text-slate-500">
            © {new Date().getFullYear()} BsnessApp. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {/* Social icons placeholder */}
            <div className="w-5 h-5 bg-stone-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-5 h-5 bg-stone-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-5 h-5 bg-stone-300 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
