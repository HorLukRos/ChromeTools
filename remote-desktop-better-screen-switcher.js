function betterMonitorSwitch(col = null)
{
  var old = document.getElementById("betterMonitorSwitcher");
  if (old) old.parentElement.removeChild(old);
  var elems = col || document.querySelectorAll('section[role=region] > div>div>div>div>div[role=listbox]>div[role="presentation"]>div[role="presentation"]>div[data-value] > span');
  var switcher = document.createElement("span");
  switcher.id = "betterMonitorSwitcher";
  switcher.classList.add("betterMonitorSwitcher");
  var i = 0;
  elems.forEach(e => {
    var btn = document.createElement("a");
    btn.href="#";
    e.sid = i;
    btn.onclick = () => {
      e.click();
      let fun = () => {
          var x = document.querySelectorAll('section[role=region] > div>div>div>div>div[role=listbox]>div[role=presentation]:nth-child(2)>div>span')[e.sid]
          if (x) x.click();
          else setTimeout(fun, 10);
        }
      fun();
      return false; }
    if (i == 0) btn.textContent = "A";
    else btn.textContent = i;
    i++;
    switcher.appendChild(btn);
  });
  document.body.appendChild(switcher);
  betterMonitorSwitchCSS();
  switcher.style.left = switcher.style.left = "calc(50% - " + (switcher.offsetWidth / 2) + "px)";
}

function betterMonitorSwitchCSS()
{
  if (document.betterMonitorSwitchCSSApplied) return;
  document.betterMonitorSwitchCSSApplied = true;
  var css = `
  .betterMonitorSwitcher {
    position: fixed;
    top: 0px;
    left: 50%;
    z-index: 99999999;
    background: #4A94F5;
    padding: 2px 5px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.5);
    border-radius: 0px 0px 5px 5px;
    opacity: .5;
    transition-property: margin,opacity;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4,0.0,0.2,1);
    margin-top: -10px;
}

.betterMonitorSwitcher:active, .betterMonitorSwitcher:hover {
    margin-top: 0px;
    opacity: 1;
}

.betterMonitorSwitcher a {
    display: inline-block;
    text-align: center;
    width: 10px;
    margin: 0px 5px;
    color: white;
}

`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style); 
}

function betterMonitorSwitchInvoker()
{
  var e = document.querySelectorAll('section[role=region] > div>div>div>div>div[role=listbox]>div[role="presentation"]>div[role="presentation"]>div[data-value] > span');
  if (e && e.length > 0) betterMonitorSwitch(e);
  else setTimeout( betterMonitorSwitchInvoker, 200);
}
betterMonitorSwitchInvoker();
