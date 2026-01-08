# Facturador AI - Reto 2: Agente de Facturación estilo SUNAT

Este proyecto es una Prueba de Concepto (PoC) de un asistente inteligente que genera borradores de facturas electrónicas a partir de lenguaje natural.

## 🚀 Características
- **Lenguaje Natural a Factura**: Escribe "Venta de 2 laptops a Google por 5000 soles" y el sistema estructurará la data.
- **Cálculos Automáticos**: Calcula Subtotal, IGV (18%) y Total automáticamente.
- **Edición Inteligente**: Puedes pedir cambios como "Agrega un mouse de 50 soles" y la factura se actualizará.
- **Exportación**:
  - 📄 **PDF**: Genera una vista de impresión limpia (A4).
  - 💾 **JSON**: Descarga la estructura de datos para integración.

## 🛠️ Tecnologías
- **Frontend**: React + Vite + TailwindCSS.
- **IA**: Google Gemini (vía VITE_GEMINI_API_KEY).
- **Estilos**: Lucide Icons para la UI.

## 📦 Instalación

1.  Clonar el repositorio:
    ```bash
    git clone <url-del-repo>
    cd facturador-ai
    ```

2.  Instalar dependencias:
    ```bash
    npm install
    ```

3.  Configurar API Key:
    - Crear un archivo `.env` en la raíz.
    - Agregar tu key de Gemini:
      ```
      VITE_GEMINI_API_KEY=AIzaSy...
      ```

4.  Ejecutar:
    ```bash
    npm run dev
    ```

## 📝 Uso
1.  Ingresa una descripción de la venta en el cuadro de texto.
2.  Haz clic en **"Generar Borrador"**.
3.  Revisa la vista previa. Si necesitas cambios, usa la caja de "Refinar/Editar" en la parte inferior.
4.  Haz clic en **"Generar PDF Final"** para descargar el JSON o imprimir el PDF.

## 📂 Ejemplos de Pruebas
Puedes encontrar ejemplos de prompts en el archivo `examples.json`.

## ⚠️ Limitaciones
- El RUC y DNI no se validan contra una base de datos real de SUNAT.
- El cálculo de impuestos es lineal (18%).

---
Desarrollado para el Reto 2 de Agentes de IA.
