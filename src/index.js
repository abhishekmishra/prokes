const p5 = require("p5");

import 'bootstrap/dist/js/bootstrap.bundle';

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
        s.translate(dx, 0);
        for (let i = 0; i < this._numStrokes; i++) {
            s.line(i * dx, -s.height, i * dx, 2 * s.height);
        }
        s.translate(-dx, 0);
    }
}

let strokeColor = [
    "#eeefff",
    "#cccdce",
    "#222324"
];

let strokeWidth = [
    30,
    10,
    2
];

let strokeList = [];

for (let i = 0; i < 10; i++) {
    strokeList.push(new Lines(
        strokeWidth,
        strokeColor,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 45)
    ));
}

let mainSketch = function (s) {
    let practiceOver = false;
    let inStroke = false;
    let strokeCount = 0;

    let practiceStrokesList = strokeList;
    let currentPracticeStrokes = null;
    let practiceRound = 0;

    const exRndText = s.select('#exerciseRound');
    const strokeNumText = s.select('#strokeNumber');

    s.startStroke = function () {
        inStroke = true;
    }

    s.endStroke = function () {
        inStroke = false;
        strokeCount += 1;
        strokeNumText.elt.innerHTML = `${strokeCount}/${currentPracticeStrokes.numStrokes()}`
        console.log(`stroke #${strokeCount} done.`);
        if (strokeCount >= currentPracticeStrokes.numStrokes()) {
            console.log(`This round is complete.`);
            practiceRound += 1;
            if (practiceRound >= practiceStrokesList.length) {
                console.log(`All practice rounds complete.`);
                practiceOver = true;
            } else {
                s.setupRound();
            }
        }
    }

    s.setupRound = function () {
        if (!practiceOver) {
            exRndText.elt.innerHTML = `${practiceRound + 1}/${practiceStrokesList.length}`;
            currentPracticeStrokes = practiceStrokesList[practiceRound];
            strokeCount = 0;
            strokeNumText.elt.innerHTML = `${strokeCount}/${currentPracticeStrokes.numStrokes()}`
            s.background(255);
            currentPracticeStrokes.draw(s);
            s.background("#ffffff88");
        }
    }

    s.windowResized = function () {
        const drawingNode = s.select("#drawing");
        const side = Math.min(drawingNode.width * 0.95, drawingNode.height * 0.95);
        s.resizeCanvas(side, side);
        s.setupRound();
    }

    s.setup = function () {
        const drawingNode = s.select("#drawing");
        const side = Math.min(drawingNode.width * 0.95, drawingNode.height * 0.95);
        const cnv = s.createCanvas(side, side);
        cnv.class('mainDrawing')
        s.setupRound();
    };

    s.draw = function () {
        if (practiceOver) {
            s.background(255);
            s.textAlign(s.CENTER);
            s.text("Practice Complete", s.width / 2, s.height / 2);
        }
        if (s.mouseIsPressed === true) {
            if (!inStroke) {
                s.startStroke();
            }
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            // strokeP5.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
        } else {
            if (inStroke) {
                s.endStroke();
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
