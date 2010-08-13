function Engine() {
	console.log("Engine()", this);
	
}

Engine.prototype.render = function(div_id) {
	console.log("Engine#render(", div_id, ")");
	
}
