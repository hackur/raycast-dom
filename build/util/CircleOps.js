'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _colors = require('./colors');

var _viewportUtil = require('./viewportUtil');

var _viewportUtil2 = _interopRequireDefault(_viewportUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOOLBAR_HEIGHT = 0;

function bringToFront(circles, circle, current) {
    circles.splice(current, 1);
    circles.push(circle);
}

function sendToBack(circles, circle, current) {
    circles.splice(current, 1);
    circles.unshift(circle);
}

function newCircle(position, circles, yOrigin) {
    var r = Math.floor(Math.random() * 150) + 50,
        color = _colors.COLORS[Math.floor(Math.random() * _colors.COLORS.length)],
        circle = {
        x: position.x, y: position.y - yOrigin, r: r, color: color
    };

    circles.push(circle);
}

function randomCircle(circles, yOrigin) {
    var viewportRect = _viewportUtil2.default.getRect(),
        x = Math.floor(Math.random() * viewportRect.width),
        y = Math.floor(Math.random() * viewportRect.height),
        r = Math.floor(Math.random() * 150) + 50,
        color = _colors.COLORS[Math.floor(Math.random() * _colors.COLORS.length)],
        circle = {
        x: x,
        y: y - yOrigin,
        r: r,
        color: color
    };

    circles.push(circle);
}

function removeCircle(circles, current) {
    circles.splice(current, 1);
}

function moveCircles(circles, delta) {
    _lodash2.default.forEach(circles, function (circle) {
        circle.x += delta.x;
        circle.y += delta.y;
    });
}

function clear(circles) {
    circles.splice(0, circles.length);
}

var CircleOps = function () {
    function CircleOps() {
        _classCallCheck(this, CircleOps);
    }

    _createClass(CircleOps, null, [{
        key: 'executeCommand',


        //<editor-fold desc="Circles & commands">
        value: function executeCommand(command, circles, current, position) {
            var circle = circles[current],
                transformed = false;

            switch (command) {
                case 'increase-x':
                    circle.x += 10;
                    transformed = true;
                    break;
                case 'decrease-x':
                    circle.x -= 10;
                    transformed = true;
                    break;
                case 'increase-y':
                    circle.y += 10;
                    transformed = true;
                    break;
                case 'decrease-y':
                    circle.y -= 10;
                    transformed = true;
                    break;
                case 'increase-r':
                    circle.r += 10;
                    transformed = true;
                    break;
                case 'decrease-r':
                    circle.r -= 10;
                    transformed = true;
                    break;
                case 'bring-to-front':
                    bringToFront(circles, circle, current);
                    break;
                case 'send-to-back':
                    sendToBack(circles, circle, current);
                    break;
                case 'new-circle':
                    newCircle(position, circles, TOOLBAR_HEIGHT);
                    break;
                case 'random-circle':
                    randomCircle(circles, TOOLBAR_HEIGHT);
                    break;
                case 'remove-circle':
                    removeCircle(circles, current);
                    break;
                case 'move':
                    moveCircles(circles, position);
                    break;
                case 'clear':
                    clear(circles);
                    break;
            }

            if (transformed) {
                circle.x = Math.max(circle.x, 10);
                circle.y = Math.max(circle.y, 10);
                circle.r = Math.max(circle.r, 10);
            }

            return circles;
        }
    }]);

    return CircleOps;
}();

exports.default = CircleOps;