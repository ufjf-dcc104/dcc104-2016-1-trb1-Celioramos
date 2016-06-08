
function Sprite (_x, _y,_raio) {	
	_x = _x ? _x: tela.width/2;
	_raio = _raio ? _raio: 15;
	_y = _y ? _y: tela.height-_raio;
	this.x = _x;
	this.y = _y;
	this.vx = 0;
	this.ax = 0;
	this.vy = 0;
	this.ay = 0;
	this.raio = _raio;
	this.cor = "lightgrey";
}

Sprite.prototype.desenhar = function(){
	ctx.fillStyle = this.cor;
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

Sprite.prototype.mover = function(){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;
}

Sprite.prototype.restricoes = function() {
	if(this.x < this.raio) this.vx = -this.vx*0.90;
	if(this.x > tela.width - this.raio) this.vx = -this.vx*0.90;
	if(this.y < this.raio) this.vy = -this.vy*0.90;
	if(this.y > tela.height - this.raio) this.vy = -this.vy*0.90;
}

Sprite.prototype.colidiuComCircular = function (alvo) {
	var distancia = Math.sqrt(Math.pow((alvo.x - this.x),2) + Math.pow((alvo.y - this.y),2));
	return distancia < (alvo.raio + this.raio);
}
