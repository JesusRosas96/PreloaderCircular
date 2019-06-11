var canvas, preloader, imagenes, pag, lon, imagen;
document.getElementById("pag").onclick = function() {clicA()};
document.getElementById("pag2").onclick = function() {clicB()};

function clicA()
{
	pag = document.getElementById("pag").innerHTML;
	if(pag == 'Home'){
		imagenes = ['img/pag1.png', 'img/pag2.png'];
	}
	lon = imagenes.length;
}

function clicB()
{
	pag = document.getElementById('pag2').innerHTML;
	if(pag == "Marketing"){
		imagenes = [ 'img/logo.png', 'img/pag1.png'];
	}
	lon = imagenes.length;
}

function clicC()
{
	pag = document.getElementById('pag3').innerHTML;
}

$(document).on("ready",iniciarApp);

function iniciarApp()
{
	canvas = document.getElementById('miCanvas');
	$("#miCanvas").css({
		'top':($('html').height()-canvas.height)/2+'px',
		'left':($('html').width()-canvas.width)/2+'px'
	});
	$("#porcentaje").css({
		'top':($('html').height()-$("#porcentaje").height())/2+'px',
		'left':($('html').width()-$("#porcentaje").width())/2+'px'
	});
	preloader = new PreloadJS();
	preloader.onFileLoad = cargaCompleta;
	preloader.onProgress = progresoCarga;
	prepararCanvas();
}

function prepararCanvas()
{
	var ctx = canvas.getContext('2d');
	var radio = 98;
	var posX = radio +2;
	var posY = radio +2;
	ctx.arc(posX,posY,radio,0,2 * Math.PI, false);
	ctx.strokeStyle= "gray";
	ctx.lineWidth= 4;
	ctx.stroke();
	cargar();
}

function cargar()
{
	while(lon > 0)
	{
		imagen = imagenes.shift();
		preloader.loadFile(imagen);	
	}
}

function progresoCarga()
{
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	var radio= 98;
	var posX = radio +2;
	var posY = radio +2;
	var endAngle = (preloader.progress * (2*Math.PI));
	ctx.arc(posX,posY,radio,0,endAngle, false);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 4;
	ctx.stroke();
	var progresoEntero = parseInt(preloader.progress*100);
	$("#porcentaje").text(progresoEntero+"%");
	if(preloader.progress == 1)
	{
		$("#preloader").remove();
		$("#wrapper").fadeIn();
	}
}

function cargaCompleta(event)
{
	$("#wrapper").append("<img src='"+event.src+"'>");	
}