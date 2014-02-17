
var menus = ["Find os", "Levering", "Hej med dig", "lllllllllllllllllllllll"];

var submenus = [["ddasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "dasdas"], ["Sub  ds 2", "Sub d 3"], ["dsa das"], ["a","b","c","d","e"]];

var subsvgs = [];

function hover(e) {
    mopen(subsvgs[e.target.menuId]);
}

function unhover(e) {
    mclosetime();
}

function hoversub(e) {
    mcancelclosetime();
}

var dy = -3;

function init() {
    
    var navsub = document.getElementById("navsub");

    var nav = document.getElementById("navsvg");
    var w1 = nav.clientWidth;

    var cs = nav.getElementsByTagName("text");

    var w2 = 0;

    var cs = [];
    var ws = [];
    var ts = [];

    for(var i = 0; i < menus.length; i++) {
	var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
	t.textContent = menus[i];
	t.onmouseover = hover;
	t.onmouseout = unhover;
	t.menuId = i;
	nav.appendChild(t);
	cs[i] = t;

	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.onmouseover = hoversub;
	svg.onmouseout = unhover;
	navsub.appendChild(svg);
	subsvgs[i] = svg;

	var maxw = cs[i].getBBox().width;
	ts[i] = [];
	for(var j = 0; j < submenus[i].length; j++) {
	    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
	    t.textContent = submenus[i][j];
	    svg.appendChild(t);
	    var bbox = t.getBBox();
	    maxw = Math.max(maxw, bbox.width);
	    t.setAttribute("x", 0);
	    t.setAttribute("y", (j+1) * bbox.height + dy);
	    ts[i][j] = t;
	}

	ws[i] = maxw;

	w2 += maxw;
    }

    var dw = ((w1 - w2) / (cs.length));

    var x = dw / 2;

    for(var i = 0; i < cs.length; i++) {
	
	for(var j = 0; j < submenus[i].length; j++) {
	    var bbox = ts[i][j].getBBox();
	    ts[i][j].setAttribute("x", dw/2 + (ws[i] - bbox.width) / 2);
	    if(j != 0) {
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", 0);
		line.setAttribute("x2", dw + ws[i]);
		line.setAttribute("y1", j * bbox.height);
		line.setAttribute("y2", j * bbox.height);
		line.setAttribute("stroke", "#000000");
		subsvgs[i].appendChild(line);
	    }
	    else {
				
		var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.setAttribute("x", 0);
		rect.setAttribute("y", 0);
		rect.setAttribute("width", dw + ws[i]);
		rect.setAttribute("height", bbox.height * submenus[i].length);
		rect.setAttribute("stroke", "#000000");
		rect.setAttribute("fill", "none");
		
		subsvgs[i].appendChild(rect);
	    }
	}

	var c = cs[i];
	var bbox = c.getBBox();

	c.setAttribute("x", x + (ws[i] - bbox.width) / 2);
	c.setAttribute("y", bbox.height + dy);

	var svg = subsvgs[i];
	svg.setAttribute("style", "z-index: 1000; position: absolute; left: " + (x - dw/2) + "px; top: 0px; height: " + (submenus[i].length * bbox.height) + "px; width: " + (ws[i] + dw) + "px;");
	svg.style.visibility = 'hidden';
	x += ws[i] + dw;

	if(i != cs.length - 1) {
	    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	    line.setAttribute("x1", x - dw/2);
	    line.setAttribute("x2", x - dw/2);
	    line.setAttribute("y1", 0);
	    line.setAttribute("y2", bbox.height);
	    line.setAttribute("stroke", "#000000");
	    nav.appendChild(line);
	}
	else {
	    nav.setAttribute("style", "height:" + bbox.height);
	    document.getElementById("nav").setAttribute("style", "height:" + bbox.height);
	    
	    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	    rect.setAttribute("x", 0);
	    rect.setAttribute("y", 0);
	    rect.setAttribute("width", w1);
	    rect.setAttribute("height", bbox.height);
	    rect.setAttribute("stroke", "#000000");
	    rect.setAttribute("fill", "none");

	    nav.appendChild(rect);
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
