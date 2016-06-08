var imgVida = new Image();
var imgcarga = new Image();
imgVida.src = "imagens/vida.png";
imgcarga.src = "imagens/carga_municao.png";

var vida;
vida = new Sprite(-100,-100,12);

var carga;
carga = new Sprite(-100,-100,12);

function inicializaEspeciais(){
	carga.timer = 0;
	carga.usada = false;
	carga.exibida = false;
	
	vida.timer = 0;
	vida.usada = false;
	vida.col = 0;
	vida.exibida = false;
	
	carga.x = -1000;
	carga.y = -1000;	
	vida.x = -1000;
	vida.y = -1000;	

}

inicializaEspeciais();

vida.restricoes = function () {
	vida.timer += 1000/fps;
	var temporizador = 40000 + (fase * 10000);
	if((vida.timer  % temporizador < 5000) && (vida.timer  % temporizador > 1000) && (vida.timer  > temporizador)){
		if (!this.usada && !this.exibida){
			var localx = pc.x + (Math.floor(Math.random() * (tela.width/4)) + 1 - (Math.floor(Math.random() * (tela.width/4)) + 1)); 
			var localy = 0;
			if(pc.y < tela.height/2){
				localy = pc.y + Math.floor(Math.random() * (tela.height/4))+1;
			}else{			
				localy = pc.y - Math.floor(Math.random() * (tela.height/4))+1; 
			}
			
			if (localx > tela.width){
				localx = tela.width - vida.raio;
			}else if(localx < 0){
				localx = vida.raio;		
			}
			
			this.exibida = true;
			this.x = localx;
			this.y = localy;
		}
	}else{
		vida.exibida = false;
		this.usada = false;
		this.x = -1000;
		this.y = -1000;	
	}
}

vida.desenhar = function() {		
	ctx.drawImage(imgVida,Math.floor(this.x)-this.raio, Math.floor(this.y)-this.raio, 2*this.raio, 2*this.raio);	
}

carga.restricoes = function () {
	carga.timer += 1000/fps;

	var temporizador = 50000 + (fase * 10000);
	
	if((carga.timer  % temporizador < 5000) && (carga.timer  % temporizador > 1000) && (carga.timer  > temporizador)){
		if (!this.usada && !this.exibida){
			var localx = pc.x + (Math.floor(Math.random() * (tela.width/4)) + 1 - (Math.floor(Math.random() * (tela.width/4)) + 1)); 
			var localy = 0;
			if(pc.y < tela.height/2){
				localy = pc.y + Math.floor(Math.random() * (tela.height/4))+1;
			}else{			
				localy = pc.y - Math.floor(Math.random() * (tela.height/4))+1; 
			}
			
			if (localx > tela.width){
				localx = tela.width - carga.raio;
			}else if(localx < 0){
				localx = carga.raio;		
			}
			
			this.exibida = true;
			this.x = localx;
			this.y = localy;		
		}
	}else{
		carga.exibida = false;
		this.usada = false;
		this.x = -1000;
		this.y = -1000;	
	}
}

carga.desenhar = function() {		
	ctx.drawImage(imgcarga,Math.floor(this.x)-this.raio, Math.floor(this.y)-this.raio, 2*this.raio, 2*this.raio);	
}


