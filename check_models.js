
import fs from 'fs';
const key = "AIzaSyCinH96RJfsVoFEpitH8xOxpk-6oWIXQiM";
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
