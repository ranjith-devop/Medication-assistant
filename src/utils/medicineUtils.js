// medicineUtils.js
// Utilities kept small and testable: uid, CSV parser, small fingerprint helpers, heuristics

export function uid() { return Math.random().toString(36).slice(2,9); }

export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  if (lines.length <= 1) return [];
  const headers = lines[0].split(',').map(h=>h.trim().toLowerCase());
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v=>v.trim());
    const obj = {};
    headers.forEach((h,i)=> obj[h] = vals[i] ?? '');
    return { id: uid(), name: obj.name || 'Unknown', qty: Number(obj.qty)||0, expiry: obj.expiry||'', notes: obj.notes||'', history: [], imageFingerprint: null };
  });
}

export function daysUntil(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  return Math.ceil((d - new Date()) / (1000*60*60*24));
}

export function predictRefillDate(med) {
  if (!med.history || med.history.length < 3) return null;
  const DAY = 24*60*60*1000;
  const hist = med.history.slice(-30);
  const dates = hist.map(h => new Date(h.date).getTime());
  const earliest = Math.min(...dates); const latest = Math.max(...dates);
  const spanDays = Math.max(1, Math.ceil((latest - earliest)/DAY));
  const total = hist.reduce((s,h)=> s + (h.qtyTaken||0), 0);
  const avgDaily = total / spanDays;
  if (!avgDaily) return null;
  const daysLeft = Math.floor(med.qty / avgDaily);
  const refill = new Date(Date.now() + daysLeft*DAY);
  return refill.toISOString().slice(0,10);
}

// demo fingerprint: small greyscale hash from base64 data url. Use privacy-preserving tiny hash.
export async function imageFingerprintFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const SIZE = 16;
        canvas.width = SIZE; canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, SIZE, SIZE);
        const data = ctx.getImageData(0,0,SIZE,SIZE).data;
        let hash = "";
        for (let i=0;i<data.length;i+=4){
          const avg = Math.round((data[i]+data[i+1]+data[i+2])/3);
          hash += avg < 128 ? "1" : "0";
        }
        resolve(hash);
      } catch(e){ reject(e); }
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// alias for file usage: convert file to data url then fingerprint
export async function imageFingerprintFromFile(file){
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = async () => {
      try { const h = await imageFingerprintFromDataUrl(r.result); res(h); } catch(e){ rej(e); }
    };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export function similarityHash(a,b){
  if(!a||!b||a.length!==b.length) return 0;
  let same=0;
  for(let i=0;i<a.length;i++) if(a[i]===b[i]) same++;
  return same / a.length;
}

export { imageFingerprintFromDataUrl as imageFingerprintFromDataUrlDefault };
