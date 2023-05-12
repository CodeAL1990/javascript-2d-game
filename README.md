# javascript-2d-game

Boilerplate with the usual and add img tags you are using below canvas tag
The img tags are there because we are using a load events listener on windows so we can have access to them in the functions you are creating in the js file
You want to draw the images on canvas through javascript so you want to hide images from the img tags you made in html
Create the load event listener and put the usual variables you need
Create InputHandler, Player, Background, and Enemy class
Create handleEnemies, displayStatusText, animate functions
In InputHandler, you want to keep track of keys that a being pressed down
Add a keys property in InputHandler and assign an empty array to it
This array will have keys added and removed from it, to keep track of multiple key pressing
Add a keydown event listener on window inside InputHandler as a property, with a callback function of event or e and console.log event
Create an instance of the InputHandler by using the new keyword on it and giving it a variable of input to run the code inside InputHandler
Go to console after loading the page, click on the canvas and press any key
You should see the keyboard event with a list of properties
Target the key property in console.log(e.key) so whatever key you are pressing down will be shown on the console
For now, you only care about arrow keys, so add an if condition in the keydown event listener where if e.key equals ArrowDown is true, push it into the keys array
If you are not using ES6 arrow function or a bind method, using function(e) will result in an undefined error because the this keyword is not pointing towards InputHandler class
Using ES6 arrow function(e => {}), this keyword will be inheritted from its parent scope, called lexical scoping
When you console.log the key property in the DOM, and the keys array, continually pressing ArrowDown will result in the key being pushed as many times as you are pressing
You only want 1 ArrowDown key to be present and not multiple so add an additional AND condition in your if condition to check for it in the keys array and only when it is not present(-1) in the array do you push it in the array
Once the keydown listener is working, copy and paste the event listener below it and change keydown to keyup
In the keyup event listener, you want to remove the key as its being let go
Instead of pushing, you want to splice it using the argument of the key you are pressing(this.keys.indexOf(e.key)) and remove 1 from the array
Test it out in the console and you should see your ArrowDown key will be added on key press and removed when key is released
Once that is working, add the remaining arrows by using the OR operator for each arrow in the if condition, using parenthesis to wrap all the arrows condition with OR together to make sure it runs first before the AND operator runs(because AND is prioritized before OR and parenthesis is prioritized before AND)
Do the same for the keyup listener
The input variable is running the code in InputHandler because we are calling it using the new keyword on InputHandler
We now know(hopefully) how to handle player inputs which will be used when moving your character around
Now we focus on the Player Class
Create a constructor and pass it gameWidth and gameHeight because the player should be limited to move around inside the game and not go offscreen
Now set them up as properties assigned to themselves to convert them to class properties
Set the width and height of each sprite
Set the initial xy position to 0
Now create a draw method in the Player class and pass context as its argument
\*\*In the previous project in subclassing(or some other), author used ctx as the argument in draw method instead which is confusing because ctx is also the variable at the start which we are not directly using from the draw method but rather when we call the draw method from the outside and using the original variable as an argument
Use the fillRect method on context and give it a basic rectangle shape with x, y, width, and height as its arguments
Use fillStyle and set it to white because background is dark
Create an instance of player by using the new keyword on Player and passing the canvas width and height as arguments because the Player class expects it
Now, call the draw method on player, passing ctx as argument because the draw method in Player class expects a context argument
(as you have denoted from the way you name them)
To show its movement, edit y value to gameHeight deducted by its height to move it from the top of the y axis to the bottom
Create an update method in Player class and increment x in it
To call on this update method in player, you have to place the update and draw method inside the animate function and use requestAnimationFrame with animate as its argument
This will execute the increment x function on your update method as requestAnimationFrame will continually loop through animate and run the code in it
Use clearRect method in animate to clear the previous 'paints' on the canvas as the animation loop is running
Call animate at the end to run animate
Now we bring in the sprites instead of using rectangles
Use drawImage method in draw and pass in image, 0 and 0 as arguments for now
Add image property to Player and assign get it from html using getElementById or querySelector(OR just use the id as we learned in subclass where The DOM automatically finds it in the DOM when an id is assigned)
Replace the 0s in drawImage with x and y will draw all frames of the sprite sheet onto the canvas
Passing in width and height into it will result in all frames being shrink the image to fit the width and height you designated (remember drawImage takes up to 9)
To extract only 1 sprite from the image, you have to crop it out using all 9 arguments as the 4 parameters needed(sx, sy, sw, sh) can only be used when using all 9
For starters, crop at position(sx, sy) 0, 0 (which is the top left corner of the image) until the width and height(sw, sh) to get the first sprite image
//TBC
