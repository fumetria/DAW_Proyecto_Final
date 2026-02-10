export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-stone-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-slate-50 mb-4">
                ¿Hablamos?
              </h2>
              <p className="text-lg text-stone-600 dark:text-slate-300 mb-8">
                Estamos aquí para ayudar a que tu empresa crezca. Escríbenos y
                te responderemos en menos de 24h.
              </p>

              <div className="space-y-4 text-stone-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>contacto@bsnessapp.es</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Ontinyent, España</span>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-4 py-3 text-stone-900 dark:text-slate-100 placeholder-stone-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-4 py-3 text-stone-900 dark:text-slate-100 placeholder-stone-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-700 dark:text-slate-300 mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 px-4 py-3 text-stone-900 dark:text-slate-100 placeholder-stone-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button
                type="button" // Prevent default submission for now
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
