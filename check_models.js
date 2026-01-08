
import fs from 'fs';
const key = process.env.GEMINI_API_KEY || "TU_API_KEY_AQUI"; // NOTE: Use env variables, do not commit keys!
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
console.log("Fetching...");
try {
    const response = await fetch(url);
    const data = await response.json();
    fs.writeFileSync('models_list.json', JSON.stringify(data, null, 2));
    console.log("Done");
} catch (error) {
    console.error(error);
}
