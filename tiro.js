var missil = new Image();
missil.src = "imagens/missil.png";			
var missilEspecial1 = new Image();
missilEspecial1.src = "imagens/missil3.png";		
var tiros =[];		
var tirosEspeciais=[];

function recarregaCartucho(){
	pc.tiros += 10;
	for (var i = 0; i < 10; i++) {
		tiros.push(CriaTiros());
	}
}

recarregaCartucho();

setInterval(recarregaCartucho, 60*1000);

function CriaTirosEspeciais(){
	tirosEspeciais.push(CriaTiros(9, true));
}

function CriaTiros(_raio, _especial){
	_raio = _raio ? _raio : 8;
	var posicaoEscondida = -12000;
	var tiro = new Sprite(null, posicaoEscondida, _raio);
	var img;
	tiro.col=0;
	tiro.cor = 'blue';		
	tiro.restricoes = function () {
		var arrayDados;
		if(_especial){
			arrayDados = tirosEspeciais;
		}else{
			arrayDados = tiros
		}
		if(this.y < -2*this.raio && this.y > posicaoEscondida ){
			arrayDados.splice(arrayDados.indexOf(this),1);
		}
	};
	
	if(_especial){
		img = missilEspecial1;
	}else{
		img = missil;
	}
	if (_especial){
		tiro.desenhar = function(){
		// img, sx, sy, sw, sh, dx, dy, dw, dh
				ctx.drawImage(missilEspecial1,
					Math.floor(this.col)*18, 0, 18, 48,
					this.x-this.raio, this.y-this.raio, 2*this.raio, 4*this.raio);
				if(this.col>3) {
					this.col =0;
				} else {
					this.col+= 10*dt;
				}
				console.log(Math.floor(this.col)*18);
		}
	}
	if (!_especial){
	
		tiro.desenhar = function(){
			ctx.drawImage(img, this.x - this.raio, this.y -this.raio);
		}
	}
	return tiro;
}