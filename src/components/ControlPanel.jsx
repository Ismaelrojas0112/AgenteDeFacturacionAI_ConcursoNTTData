import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

const ControlPanel = ({
    prompt,
    setPrompt,
    onGenerate,
    isGenerating,
    children
}) => {
    return (
        <div className="w-full h-full bg-white flex flex-col border-r border-gray-200">

            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="bg-blue-600 text-white p-1 rounded-md">
                        <Bot size={20} />
                    </span>
                    Facturador AI
                </h1>
                <p className="text-sm text-slate-500 mt-1">Genera facturas SUNAT en segundos</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* Prompt Section */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">
                        Genera tus comprobantes electrónicos en segundos. Nuestra tecnología garantiza precisión en tus cálculos y privacidad en tus datos. Simplifica tu gestión contable sin complicaciones.<br />
                        <br />
                        Recuerda colocar:<br />
                        <br />
                        ¿Quién compra? (Razón Social y RUC de 11 dígitos).<br />
                        ¿Qué compra? (Descripción de productos/servicios).<br />
                        ¿Cuánto cuesta? (Cantidades y precios unitarios).<br />
                        <br />
                        Describe tu venta<br />
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ej: Venta a la empresa Los Alamos SAC con RUC 20555... por 3 servicios de consultoría a 1500 soles cada uno..."
                        className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-slate-700 placeholder:text-slate-400 text-sm leading-relaxed"
                    />
                    <button
                        onClick={onGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/50"
                    >
                        {isGenerating ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Generando...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Generar Borrador
                            </>
                        )}
                    </button>
                </div>

                {/* Dynamic Content (Inline Preview & Actions) */}
                {children}

            </div>
        </div>
    );
};

export default ControlPanel;
