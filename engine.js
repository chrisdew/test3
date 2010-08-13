var NORTH = Math.PI / 2;
var SOUTH = 3 * Math.PI / 4;
var EAST = 0;
var WEST = Math.PI;

var DEGREES_180 = Math.PI;
var DEGREES_90 = Math.PI / 2;
var DEGREES_60 = Math.PI / 3;
var DEGREES_30 = Math.PI / 6;

function V(x, y) {
	this.x = x;
	this.y = y;
}
V.prototype.add = function(v) {
	return new V(this.x + v.x, this.y + v.y);
}
V.prototype.sub = function(v) {
	return new V(this.x - v.x, this.y - v.y);
}



function Sector(begin, end) {
	this.begin = begin;
	this.end = end;
}

Sector.prototype.PARALLEL = "PARALLEL";
Sector.prototype.COINCIDENT = "COINCIDENT";
Sector.prototype.NOT_INTERSECTING = "NOT_INTERSECTING";
Sector.prototype.INTERSECTING = "INTERSECTING";

Sector.prototype.intersects = function(other_line) {
	var denom = ((other_line.end.y - other_line.begin.y)*(this.end.x - this.begin.x)) -
                ((other_line.end.x - other_line.begin.x)*(this.end.y - this.begin.y));
	var nume_a = ((other_line.end.x - other_line.begin.x)*(this.begin.y - other_line.begin.y)) -
                 ((other_line.end.y - other_line.begin.y)*(this.begin.x - other_line.begin.x));		
	var nume_b = ((this.end.x - this.begin.x)*(this.begin.y - other_line.begin.y)) -
                 ((this.end.y - this.begin.y)*(this.begin.x - other_line.begin.x));
	//console.log(denom, nume_a, nume_b);	
	if (denom === 0.0) {
        if(nume_a === 0.0 && nume_b === 0.0) {
			return false;
            //return this.COINCIDENT;
        }
		return false;
        //return this.PARALLEL;
    }			 		
	var ua = nume_a / denom;
    var ub = nume_b / denom; 
	//console.log(ua, ub);	
	if (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0) {
        // Get the intersection point.
        //intersection.x_ = begin_.x_ + ua*(end_.x_ - begin_.x_);
        //intersection.y_ = begin_.y_ + ua*(end_.y_ - begin_.y_);

		return new V( this.begin.x + ua*(this.end.x - this.begin.x)
		            , this.begin.y + ua*(this.end.y - this.begin.y)
					) ;
        //return this.INTERESECTING;
    }
	return false;
    //return this.NOT_INTERSECTING;
}






function Camera(pos, face, fov) {
	this.pos = pos;
	this.face = face;
	this.fov = fov;
}
Camera.prototype.render_display = function(canvas, walls) {
	console.log("Camera#render_display(", canvas, ")");
	
}
Camera.prototype.render_map = function(canvas, walls) {
	console.log("Camera#render_map(", canvas, ")");
	
}

function Engine() {
	console.log("Engine()", this);
	var camera = new Camera(new V(0,0), NORTH, DEGREES_60);
	var walls = [ new Sector(new V(-1, -3), new V(+1, -3))
				, new Sector(new V(-1, -1), new V(-1, -3))
				] ;
}

Engine.prototype.render_display = function(canvas) {
	console.log("Engine#render_display(", canvas, ")");
	this.camera.render_display(walls);
}

Engine.prototype.render_map = function(canvas) {
	console.log("Engine#render_map(", canvas, ")");
	this.camera.render_map(walls);	
}
