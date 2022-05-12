let canDrive = false;

let friends = ["John", "Jane"];

if (canDrive) { // This is an if statement.
                // If statements allow us to execute code based on whether a condition is true or false.
                // If the condition is true, the code inside the curly brackets after the if statement will be executed.
                // If the condition is false, the code inside the curly brackets after else statement (if there is one) will be executed.
                // You can also have "else if" statements.
                // Else if statements are just if statements that run if the previous if statement is false.

    console.log("You can drive!"); // <- Because "canDrive" is false, this code will not be executed.
}
else { // <- This is an else statement.

    console.log("You can't drive!"); // <- Because "canDrive" is false, this code will be executed.
}

let x = 0;
while (x < 10) { // <- This is a while loop.
                 //    While the value in the brackets is true, it will run the code in the curly brackets.
                 //    When the value in the brackets is false, the loop will stop.

    console.log(x); // <- Here, we're referencing the value of x.
                    //    You can also reference values of variable outside the loop.

    x++; // <- Here, we're incrementing x by 1.
         //    We can also decrement x by i by going:
         //        x--;
}

for (let i = 0; i < 10; i++) { // <- This is a for loop.
                               //    For loops allow us to execute code a certain number of times, based on what's in the brackets.
                               //    The first thing in the brackets is the "declaration". Here, we are declaring a variable called "i".
                               //    You don't necessarily have to declare a new variable each time, you can also assign values to existing variables.
                               //    The second thing in the brackets is the "condition". Here, we are saying that "i" should be less than 10.
                               //    As long as i is less than 10, the code inside the curly brackets will be executed.
                               //    The third part is the "action". Here, we are saying that "i" should be incremented by 1 each time after the code is executed.
                               //    You can think of this as a condensed while loop.
    
    console.log(i); // <- Here, we are referencing the value of "i".
                    //    You can also reference variables outside of the for loop.
                    //    Each time this code is executed, "i" will have increased by 1.
                    //    Running this code will print 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}

for (let friend in friends) { // <- This is another type of for loop.
                              //    This time, we are doing only one thing.
                              //    We declare a variable called "friend" and for every element in the array, we are assigning the value of the element to friend, then executing the code inside the curly brackets.
                              
    console.log(friend); // <- Here, we are referencing the value of "friend".
                         //    Running this code will print "John", "Jane"
}