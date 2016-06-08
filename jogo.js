var ctx = tela.getContext("2d");
var fps = 30;
var dt = 1/fps;	
var gameOver = false;
var criouChefao = false;
var mudoufase = false;
var delayGameOver=0;

function desenhaPlacar(){
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
	ctx.lineWidth = 1;
	ctx.font = "15px Thaoma";		
	escreve("Fase: " + fase, 10, 20);
	escreve("Vidas: " + pc.vida, 10, 40);
	escreve("Pontos: " + parseInt(pc.pontos),10,60);
	escreve("Munição: " + (parseInt(pc.tiros)) + " Especiais: " + parseInt(pc.especial/10), 10, 80);
	escreve("Energia: " + parseInt(pc.especial%10) + "%", 10, 100);
}

function desenhaNovaFase(){
	ctx.fillStyle = "yellow";
	ctx.strokeStyle = "yellow";
	ctx.lineWidth = 1;
	ctx.font = "35px Thaoma";
	escreve("Parabéns!!! Passou de nível.", tela.width/2 - 150, tela.height/2);
	ctx.font = "15px Thaoma";
	escreve("Para iniciar a fase " + (fase +1) + " pressione enter!!!", tela.width/2 - 75, tela.height/2 +35);
	
}

function desenhaFimJogo(){
	//delayGameOver += dt;
	//tem de fazer piscar na tela.
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
	ctx.lineWidth = 1;
	ctx.font = "35px Thaoma";
	escreve("FIM DE JOGO!!!", tela.width/2 - 100, tela.height/2);
	
	ctx.fillStyle = "blue";
	ctx.strokeStyle = "blue";
	ctx.font = "15px Thaoma";
	escreve("Para reiniciar pressione enter!!!", tela.width/2 - 75, tela.height/2 +35);
	
	
}

function escreve(texto,x,y){
	ctx.fillText(texto, x,y);
	ctx.strokeText(texto, x,y);	
}

function passo(){
	if(!gameOver && !mudoufase){
	
		pc.mover();
		
		for (var i = 0; i < inimigos.length; i++) {
			inimigos[i].mover();
		}
		for(var i in tirosEspeciais){
			tirosEspeciais[i].mover();
		}
		
		for(var i in tiros){				
			tiros[i].mover();
		}
		
		pc.restricoes();

		for (var i = inimigos.length - 1; i >= 0; i--) {
			inimigos[i].restricoes();
		};
		
		for(var i in tirosEspeciais){				
			tirosEspeciais[i].restricoes();
		}
		
		for(var i in tiros){				
			tiros[i].restricoes();
		}

		ctx.clearRect(0, 0, tela.width, tela.height);
		
		
		for(var i in tirosEspeciais){				
			tirosEspeciais[i].desenhar();
		}
		for(var i in tiros){				
			tiros[i].desenhar();
		}

		pc.desenhar();
		
		for(var i in inimigos){
			
			if(inimigos[i].colidiuComCircular(pc)){
				pc.vida--;
				if(pc.vida == 0){
					gameOver = true;
				}else{
					reiniciaJogo();
				}
			}
			for(g in tiros){
				if(tiros[g].colidiuComCircular(inimigos[i])){
					inimigos[i].y = 1200;
					tiros[g].y = -100;
					pc.especial++;
					console.log(inimigos[i].chefao);
					if (inimigos[i].chefao){
						pc.pontos += Math.random() * 300;
						mudoufase = true;
					}else{					
						pc.pontos += 100;
					}
					if (pc.especial % 10 == 0){
						CriaTirosEspeciais();
					}
				}
			
			}
			for(g in tirosEspeciais){
				if(tirosEspeciais[g].colidiuComCircular(inimigos[i])){
					inimigos[i].y = 1200;
					tirosEspeciais[g].y = -100;
				}
			
			}
			inimigos[i].desenhar();
		}

		vida.restricoes();
		
		if (pc.colidiuComCircular(vida)){
			vida.usada = true;
			vida.x = -100;
			vida.y = -100;
			pc.vida++;
		}
		
		carga.restricoes();
		
		if (pc.colidiuComCircular(carga)){
			carga.usada = true;
			carga.x = -100;
			carga.y = -100;
			recarregaCartucho();
		}
		
		carga.desenhar();
		vida.desenhar();
		desenhaPlacar();
		//if(pc.pontos >= (fase *1000)){
		if(pc.pontos >= (fase *200) && !criouChefao){
			criaChefao();
		}
	}else if (gameOver){
		desenhaFimJogo();
	}else if(mudoufase){
		desenhaNovaFase();
	}
	
}

function reiniciaJogo(reiniciaVida){
	tiros = [];
	tirosEspeciais = [];
	inimigos = [];
	ctx.clearRect(0, 0, tela.width, tela.height);
	reposicionaPC();
	inicializaPC(reiniciaVida);	
	recriaInimigos();	
	recarregaCartucho();
	fase = 1;
	gameOver = false;		
	
}

function iniciaNovafase(){
	mudoufase=false;
	fase++;
	inimigos = [];
	for(g in tiros){
		if (tiros[g].y > -100){
			tiros[g].y = -100;	
		}
	}
	ctx.clearRect(0, 0, tela.width, tela.height);
	recriaInimigos();
	reposicionaPC();
	
}

function teclaPressionada(e) {
	switch(e.keyCode) {
		case 32:
			if((window.event.shiftKey)){
				for(var i in tirosEspeciais){				
					if (tirosEspeciais[i].y < -100) {
						tirosEspeciais[i].x = pc.x;
						tirosEspeciais[i].y = pc.y;
						tirosEspeciais[i].vy = -120;
						pc.especial -= 10;
						break;
					}
				}
			}else{
				for(var i in tiros){				
					if (tiros[i].y < -100) {
						tiros[i].x = pc.x;
						tiros[i].y = pc.y;
						tiros[i].vy = -120;
						pc.tiros --;
						break;
					}
			
				}
			}
			break;
		case 13:
			if(gameOver){			
				reiniciaJogo(true);
			}else if(mudoufase){
				iniciaNovafase();
			}
		break;
		case 39:
			pc.ax = 65;
		break;
		case 37:
			pc.ax = -65;
		break;
		case 38:
			pc.ay = -65;
		break;
		case 40:
			pc.ay = 65;
		break;
	}
}

function teclaSolta(e) {
	switch(e.keyCode) {
		case 37:
		case 39:
			pc.ax = 0;
		break;
		case 38:
		case 40:
			pc.ay = 0;
		break;
	}
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);
setInterval(passo, 1000/fps);