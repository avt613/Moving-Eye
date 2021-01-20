
/*  
    use the MovingEye class to create the object(s) for the eye(s)
    There are 3 parameters:
    1) The ID of the svg/outer eye which contains the iris
    2) The ID of the iris which will move
    3) The maximum percentage the iris can move in the outer eye
    e.g.
        LeftEye = new MovingEye('SVGRoot', 'layer1', 20);
        RightEye = new MovingEye('SVGRoot1', 'layer1', 20);

    
    Activate the eyes by running the ActivateEye function passing through the eye variables set previously
    e.g.
        ActivateEye(LeftEye);
        ActivateEye(RightEye);
*/
class MovingEye {
    constructor(id, irisid, movement) {
        // save the outer eye which contains the iris (I will refer to this as the 'outer eye')
        this.bound = document.getElementById(id);
        // save the iris which will move
        this.iris = this.bound.getElementById(irisid);
        // maximum percentage the iris can move in the outer eye
        this.movement = movement;
        //find the x and y coordinates of the midpoint of the outer eye by taking an average of the coordinates of the edges
        this.midX = (
            this.bound.getBoundingClientRect().left + this.bound.getBoundingClientRect().right)/2;
        this.midY = (
            this.bound.getBoundingClientRect().top  + this.bound.getBoundingClientRect().bottom)/2;
    }
    // Function which will be called when the mouse is moved. Requires 2 parameters, the x and y coordinates of the mouse respectively
    mousemoved(mouseX, mouseY){
        // check if the mouse is to the left or right of the center of the outer eye
        if(mouseX < this.midX){
            // if the mouse is on the left, find the difference between the x coordinate of the mouse and the left hand side of the page and turn that into a percentage
            var x = (mouseX - this.midX) / this.midX;
        }else if(mouseX > this.midX){
            // if the mouse is on the right, find the difference between the x coordinate of the mouse and right hand side of the page and turn that into a percentage
            var x = (mouseX - this.midX) / (window.innerWidth - this.midX);
        }else{
            // if the mouse is in line with the eye, center the eye
            var x = 0;
        };
        // check if the mouse is to the above or below of the center of the outer eye
        if(mouseY < this.midY){
            // if the mouse is on the above, find the difference between the y coordinate of the mouse and the top of the page and turn that into a percentage
            var y = (mouseY - this.midY) / this.midY;
        }else if(mouseY > this.midY){
            // if the mouse is on the below, find the difference between the x coordinate of the mouse and bottom of the page and turn that into a percentage
            var y = (mouseY - this.midY) / (window.innerHeight - this.midY);
        }else{
            // if the mouse is in line with the eye, center the eye
            var y = 0;
        };
        // multiply the 2 values by the movenent factor (set earlier) and turn into a percentage
        x = this.movement * x + "%";
        y = this.movement * y + "%";
        // finally move the iris
        this.iris.style.transform = "translate("+ x +","+ y +")";
    }
}
function ActivateEye(eye){
    document.addEventListener("mousemove", function(e) {
        eye.mousemoved(e.clientX, e.clientY);
    });
}
