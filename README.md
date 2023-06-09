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
Add xy properties with value 0
Add width and height (inspect the background image)
Create a draw method and pass context as argument
Now, use drawImage method on context and pass image and xy on it
Just like input and player variables, create a new global variable background with an instance of the Background class using the new keyword, and pass the width and height of the canvas into it as arguments (because the background class expects it)
Call the draw method on background in animate and pass ctx into it(Remember your draw method requires context as argument)
Since we are drawing everything on a single canvas, draw the background first(place it in front of other methods in animate so sprites like player and enemy will be placed over the background)
The width and height of the background is fixed so you can just pass it in the drawImage method as arguments (because background is not split like the sprites of player and enemy)
Create an update method for background class and decrement x by speed -->Add a property speed and give it a value of 20<--
Call the update method on background in animate
Notice your background will just scroll to the left and it's gone
To revert it back to the original state when it scrolls offscreen, set a condition in update for x where if it is less than 0 minus the width(meaning if background is completely offscreen), set x back to 0
The background will now reset to 0 when scrolled offscreen but you will still see the empty space left behind by the background scrolling away first before it reverts back to its original state
To fix this, create a second drawImage in draw method but add the width property to x coordinate so javascript will draw the background on the empty space the first drawImage method left behind, giving the one endlessly looping background
The looping background will still have a very small gap due to the speed property so you will need to deduct the x coordinate in the second drawImage method by the speed as well to account for this
Comment out update method for background in animate for now so the moving background does not distract you
Now, fill your Enemy class using gameWidth and gameHeight as arguments(because Enemy class needs to know the boundaries of the game, just like Player class)
Set those arguments as class properties
Inspect your enemy image and set the width and height of a single sprite in properties
Set image as a property and link the img tag to it (3 ways to this)
Create xy properties and assign 0 to them
Create draw method with context argument and use drawImage on this argument with image and xy properties passed into it for now
Create an instance of Enemy class using new keyword with variable enemy1 and pass the width and height of the canvas in the instance
Call draw in enemy1 inside animate
Pass the width and height in Enemy's drawImage, squeezing the image into a container based on width and height property values
Just like Player class, we will need to use all 9 parameters on drawImage to crop out the sprites of the enemy image
Pass sx as 0 multiplied by the width to crop the first sprite of enemy image, keep sy as 0 as there is only 1 row of sprites, and pass the width and height to sw and sh
Hardcoding values inside functions is not good because when you need to change the values you will need to get inside these functions and change them which may break other parts of the game that use its logic
So, create frameX property and set it to 0, and replace the hardcoded 0 in sx to frameX property (sy can stay 0 because you know that you will never change it)
Using Player class as reference, y property will be set to gameHeight minus height as enemy1(the worm) should only stay on the ground logically
Set x property to gameWidth for Enemy class to hide it at the right side of canvas for now
Create an update method for Enemy and decrement x to move Enemy to the left
Call update of enemy1 inside animate
For enemies, you want multiples of them unlike player
Create global enemies variable and assign an empty array to it
Delete the enemy1 variable and related lines of code as you will be draw and update from inside handleEnemies function(which you have pre-made as a template before)
Call push on enemies array inside handleEnemies and pass new Enemy with canvas width and height in it as arguments(because again, the Enemy class expects gameWidth and gameHeight)
Just like the deleted enemy1, you want to call on the draw and update method of Enemy class, this time inside handleEnemies
Since we are using an array now, after pushing array items, you want to loop inside the array using a forEach method and for each enemy, call the draw with an argument(What does draw in Enemy expects?), and the update method
We want to test if this works so move the push method inside handleEnemies outside temporarily to create only 1 enemy when called(placing it inside will loop it multiple times per second with no limit when called, which will brick the browser depending on your pc power)
Now call handleEnemies inside animate
Once the above works(enemy worm should be crawling to the left just like when you used enemy1 variable), we would like to add an enemy within a set time interval like 2 seconds
To do that, like previous projects related to this, we want to use time stamps and delta time
Create a global helper variable called lastTime and set it to 0
Create a local variable called deltaTime inside animate and deduct timeStamp with lastTime
This timeStamp variable is calculated internally from requestAnimationFrame(animate) where it will call animate over and over when passed into it and within this method it has 'timestamps' in milliseconds
Pass the timeStamp variable into animate as an argument so it can track this internal timestamp to be used in the deltaTime calculations
As usual, the first count is undefined because there is no timestamp when the the first requestAnimationFrame starts, so pass 0 into the call of animate to start from 0
Now, set lastTime to timeStamp below deltaTime variable so the previous timestamps will be used in the loop for calculation
You can console.log(deltaTime) below lastTime = timeStamp and inspect in console to check these timestamps at work(it will be 16 on average for the fast computers and might be higher for slower computers)
Now we can access deltaTime to periodically create enemies
Pass deltaTime into both the handleEnemies method in animate and its original function
Comment the push method out, and we need two global helper variables to use deltaTime
Create enemyTimer variable and set to 0 which we will use to count from 0 to a limit you set, and whenever it reaches the limit it will reset to 0
Create enemyInterval and set it to 1000 which is the limit you are setting
With the above variables added, set a condition in handleEnemies where if enemyTimer is more than enemyInterval, push new Enemy with the related arguments inside the enemies array(basically move that push method inside this condition)
Reset enemyTimer back to 0 inside this condition
Else, keep incrementing deltaTime to enemyTimer till it reaches the limit(1000 in this case) before it resets and add another new enemy
In a game, the enemies will appear at a random interval
Add a speed property to Enemy class and give it a number
Instead of just decrementing x in update, decrement it by speed
Enemies are now appearing at a constant interval which is predictable so we will now add a randomEnemyInterval global variable and randomise it between 500 to 1500
In the condition in handleEnemies, instead of just when enemyTimer reaches enemyInterval, add randomEnemyInterval into the calculation as well(which will mean instead of just every second(1000 milliseconds), it will be every 1sec + 0.5 to 1.5sec)
Also, set randomEnemyInterval to another random number between 500 to 1500 again in the condition so that the next push loop will be at a different interval
Uncomment out background.update in animate to see your game in action! (kinda)
Comment out the white rectangle in Player class under update(fillRect and fillStyle)
Currently, we are displaying the first frame of the sprite sheet, so let's try and add the rest to animate movements for both Player and Enemy
Comment out background.update again for now
deltaTime will the THE variable to make sure the game runs at smoothly across machines, even at different fps
Pass deltaTime into update in handleEnemies and in Enemy update
Add maxFrame property and set it to 5(6 sprites, because it starts from 0)
Add a helper property called fps and set it to 20. fps will only affect horizontal navigation animation within Enemy sprite sheet (the rest of the game such as Player and background is unaffected)
Add two more helper properties called frameTimer, set it to 0, and frameInterval, set it to 1000 divided by fps
For now, cycle between frames at full speed
To do this, set a condition in Enemy update where if frameX is more than or equal to maxFrame, set frameX to 0
Else, increment frameX
You should now see the worm enemy animating but at very fast speeds
To limit the speed to a certain interval, we will make use of the helper properties(frameTimer and frameInterval) we made
Set a condition in Enemy update where if frameTimer is more than frameInterval, invoke the frameX condition you have written before(move it inside the new condition you have created)
Set frameTimer back to 0 after the frameX condition has ran
Else, increment frameTimer by deltaTime till it reaches the frameInterval threshold
You should now see an animate worm enemy(if not check for undetected syntax or typing errors!)
For Player class, add a maxFrame property, assigning the length of the sprite sheet horizontally
In Player update, if frameX is more than or equal to maxFrame, set frameX back to 0, else, increment frameX till it reaches maxFrame limit
Just like before in Enemy class, the animation goes very fast and we want to limit it using the three helper properties you used in Enemy, fps, frameTimer and frameInterval
Copy those properties and paste them in Player properties
Limit the animation speed by only invoking the frameX condition when frameTimer is more than frameInterval
After invoking the frameX condition, reset frameTimer back to 0
Else, if the frameX condition is not met, increment frameTimer by deltaTime
Player update method do not have access to deltaTime variable in animate, so add deltaTime as an argument in player update in animate, and also the original Player update
Now, player should be moving at a stable and coherent speed
However, if player jumps you will see blinking due to missing frames because there are 9 sprites for the running animation but only 7 for the jumping animation
Since jumping deals with vertical movement, go to vertical movement section and add maxFrame equals to 5(\*\*there is still a missing frame if you move horizontally and jump 4 times, the 4th jump will always miss a frame ) when not on ground, else maxFrame equals to 8 when on ground
In handleEnemies, the push method is periodically adding Enemy class objects to the enemies array without removing it so the game will eventually bloat and cause memory leaks because your pc will eventually run out of memory for it
We will need a way to remove the array items in enemies that have passed offscreen
Add a markedForDeletion property in Enemy class and set it to false
In Enemy update, set a condition where if enemy has moved pass the left side of the canvas completely(x is less than 0 minus width), markedForDeletion turns true
Now, to make use of this markedForDeletion property, in handleEnemies, after the forEach method, filter enemies array and for each enemy, remove enemy array items that has markedForDeletion as false,
Console.log enemies after the push method and you should see enemies being removed as they pass left of the canvas
After the above is working, we shall now deal with score
Set a global variable score and give it 0(const or let --> do you need the variable to be modified)
We will now work on the displayStatusText blank function we created at the start of this project
Pass the context as argument to it(because we want the score to show on the canvas)
Use fillstyle on context applying black, use font on context with 40px Helvetica, use fillText with parameters text you want to show and the xy coordinates at the end (i.e fillText(text, x, y))
Call displayStatusText and pass ctx to it
Whenever enemy move pass the left of the canvas, increment score by 1 (place this after markedForDeletion turns true)
We want to make the text on score nicer(using canvas shadow causes frame drops) so we will employ a trick instead
Draw the same message twice (fillStyle and fillText twice) but replace black with white and change the coordinates of the second set slightly
Now we shall work on the collision detection between Player and Enemy class
We will use rectangles for hitboxes so use strokeRect and strokeStyle method in Enemy draw to visually display the hitbox around the Enemy class
Do the same for Player draw
Using rectangles for hitboxes will cause certain collision angles to look really awkward(both sprites not touching at all but it counts as collision)
Try using circle instead using beginPath, arc and stroke methods
The circle will appear at the top left edge and you will need to add the offset of x and y at their width and height divided by 2(or multiply my 0.5) to center them on the sprite(50% x 50% y position of the sprite dimensions)
Draw the same circle for Enemy
Now, to check for collision, you will need to check collision of player against all active enemies for each animation frame
You can either do it in Enemy or Player but Player is preferred because there is only 1 player object but endless enemy objects
So, add an enemies argument inside player update in animate and also the original Player update to reference it
We will now work on collision detection inside Player update
You will apply the forEach method on enemies array to account for all active enemies in the canvas
For each enemy, you will need the center points of Player and Enemy circle hitboxes so add a variable called distanceX and assign the enemy's x position to it deducted by the player's x position to calculate the distance of X between them(Watch the video if you need to visually see what distance of X represents at 5:29:24)
Do the same for coordinate y and name the variable distanceY
We will now use pythagoras theorem for the distance between the 2 positions of Player and Enemy
Since we now know the distance of X and Y(both are the sides of a right angled triangle), the longest side is the hypotenuse of these two distances
Set the variable distance and assign it the square root of distanceX squared plus distanceY squared is equal to the hypotenuse according to the formula
The hypotenuse the is the exact distance between the center point of the Player and Enemy
After you have the distance, set a condition when distance is less than half the width of the enemy PLUS half the width of the player, gameOver is true
Create a global gameOver variable and set it to false
The game should pause or stop when gameOver is true so instead of just requestAnimationFrame(animate) constantly in animate, invoke it only when gameOver is false
If the game stops when Player and Enemy collides, it is working
Show a game over message by adding a condition in displayStatusText where if gameOver is true, showcase a game over text in the center of the canvas(using textAlign, fillStyle and fillText(text, x, y))
Use canvas.width/2 for x to position it at the center of the canvas horizontally and y to whatever position you deem aesthetically pleasing
To do the shadow trick just like the score text, copy and paste the fillStyle and fillText method, changing style to a different color and add some values to the coordinates
\*There's a mistake in the way the collision works
Copy and paste strokeStyle till stroke() in Enemy draw and change the color from white to blue, and remove the offset of of width height divided by 2(remove strokeRect from the duplicate)
Do the same for Player draw
You should see that the game stops when the blue circles collide, not the white circles which you want
The blue circles represent what you are doing under collision detection while visually the white circles are what you want but they are not present in the collision detection logic
As such, you will need to replicate this in the collision detection logic by tweaking distanceX and Y variables in the forEach method
Add the offset of enemy width divided by 2 on enemy.x and the width of the player by 2 in player x(this.x)
Do the same for distanceY and height
Remember to put brackets on each offset (enemy.x + enemy.width/2), to calculate them first before deducting to get the distance accurately
After the above is changed, you should see the white circles colliding and triggering game over instead of the blue ones
Comment or delete these circles and rectangles hitboxes out after you are done
We are now trying to make this game mobile friendly
In CSS, give canvas1 a max-width and max-height of 100%
Also give all element a value of 0 in margin and padding, and box sizing of border-box
Increase the canvas width in js file until you can see the score text
Currently, only refreshing restart the game
Create a restartGame function
Add a restart method in Player class and in it set x position back to the same position as in Player property and y to the same as its property as well
Change x in Player property to 100, and do it for the restart method as well(aesthetic purposes?)
You want player to start in running animation so 'import' maxFrame and frameY to restart
In background class, add a restart method and set x to 0 to get visual feedback that the background also restarts to its starting point
Call restart on player in the restartGame function, and do the same for background
We want to reset score, enemies array, and remove the game over text, so set all of those to their original values in restartGame
Now we want to assign a key to restart the game with
In keydown event listener, add an else if condition where if enter is pressed AND gameOver is true, call restartGame
Currently, pressing the enter key do not work as in animate, when gameOver is true, requestAnimationFrame will stop running
Add the same animate call you did after animate in the restartGame function to call animate again after gameOver is swapped back to false
When the game is restarted, score text gets clipped as it is using textAlign center in the gameOver condition in displayStatusText
Add a textAlign for context before this gameOver condition and set it to left
Now for the game over message you should tell the player to press enter to restart the game
Now to support mobile, we will tamper with touch events
Remove console.log(enemies)
Add a touchstart event listener with all the other event listeners
We will console.log something when the user touches the browser
Add touchmove and touchend event listeners as well
Console.log start, moving, end for the respective event listeners
Once you touch the screen/browser, start console.logs, once you click and hold, moving console.logs. After you let go of the click, end console.logs
If you console.log the event(or e) in touchstart, you can see a list of properties
The one you are interested in is the coordinates which is stored in changedTouches property
Click and you can see the pageX and pageY coordinates, indicating where the user is touching
Console.log the event in touchmove will let you know where the user is swiping based on the start and end xy coordinates
With this in mind, change the console.logs into the property changedTouches in the event at index 0 and property pageY
Do it for all the touch events
In the InputHandler constructor, add the property touchY and set it to an empty string
Add touchThreshold property and set it to 30(start and end touch should be 30px apart)
Now, instead of console.log the event properties, set touchY to the event property you are targetting(pageY in this case)
Remove all console.logs from touch events
Add swipeDistance variable in touchmove event listener and calculate in it e.changedTouches[0].pageY minus this.touchY
Add a condition where if swipeDistance is less than negative touchThreshold(-30 representing upward movement) AND swipe up is not yet present in the keys array, push "swipe up" into keys
Else, if swipeDistance is more than touchThreshold AND swipe down key is not in the keys array, push swipe up into keys(the opposite down movement is positive)
In touchend event listener, console.log this.keys to confirm that there are no duplication of keys(if there is that means your conditions are not working, check for syntax, brackets and typos)
Once the above is done, use splice method on keys array and remove swipe up and swipe down in the array once the touch 'ends'
This way, only only swipe up or swipe down will be present in the array at any given time
Remove the console.log in touchend once you have affirm the above is working
We want the player to swipe down to trigger restart so add the condition in touchmove event listener after the swipe down condition, where if gameOver is true, call restartGame
In the controls section in Player, for ArrowUp condition, add an OR operator after ArrowUp and insert an identical condition but for swipe up(remember brackets because AND operator is prioritized over OR)
Now swiping up should make player jump
Add swipe down text to the game over text to inform user
Javascript fullscreen API allow us to show an element and all its descendants(in this case canvas and everything inside it) while hiding all other browser stuff like user interfact, sidebars etc
Add a button and give it an id of fullScreenButton and the text Toggle FullScreen in html
Style it in css(just refer to his dimensions i guess)
Bring it to the js file using getElementById on variable fullScreenButton(assigning it using the Id directly in this case does not work as well as in properties because there is no reference yet)
Create a toggleFullScreen function and console.log document.fullscreenElement
document.fullscreenElement is a built in read only property on document object to check if full screen is activated or not
Add a condition where if document.fullscreenElement is not present(not true), invoke requestFullscreen().then().catch() on canvas
\*\*New js method i have not learned, asynchronous and Promise
.requestFullscreen() method is asynchronous, returns a Promise
Remove then() for now and in catch, if error(err) is caught, alert Error, can't enable full-screen mode: ${err.message} using template literals(back ticks)
err.message is an auto generated error message from the browser
Else, call document.exitFullscreen() to exit full screen(since the initial condition changes the game into full screen mode)
If you call toggleFullScreen() to test the function, it will bring up an error because full screen can only be initiated by user gesture
To fix this, create a click event listener for fullScreenButton and trigger it in the callback
Once the above work, let's get back to collision detection because the current collision hitbox is simply unintuitive since if you uncomment the circle drawings on Player and Enemy, the circles are clearly bigger than the sprites which means alot of empty spaces are within the hitboxes as well
Reducing the circle hitbox makes sense because when the sprites collide, the smaller circle means your sprites are actually 'touching' each other when colliding
You can adjust the hitboxes in the draw method before applying it in the update method under collision detection because the latter is where the logic is executed while the former only showcases it visually and not functionally
To reduce circle, you wannt to target the arc, and maybe instead of only dividing the radius (.arc(x,y,radius,start angle, end angle)) by 2, we can divide it by 3 to make it smaller
Notice the circle is not exactly centered around the sprite, you can offset it in y by a positive number like 20(to move it down)
Once you are visually satisfied with the hitboxes, update it in the collision detection section accordingly
For the worm enemy, you want to adjust the hitbox to center around its head which is the majority of its body
Make the changes visually in the Enemy draw just like in Player
Divide the radius by 3 instead of 2 to make it smaller
\*\*To see the circles properly you might want to move the circle drawings after drawImage to put them in front of the images for clearer visualization
You want to move the circle horizontally to the left to match the head of the worm, so offset it by -20 for example
Once you are satisfied with the hitbox location, we need to make the collision functional in the collision detection section in Player class update
Since this only affects enemies, look for the variables and properties that affect enemies and update accordingly
You changed x position of enemy so update that in distanceX for enemy
You also changed division of width by 2 to 3 so update that too
Once you are satisfied with the way the hitboxes collides, comment the circle drawings out again
Done!
