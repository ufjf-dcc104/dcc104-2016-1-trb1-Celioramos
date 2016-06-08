var nave = new Image();
nave.src = "imagens/player_ship.png";
var pc = new Sprite(tela.width/2, tela.height-15, 15);	

function reposicionaPC(){
	pc.vx = 0;
	pc.vy = 0;
	pc.ay = 0;
	pc.ax = 0;
	pc.x = tela.width/2;
	pc.y = tela.height-15;	
}

function inicializaPC(reiniciaVida){
	if (reiniciaVida){
		pc.vida = 3;	
		pc.tiros = 0;
	}
	pc.pontos = 0; //incremenado de 100 em 100. Necessário para mudar de fase;
	pc.especial = 0;//incrementa a cada inimigo atingido. Quando for multiplo de 10 ganha um especial.
}

inicializaPC(true);

pc.desenhar = function() {
	if((this.danificado > 1 && fase <= 5) && (this.danificado > 0 && fase > 5)){
		ctx.strokeStyle = 'hsl(' + (this.danificado/6*120) + ', 50%, 50%)';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio + 3, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	}
	
	ctx.drawImage(nave, this.x - this.raio, this.y -this.raio);
}

