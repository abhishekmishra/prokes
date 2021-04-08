const p5 = require("p5");

class Stroke {
    _strokeWeight;
    _stroke;
    _numStrokes;
    _angle;

    constructor(strokeWeight, stroke, angle = 5) {
        this._strokeWeight = strokeWeight;
        this._stroke = stroke;

        if (!this._strokeWeight) {
            throw (`array of stroke weights is required`);
        }

        if (!this._stroke) {
            throw (`array of stroke colors is required`);
        }

        if (this._stroke.length !== this._strokeWeight.length) {
            throw (`stoke colors array and stroke weights array should have same length`);
        }
        this._angle = angle;
        this._numStrokes = 1;
    }

    numStrokes() {
        return this._numStrokes;
    }

    draw(s) {
        s.push();
        s.angleMode(s.DEGREES);
        s.rotate(this._angle);
        for (let i = 0; i < this._stroke.length; i++) {
            s.stroke(this._stroke[i]);
            s.strokeWeight(this._strokeWeight[i]);
            this._drawStrokes(s);
        }
        s.pop();
    }

    _drawStrokes(s) {
        s.line(0, 0, 100, 100);
    }
}

class Lines extends Stroke {
    constructor(strokeWeight, stroke, lines = 3, angle = 45) {
        super(strokeWeight, stroke, angle);
        this._numStrokes = lines;
    }

    _drawStrokes(s) {
        const dx = s.width / (this._numStrokes);
        s.translate(dx / 2, 0);
        for (let i = 0; i < this._numStrokes; i++) {
            s.line(i * dx, -s.height, i * dx, 2 * s.height);
        }
        s.translate(-dx / 2, 0);
    }
}

let strokeColor = [
    "#ffaa00",
    "#00aaff",
    0
];

let strokeWidth = [
    30,
    6,
    1
];

let strokeList = [
    new Lines(strokeWidth, strokeColor, 2, 10),
    new Lines(strokeWidth, strokeColor, 3, 25),
];

let mainSketch = function (s) {
    let inStroke = false;
    let strokeCount = 0;

    let practiceStrokesList = strokeList;
    let currentPracticeStrokes = null;
    let practiceRound = 0;

    s.blah = function() {
        console.log('yo');
    }

    s.setupRound = function () {
        currentPracticeStrokes = practiceStrokesList[practiceRound];
        strokeCount = 0;
        s.background(150);
        currentPracticeStrokes.draw(s);
    }

    s.windowResized = function () {
        const drawingNode = s.select("#drawing");
        const side = Math.min(drawingNode.width * 0.95, drawingNode.height * 0.95);
        s.resizeCanvas(side, side);
        setupRound(s);
    }

    s.setup = function () {
        const drawingNode = s.select("#drawing");
        const side = Math.min(drawingNode.width * 0.95, drawingNode.height * 0.95);
        const cnv = s.createCanvas(side, side);
        cnv.class('mainDrawing')
        s.setupRound();
    };

    s.draw = function () {
        if (s.mouseIsPressed === true) {
            if (!inStroke) {
                inStroke = true;
                // console.log('stroke start');
            }
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            // strokeP5.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
        } else {
            if (inStroke) {
                inStroke = false;
                strokeCount += 1;
                console.log(`stroke #${strokeCount} done.`);
                if (strokeCount >= currentPracticeStrokes.numStrokes()) {
                    console.log(`This round is complete.`);
                    practiceRound += 1;
                    if (practiceRound >= practiceStrokesList.length) {
                        console.log(`All practice rounds complete.`);
                    } else {
                        s.setupRound();
                    }
                }
            }
        }
    };
};

let refSketch = function (s) {
    s.setup = function () {
        s.createCanvas(200, 200);
        s.background(255);
    };

    s.draw = function () {
        // do nothing
    };
}

let strokeSketch = function (s) {
    s.setup = function () {
        s.createCanvas(200, 200);
        s.background(255);
    };

    s.draw = function () {
        // do nothing
    };
}

let mainP5 = new p5(mainSketch, "drawing");
// let strokeP5 = new p5(strokeSketch);
console.log(mainP5);
