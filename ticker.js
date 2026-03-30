(function(){
const tickerHTML = `<div id="sr71-ticker" style="position:fixed;top:0;left:0;right:0;background:rgba(26,20,16,0.95);border-bottom:1px solid #d4af37;z-index:9998;height:32px;overflow:hidden"><div style="display:flex;align-items:center;animation:scroll 30s linear infinite;padding:6px 0"><span style="margin:0 40px;font-family:monospace;font-size:11px;color:#f0d878">BTC: <span id="ticker-btc">$0</span></span><span style="margin:0 40px;font-family:monospace;font-size:11px">CLP: <span id="ticker-clp">$0</span></span><span style="margin:0 40px;font-family:monospace;font-size:11px;color:#d4af37">USDT/CLP: <span id="ticker-usdt-clp">$0</span></span></div></div><style>@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}body{padding-top:32px!important}</style>`;
document.body.insertAdjacentHTML("afterbegin",tickerHTML);
const btnHTML = `<a href="/login.html" style="position:fixed;top:40px;right:20px;z-index:9999;background:#d4af37;color:#1a1410;padding:8px 20px;border-radius:4px;font-size:11px;font-weight:600;text-decoration:none">ACCEDER</a>`;
document.body.insertAdjacentHTML("beforeend",btnHTML);
async function update(){
try{
const btcRes=await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
const btcData=await btcRes.json();
const clpRes=await fetch("https://mindicador.cl/api/dolar");
const clpData=await clpRes.json();
const btcPrice=parseFloat(btcData.lastPrice);
const clpPrice=parseFloat(clpData.serie[0].valor);
const usdtClp=930;
document.getElementById("ticker-btc").textContent="$"+btcPrice.toLocaleString("en-US",{maximumFractionDigits:0});
document.getElementById("ticker-clp").textContent="$"+clpPrice.toLocaleString("en-US",{maximumFractionDigits:0});
document.getElementById("ticker-usdt-clp").textContent="$"+usdtClp.toLocaleString("en-US",{maximumFractionDigits:0});
}catch(e){}}
update();
setInterval(update,30000);
})();
