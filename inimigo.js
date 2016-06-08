var imgInimigo1 = new Image();
imgInimigo1.src="imagens/enemy_1.png";

var imgInimigo2 = new Image();
imgInimigo2.src="imagens/enemy_2.png";

var imgInimigo3 = new Image();
imgInimigo3.src="imagens/enemy_3.png";

var imgChefao = new Image();
imgChefao.src="imagens/boss1.png";

var inimigos = [];
function recriaInimigos(){
	for (var i = 0; i < (10 + (2*fase)); i++) {
		inimigos.push(criaInimigo(pc.x + (Math.random() *(tela.width/i) - Math.random() *(tela.width/i)) 
									, -40-Math.random()*100*i, 10+ (10*fase*0.1), fase % 3)); /*aumento de de acordo com a fase*/	
	}	
}

function criaChefao(){
	inimigos = [];
	var inimigo = new Sprite(tela.width/2, 64, 64);
	inimigo.chefao = true;
	inimigo.ax = 30 + (0.1*fase);
	
	criouChefao = true;
	
	inimigo.restricoes = function() {
		/*
			fazer ir e voltar na tela;
		*/
		if(this.x < this.raio) this.vx = -this.vx;
		if(this.x > tela.width - this.raio) this.vx = -this.vx;
		if(this.y > 1000){
			inimigos.splice(inimigos.indexOf(this),1);		
			criouChefao = false;
		}
		
	};
	
	inimigo.desenhar = function() {		
		ctx.drawImage(imgChefao, this.x -this.raio, this.y - this.raio, this.raio*2, this.raio*2);
			
	}
	inimigos.push(inimigo);
}

recriaInimigos();


function criaInimigo(_x, _y, _ay, img) {
	var raio = 16;
	if(_x < raio){
		_x = raio;
	}else if(_x > tela.width - raio){
		_x = tela.width - raio;
	}
	var inimigo = new Sprite(_x, _y, raio);
	inimigo.ay = _ay;
	inimigo.chefao = false;

	inimigo.restricoes = function() {
		if(this.y > 1000){
			inimigos.splice(inimigos.indexOf(this),1);
			inimigos.push(criaInimigo(pc.x + (Math.random() *(tela.width/fase) - Math.random() *(tela.width/fase)) , -Math.random()*100*fase, 10+ (10*fase*0.1))); 
		}
	};
	console.log(img)
	switch(img){
		case 1: 
			imgInimigo = imgInimigo1;
			break;
		case 2: 
			imgInimigo = imgInimigo2;
		break;
		case 3: 
			imgInimigo = imgInimigo3;
		break;
	}
	inimigo.desenhar = function() {		
		//img, x, y, w, h
			ctx.drawImage(imgInimigo, this.x -this.raio, this.y - this.raio, this.raio*2, this.raio*2);		
	};
	return inimigo;
}

