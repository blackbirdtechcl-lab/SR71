(function(){
const tickerHTML=`<div id="sr71-ticker" style="position:fixed;top:0;left:0;right:0;background:rgba(26,20,16,0.95);border-bottom:1px solid #d4af37;z-index:9998;height:32px;overflow:hidden"><div style="display:flex;align-items:center;animation:scroll 30s linear infinite;padding:6px 0;white-space:nowrap"><span style="margin:0 40px;font-family:monospace;font-size:11px;color:#f0d878">BTC: <span id="ticker-btc">...</span></span><span style="margin:0 40px;font-family:monospace;font-size:11px">USD/CLP: <span id="ticker-usdclp">...</span></span><span style="margin:0 40px;font-family:monospace;font-size:11px;color:#d4af37">USDT/CLP: <span id="ticker-usdtclp">...</span></span></div></div><style>@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-33%)}}body{padding-top:32px!important}</style>`;
document.body.insertAdjacentHTML("afterbegin",tickerHTML);
const btnHTML=`<a href="/login.html" style="position:fixed;top:40px;right:20px;z-index:9999;background:#d4af37;color:#1a1410;padding:8px 20px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none">ACCEDER</a>`;
document.body.insertAdjacentHTML("beforeend",btnHTML);
async function update(){
try{
const btc=await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT").then(r=>r.json());
const dolar=await fetch("https://mindicador.cl/api/dolar").then(r=>r.json());
const btcPrice=parseFloat(btc.lastPrice);
const usdClp=parseFloat(dolar.serie[0].valor);
const usdtClp=Math.round(usdClp*1.015);
document.getElementById("ticker-btc").textContent="$"+btcPrice.toLocaleString("en-US",{maximumFractionDigits:0});
document.getElementById("ticker-usdclp").textContent="$"+usdClp.toLocaleString("en-US",{maximumFractionDigits:0});
document.getElementById("ticker-usdtclp").textContent="$"+usdtClp.toLocaleString("en-US",{maximumFractionDigits:0});
}catch(e){}}
update();
setInterval(update,30000);
})();
