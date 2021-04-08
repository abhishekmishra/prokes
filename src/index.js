class BaseStroke {
    _strokeWeight;
    _stroke;
    _numStrokes;

    constructor(strokeWeight, stroke) {
        this._strokeWeight = strokeWeight;
        this._stroke = stroke;
        this._numStrokes = 1;
    }

    numStrokes() {
        return this._numStrokes;
    }

    draw(s) {
        this._setup(s);
        this._drawStrokes(s);
    }

    _setup(s) {
        s.stroke(this._stroke);
        s.strokeWeight(this._strokeWeight);
    }

    _drawStrokes(s) {
        s.line(0, 0, 100, 100);
    }
}

function stroke0(s, sw, c = 0) {
    s.strokeWeight(sw);
    s.stroke(c);
    s.line(0, 0, s.width, s.height);
}


let refSketch = function (s) {
    s.setup = function() {
        s.createCanvas(200, 200);
        s.background(255);
    };

    s.draw = function() {
        // do nothing
    };
}

let strokeSketch = function (s) {
    s.setup = function() {
        s.createCanvas(200, 200);
        s.background(255);
    };

    s.draw = function() {
        // do nothing
    };
}

let mainSketch = function (s) {
    let inStroke = false;

    s.setup = function () {
        s.createCanvas(800, 800);
        s.background(80);
        // stroke0(s, 25, "#881100");
        // stroke0(s, 10, "#224400");
        stroke0(s, 1);
    };

    s.draw = function () {
        if (s.mouseIsPressed === true) {
            if (!inStroke) {
                inStroke = true;
                console.log('stroke start');
            }
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            strokeP5.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
        } else {
            if (inStroke) {
                inStroke = false;
                console.log('stroke done');
            }
        }
    };
};

let mainP5 = new p5(mainSketch);
let strokeP5 = new p5(strokeSketch);

// mainP5.blah();
