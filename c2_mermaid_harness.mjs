import fs from "node:fs";
import mermaid from "mermaid";
const data = JSON.parse(fs.readFileSync("client/src/data/chapters.json", "utf8"));
const ch = data.find(c => c.id === 26);
const fence = src => { const m = /```mermaid\n([^`]*?)```/.exec(src); return m ? m[1] : null; };
const ar = fence(ch.arabicContent), en = fence(ch.englishContent);
console.log("AR fence extracted:", ar ? ar.split("\n").length + " lines" : "MISSING");
console.log("EN fence extracted:", en ? en.split("\n").length + " lines" : "MISSING");
mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", fontFamily: "Tajawal, sans-serif" });
for (const [lang, code] of [["AR", ar], ["EN", en]]) {
  try { await mermaid.parse(code); console.log(`${lang} mermaid.parse: PASS`); }
  catch (e) { console.log(`${lang} mermaid.parse: FAIL -> ${String(e.message || e).split("\n")[0]}`); }
}
for (const [lang, code] of [["AR", ar], ["EN", en]]) {
  try {
    const r = await mermaid.render(`mmd-${lang.toLowerCase()}`, code);
    const hasAr = r.svg.includes("استراتيجية العمل") || r.svg.includes("العميل") || r.svg.includes("القوائم المالية");
    const hasEn = r.svg.includes("Customer") || r.svg.includes("Business Strategy") || r.svg.includes("Financial Statements");
    console.log(`${lang} mermaid.render: PASS; svgChars=${r.svg.length}; ARLabelInSvg=${hasAr}; ENLabelInSvg=${hasEn}`);
  } catch (e) { console.log(`${lang} mermaid.render: DOM-required (${String(e.message || e).split("\n")[0]}) -> full SVG/label check deferred to C3 browser gate`); }
}
