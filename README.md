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
You can use sx and sy to 'move' around in the sprite sheet (0 _ width and 0 _ height equals the first sprite in the first row and any number changes crops at the specified position in the sprite sheet)
Add two properties in Player class called frameX and frameY, and set them to 0
Replace the hardcoded numbers in sx and sy to the respective properties
Now you are able to move through the sprite sheet by changing values in these properties
Add another property called speed and set it to 0 for now
Instead of incrementing x in update, increment it by speed
Incrementing it by speed means at 0, the player will not move, negative player moves left and positive player moves right
Now we can use the input behaviour we set in InputHandler to control player direction
Pass input as argument in update to trigger this
Also pass it in animate when you used update on player to reference it
In Player class under update, we will be dealing with how each input key controls the horizontal(left right), and the vertical(up, down) movements
Set a condition where if the keys array contains ArrowRight, speed is set to 5
Now if you press the right arrow key, it should move to the right
However, it does not matter if you hold the key, or pressed it for a millisecond, it will go right forever without stopping
To fix it, add an else statement where speed is set back to 0
Now whenever you let go of the right arrow key, the player stops
If the above is working, add an else if statement for left arrow key but set the speed to a negative of the speed value you put in right arrow key (so the speed is consistent left and right)
Now you can move the player left and right
To make it so the player cannot move beyond the left canvas of the game, set a condition where if position x is less than 0, x is 0
Set an else if condition where if x is more than gameWidth minus width, x is gameWidth minus width to prevent player moving beyond the right side of the canvas(gameWidth is the length of the game, width is the length of the player sprite)
Separate the arrow key conditions with the horizontal and vertical movement conditions for better clarity
Add a velocityY property and set it to 0
Now, add an else if condition similar to the left right arrow keys for ArrowUp but decrement it by 30 instead
Now, increment y by velocityY for vertical movement
Pressing the up arrow key makes the player fly up and out of the canvas
To mitigate this, we need an opposing variable(like gravity)
Add a property called weight and set it to 0
Since we need to check where the player is so we can determine when to apply gravity, you should create a new utility method just like draw and update inside Player class
Create an onGround method and it will return true if statement is true and false if otherwise
In this case, if y is more than or equal to gameHeight minus height(meaning if player is standing on the ground/x axis), it is true
Add an if condition under vertical movement in update where when player is not onGround (!this.onGround), increment velocityY by the weight
Give weight a value of 1 in property for now and you will see when your player jumps, it will eventually come down
Increment velocityY to a smaller negative value for clarity(like -10 instead of -30)
Now, add an else statement and set velocityY back to 0 for the if condition in vertical movement where you increment weight so player do not fall through the x-axis(ground) when it comes back down
If player jumps too high, player will still fall partially through the ground because velocityY could not be resetted on time
To prevent this, create a vertical boundary by adding a condition where if y is more than gameHeight - height(identical to onGround return statement), y is equal to gameHeight - height
For now, player will jump(ArrowUp) higher and higher depending on how long you hold or continually press the key due to the increasing decremental value in your ArrowUp condition
We should make sure player is standing on solid ground before it is allowed to jump
Add an AND operator to ArrowUp condition with an additional onGround requirement so player can only jump when he or she is on the x axis
Now you can jump without triggering it multiplie times as the key is pressed
Set the decrement of velocityY back to 30 to strengthen your jump
Currently, how the jump works is when you press it, velocityY will be at -30 keeps decreasing due to the increasing weight variable you put on it, stops at 0, and come down as velocityY becomes a positive number till it touches the ground where it will be set back to 0
To give the player a jumping animation, set frameY to 1 when player is not on the ground, else set frameY to 0(add these in the vertical movement section)
Now, head to Background class and pass gameWidth and gameHeight as arguments and turn them into class properties
Add image property and link the image from html
