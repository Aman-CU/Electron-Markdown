let isWriting = false;

let path = []
var Mousetrap = require('mousetrap');
let removed = []

const animation = new Animation();
let eraserActive = false;


var colorPicker = new iro.ColorPicker("#picker", {
    // Set the size of the color picker
    width: 150,
    // Set the initial color to pure red
    color: "#f00"
});
let StrokeColor = "#ff0000"

var x = document.getElementById("picker");
x.style.display = "none";



var strokePicker = document.getElementById('test5')
var html = (document.getElementsByTagName('HTML'))[0]




function setup() {
    createCanvas(window.outerWidth, window.outerHeight)
    frameRate(120)
}


function draw() {
    clear()
    noFill()
    if (eraserActive == true && isWriting === true) {
        console.log("drawing")
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i].length != 0) {

                for (let j = path[i].length - 1; j >= 0; j--) {
                    const x = path[i][j].x, y = path[i][j].y
                    const distance = Math.floor(Math.sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY)))
                    if (distance < strokePicker.value) {
                        path.splice(i, 1)
                        break
                    }

                }

            }
        }

    }
    else if (x.style.display === "none" && strokePicker.style.display === "none") {
        if (isWriting === true) {
            path[path.length - 1].push({ x: mouseX, y: mouseY, StrokeColor: StrokeColor, strokeWeight: strokePicker.value })
        }
    } else {
    }

    for (let i = 0; i < path.length; i++) {
        if (path[i].length != 0) {
            stroke(path[i][0].StrokeColor)
            strokeWeight(+path[i][0].strokeWeight)

            beginShape();
            for (let j = 0; j < path[i].length; j++) {
                vertex(path[i][j].x, path[i][j].y)
            }
            endShape()
        }
    }

    animation.draw(StrokeColor, strokePicker.value)
}

function mousePressed() {
    isWriting = true
    path.push([])
}

function mouseReleased() {
    isWriting = false
}

function clear() {
    path = []
}



colorPicker.on('color:change', function (color) {
    // log the current color as a HEX string
    StrokeColor = color.hexString
    animation.change()


});


Mousetrap.bind("ctrl+p", function (e) {
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
})

Mousetrap.bind("ctrl+z", function (e) {
    if (path.length != 0) {
        removed.push(path.pop())
    }
})

Mousetrap.bind("ctrl+y", function (e) {
    if (removed.length != 0) {
        path.push(removed.pop())
    }
})


Mousetrap.bind("ctrl+c", function (e) {
    path = []
})

Mousetrap.bind("ctrl+b", function (e) {
    if (strokePicker.style.display === "none") {
        strokePicker.style.display = "block";
    } else {
        strokePicker.style.display = "none";
    }
})

Mousetrap.bind("ctrl+[", function (e) {
    strokePicker.value--;
    animation.change()

})


Mousetrap.bind("ctrl+]", function (e) {
    strokePicker.value++;
    animation.change()

})


strokePicker.addEventListener("input", (e) => {
    animation.change()

})


Mousetrap.bind("ctrl+alt+e", function (e) {
    eraserActive = !eraserActive
    if (eraserActive) {
        html.style.cursor = `url("eraser.png") 2 30,auto`
    }
    else {

        html.style.cursor = `url("image.png") 2 30,auto`
    }

})
