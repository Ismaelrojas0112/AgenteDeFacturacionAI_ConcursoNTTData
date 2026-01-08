import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0F172A] text-slate-400 py-6 border-t border-slate-800 text-sm mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">

                {/* Team Credits */}
                <div className="text-center md:text-left">
                    <p className="font-bold text-white mb-2">Desarrollado por:</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs mt-1">
                        <a
                            href="https://www.linkedin.com/in/ismael-rojas-carlos-918153265"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center md:items-start hover:text-white transition-colors"
                        >
                            <span className="font-semibold text-blue-400 group-hover:text-blue-300">Ismael Rojas</span>
                            <span className="text-slate-500 text-[10px]">Ing. Telecomunicaciones (UNI)</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jhoveran-cuno-apaza-b6857b315"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center md:items-start hover:text-white transition-colors"
                        >
                            <span className="font-semibold text-blue-400 group-hover:text-blue-300">Jhoveran Cuno</span>
                            <span className="text-slate-500 text-[10px]">Ing. Telecomunicaciones (UNI)</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/américo-erick-mercado-dionicio-8b7829298"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center md:items-start hover:text-white transition-colors"
                        >
                            <span className="font-semibold text-blue-400 group-hover:text-blue-300">Américo Mercado</span>
                            <span className="text-slate-500 text-[10px]">Ing. Informática (PUCP)</span>
                        </a>
                    </div>
                </div>

                {/* Challenge Info */}
                <div className="text-center md:pt-4">
                    <p className="flex items-center gap-2 justify-center">
                        <span>🚀 Reto NTT DATA 2025</span>
                        <span className="text-slate-600">|</span>
                        <span>🤖 Powered by Gemini AI</span>
                    </p>
                </div>

                {/* Links & Disclaimer */}
                <div className="text-center md:text-right flex flex-col items-center md:items-end md:pt-2">
                    <a href="https://github.com/Ismaelrojas0112/AgenteDeFacturacionAI_ConcursoNTTData.git" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors mb-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>Ver Código Fuente</span>
                    </a>
                    <p className="text-[10px] text-slate-500 max-w-[200px]">⚠️ Simulación académica sin valor fiscal.</p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
