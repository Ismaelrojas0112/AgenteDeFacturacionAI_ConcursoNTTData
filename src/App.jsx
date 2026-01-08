import React, { useState } from 'react';
import { FileText, ArrowRight, Download, FileJson } from 'lucide-react';
import ControlPanel from './components/ControlPanel';
import InvoicePreview from './components/InvoicePreview';
import Footer from './components/Footer';

function App() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewState, setViewState] = useState('input'); // 'input', 'draft', 'final'
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  // Initial State
  const [invoiceData, setInvoiceData] = useState({
    issuer: {
      name: "TECH SOLUTIONS S.A.C.",
      address: "Av. República de Panamá 3505, San Isidro",
      email: "billing@techsolutions.pe",
      phone: "(01) 440-9999",
      logo: "https://via.placeholder.com/150x50?text=TECH+SOLUTIONS"
    },
    client: {
      name: "",
      ruc: "",
      address: ""
    },
    invoiceDetails: {
      date: new Date().toLocaleDateString('es-PE'),
      number: "E001-000001"
    },
    items: []
  });

  // OpenAI API Integration
  // Google Gemini API Integration
  const handleGenerate = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      alert("Por favor configura tu API Key (VITE_GEMINI_API_KEY) en el archivo .env");
      return;
    }

    setIsGenerating(true);

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const promptText = `
        Actúa como un motor de extracción de datos para facturación electrónica en Perú (SUNAT).
        Analiza el siguiente texto y extrae los datos en formato JSON estricto.
        
        Texto: "${prompt}"
        
        Formato JSON requerido:
        {
          "client": {
            "name": "Razón Social o Nombre",
            "ruc": "RUC (11 dígitos) o DNI",
            "address": "Dirección completa"
          },
          "invoiceDetails": {
            "date": "DD/MM/YYYY (si no se menciona, usa la fecha de hoy)"
          },
          "items": [
            {
              "qty": number,
              "desc": "Descripción del servicio o producto",
              "price": number (precio unitario en soles)
            }
          ]
        }
        
        Reglas:
        - Si no encuentras un dato, usa "---" o 0.
        - Si el texto menciona "IGV incluido", calcula el precio unitario base.
        - Retorna SOLO el JSON, sin bloques de código ni markdown.
      `;

      const result = await model.generateContent(promptText);
      const text = result.response.text();

      // Clean up markdown if present
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanText);

      setInvoiceData(prev => ({
        ...prev,
        client: data.client || prev.client,
        invoiceDetails: {
          ...prev.invoiceDetails,
          date: data.invoiceDetails?.date || new Date().toLocaleDateString('es-PE')
        },
        items: data.items || []
      }));

      setValidationMsg(validateData(data));
      setViewState('draft');

    } catch (error) {
      console.error("Error generating invoice:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const [validationMsg, setValidationMsg] = useState(null);

  const validateData = (data) => {
    const ruc = data.client?.ruc?.toString().replace(/\D/g, '') || '';
    if (!ruc) return "Falta el RUC o DNI del cliente.";

    if (ruc.length !== 11 && ruc.length !== 8) {
      return `El documento '${data.client.ruc}' no parece válido. Debe tener 8 (DNI) u 11 (RUC) dígitos.`;
    }
    return null;
  };

  const handleRefine = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      alert("Por favor configura tu API Key (VITE_GEMINI_API_KEY) en el archivo .env");
      return;
    }

    setIsRefining(true);
    setValidationMsg(null);

    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `
        Actúa como un asistente de edición de facturas.
        Tienes los datos actuales de una factura en JSON y una solicitud del usuario para modificarla.
        
        Datos Actuales: ${JSON.stringify(invoiceData)}
        Solicitud: "${refinementPrompt}"
        
        Tu tarea es actualizar el JSON según la solicitud.
        - Si pide cambiar precios, cantidades o descripciones, hazlo.
        - Si pide agregar ítems, agrégalos.
        - Si pide eliminar, elimínalos.
        - Recalcula totales si es necesario (aunque el frontend lo hace, es bueno que el JSON sea consistente).
        
        Retorna SOLO el JSON actualizado, sin markdown.
      `;

      const result = await model.generateContent(systemPrompt);
      const text = result.response.text();

      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanText);

      setInvoiceData(data);
      setValidationMsg(validateData(data));
      setRefinementPrompt(""); // Clear input

    } catch (error) {
      console.error("Error refining invoice:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsRefining(false);
    }
  };

  const handleFinalize = () => {
    setViewState('final');
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `invoice-${invoiceData.invoiceDetails.number}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen md:h-screen w-full bg-[#F1F5F9] font-sans">

      {/* Main Content Area - Floating Panels */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 min-h-0">

        {/* Left Panel - Control & Inputs - Always 40% */}
        <div className="w-full md:w-[40%] h-auto md:h-full z-10 shadow-xl bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          >
            {/* DRAFT STATE CONTROLS */}
            {viewState === 'draft' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 border-t border-gray-100">

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">Refinar Borrador</h3>
                </div>

                {/* Validation Warning */}
                {validationMsg && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          {validationMsg}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Refinement Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">¿Necesitas cambios?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={refinementPrompt}
                      onChange={(e) => setRefinementPrompt(e.target.value)}
                      placeholder="Ej: Cambia el precio de la laptop a 4000..."
                      className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                    />
                    <button
                      onClick={handleRefine}
                      disabled={isRefining || !refinementPrompt.trim()}
                      className="bg-gray-900 text-white px-4 rounded-xl hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
                    >
                      {isRefining ? '...' : 'Actualizar'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleFinalize}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FileText size={20} />
                  <span className="text-lg">Generar PDF Final</span>
                  <ArrowRight size={20} />
                </button>

              </div>
            )}

            {/* FINAL STATE CONTROLS */}
            {viewState === 'final' && (
              <div className="space-y-6 pt-4 border-t border-gray-100 animate-in fade-in duration-500">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center mb-6">
                  ¡Factura generada exitosamente!
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FileText size={18} />
                    Descargar PDF / Imprimir
                  </button>

                  <button
                    onClick={handleDownloadJSON}
                    className="w-full bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FileJson size={18} />
                    Descargar JSON
                  </button>
                </div>

                <button
                  onClick={() => setViewState('draft')}
                  className="w-full text-sm text-slate-500 hover:text-slate-800 underline"
                >
                  Volver a editar
                </button>
              </div>
            )}
          </ControlPanel>
        </div>

        {/* Right Panel - Preview Area - Always 60% */}
        <div className="w-full md:w-[60%] min-h-[500px] md:h-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
          {viewState === 'input' ? (
            /* Empty State */
            <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={48} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Vista Previa del Documento</h2>
              <p className="text-sm mt-2 text-slate-500">Aquí verás tu factura generada en tiempo real.</p>
            </div>
          ) : (
            /* Live Invoice Preview */
            <InvoicePreview
              data={invoiceData}
              loading={isGenerating || isRefining}
            />
          )}
        </div>

      </main >

      <Footer />

    </div >
  );
}

export default App;
