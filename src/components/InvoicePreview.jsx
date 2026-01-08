import React from 'react';

const InvoicePreview = ({ data, loading }) => {
    const {
        issuer = {
            name: "EMPRESA DEMO S.A.C.",
            address: "Av. Javier Prado Este 1234, San Isidro, Lima",
            email: "contacto@empresademo.com",
            phone: "(01) 555-1234",
            logo: "https://via.placeholder.com/150x50?text=LOGO"
        },
        client = {
            name: "",
            ruc: "",
            address: ""
        },
        invoiceDetails = {
            date: new Date().toLocaleDateString('es-PE'),
            number: "E001-000001"
        },
        items = []
    } = data || {};

    // Calculations
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    return (
        <div className="w-full h-full bg-gray-100 p-8 overflow-auto flex justify-center items-start">
            {/* A4 Container */}
            <div className={`preview-container bg-white shadow-lg w-[210mm] min-h-[297mm] p-12 relative transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>

                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between mb-12">
                    <div className="w-1/2">
                        <div className="h-16 w-40 bg-gray-200 mb-4 flex items-center justify-center text-gray-400 text-sm font-bold border border-dashed border-gray-300">
                            LOGO EMPRESA
                        </div>
                        <h2 className="font-bold text-xl text-slate-800">{issuer.name}</h2>
                        <p className="text-sm text-slate-500">{issuer.address}</p>
                        <p className="text-sm text-slate-500">{issuer.email} | {issuer.phone}</p>
                    </div>

                    {/* RUC Box (Critical) */}
                    <div className="w-1/3 border-2 border-slate-800 p-4 text-center">
                        <h3 className="font-bold text-slate-800 text-lg mb-1">R.U.C. 20123456789</h3>
                        <div className="bg-slate-800 text-white font-bold py-1 mb-1 text-sm">FACTURA ELECTRÓNICA</div>
                        <h3 className="font-bold text-slate-800 text-lg">No. {invoiceDetails.number}</h3>
                    </div>
                </div>

                {/* Client Details */}
                <div className="mb-8 border rounded p-4 border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-bold text-slate-700 block">Cliente:</span>
                            <span className="text-slate-600">{client.name || "---"}</span>
                        </div>
                        <div>
                            <span className="font-bold text-slate-700 block">Fecha de Emisión:</span>
                            <span className="text-slate-600">{invoiceDetails.date}</span>
                        </div>
                        <div>
                            <span className="font-bold text-slate-700 block">R.U.C.:</span>
                            <span className="text-slate-600">{client.ruc || "---"}</span>
                        </div>
                        <div>
                            <span className="font-bold text-slate-700 block">Dirección:</span>
                            <span className="text-slate-600">{client.address || "---"}</span>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-800 text-white">
                                <th className="p-2 text-left w-16">Cant.</th>
                                <th className="p-2 text-left">Descripción</th>
                                <th className="p-2 text-right w-32">P. Unit</th>
                                <th className="p-2 text-right w-32">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="p-2 text-slate-600">{item.qty}</td>
                                        <td className="p-2 text-slate-600">{item.desc}</td>
                                        <td className="p-2 text-right text-slate-600">S/ {item.price.toFixed(2)}</td>
                                        <td className="p-2 text-right text-slate-800 font-medium">S/ {(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400 italic">
                                        No hay ítems agregados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-1/2">
                        <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
                            <span className="text-slate-600">Op. Gravada</span>
                            <span className="font-medium text-slate-800">S/ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
                            <span className="text-slate-600">I.G.V. (18%)</span>
                            <span className="font-medium text-slate-800">S/ {igv.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-3 text-base">
                            <span className="font-bold text-slate-800">Importe Total</span>
                            <span className="font-bold text-blue-700 text-lg">S/ {total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-12 left-12 right-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                    Representación impresa de la Factura Electrónica. Consulte su documento en www.sunat.gob.pe
                </div>

            </div>
        </div>
    );
};

export default InvoicePreview;
