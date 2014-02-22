
var dy = -3;

var subsvgs = [];

function hover(e) {
    mopen(e.target.svg);
}

function unhover(e) {
    mclosetime();
}

function hoversub(e) {
    mcancelclosetime();
}

function init() {
    
    // Namespace
    var ns = "http://www.w3.org/2000/svg";

    var n = menus.length;

    // Create navigation svg element
    var nav = document.getElementById("nav");
    var nsvg = document.createElementNS(ns, "svg");
    nsvg.setAttribute("class", "topmenubar");
    var ts = [];
    for(var i = 0; i < n; i++) {
	var r = document.createElementNS(ns, "rect");
	var t = document.createElementNS(ns, "text");
	var a = document.createElementNS(ns, "a");
	a.setAttributeNS("http://www.w3.org/1999/xlink", "href", menus[i]);
	t.textContent = menus[i];
	t.onmouseover = hover;
	t.onmouseout = unhover;
	r.onmouseover = hover;
	r.onmouseout = unhover;
	r.rect = r;
	t.rect = r;
	t.aelem = a;
	a.appendChild(r);
	a.appendChild(t);
	nsvg.appendChild(a);
	ts.push(t);
    }
    nav.appendChild(nsvg);

    // Create sub menus
    var navsub = document.getElementById("navsub");
    var subsvgs = [];
    var stss = [];
    for(var i = 0; i < n; i++) {
	var sts = [];
	var submenu = submenus[i];
	var m = submenu.length;
	var subsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	subsvg.onmouseover = hoversub;
	subsvg.onmouseout = unhover;
	subsvgs.push(subsvg);
	ts[i].rect.svg = subsvg;
	ts[i].svg = subsvg;

	subsvg.setAttribute("class", "submenu");

	for(var j = 0; j < m; j++) {
	    var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
	    var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
	    a.setAttributeNS("http://www.w3.org/1999/xlink", "href", menus[i] + "/" + submenus[i][j]);
	    t.rect = r;
	    t.textContent = submenus[i][j];
	    a.appendChild(r);
	    a.appendChild(t);
	    subsvg.appendChild(a);
	    sts.push(t);
	}
	stss.push(sts);
	navsub.appendChild(subsvg);
    }
    
    //Calculate each menu width and unpadded total width in the client.
    var w1 = nav.clientWidth; 
    var w2 = 0;
    var ws = [];
    
    for(var i = 0; i < n; i++) {
	var m = submenus[i].length;
	var maxw = ts[i].getBBox().width;
	for(var j = 0; j < m; j++) {
	    maxw = Math.max(maxw, stss[i][j].getBBox().width);
	}
	ws.push(maxw);
	w2 += maxw;
    }
    var pad = (w1 - w2) / n;
    var halfpad = pad / 2;

    // Adjust position and sizes to fit client
    var cursor = halfpad;

    if(ts.length > 0) {
	h = ts[0].getBBox().height;
	nav.setAttribute("style", "height:" + h);

	for(var i = 0; i < n; i++) {
	    var t = ts[i];
	    var bbox = t.getBBox();
	    t.setAttribute("x", cursor + (ws[i] - bbox.width) / 2);
	    t.setAttribute("y", h + dy);
	    t.rect.setAttribute("x", cursor - halfpad);
	    t.rect.setAttribute("y", 0);
	    t.rect.setAttribute("width", ws[i] + pad);
	    t.rect.setAttribute("height", h);
	    t.rect.setAttribute("class", "menuitem");
	    var sts = stss[i];
	    var m = sts.length;
	    
	    subsvgs[i].setAttribute("style", "z-index: 1000; position: absolute; left: " + (cursor - halfpad) + "px; top: 0px; height: " + (m * h) + "px; width: " + (ws[i] + pad) + "px;");
	    subsvgs[i].style.visibility = 'hidden';

	    for(var j = 0; j < m; j++) {
		var t = sts[j];
		var bbox = t.getBBox();
		t.setAttribute("x", halfpad + (ws[i] - bbox.width) / 2);
		t.setAttribute("y", (j+1) * h + dy);
		t.rect.setAttribute("x", 0);
		t.rect.setAttribute("y", j * h);
		t.rect.setAttribute("width", ws[i] + pad);
		t.rect.setAttribute("height", h);
		t.rect.setAttribute("class", "submenuitem");
	    }
	    
	    cursor += ws[i] + pad;
	}	
    }
}

// Mouse hovering and clicking

var timeout    = 250;
var closetimer = 0;
var ddmenuitem = 0;

// open hidden layer
function mopen(item) {	
    // cancel close timer
    mcancelclosetime();
    
    // close old layer
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
    
    // get new layer and show it
    ddmenuitem = item;
    ddmenuitem.style.visibility = 'visible';
    
}
// close showed layer
function mclose() {
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime() {
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime() {
    if(closetimer) {
	window.clearTimeout(closetimer);
	closetimer = null;
    }
}

// close layer when click-out
document.onclick = mclose; 
