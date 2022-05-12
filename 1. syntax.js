// This is a comment

let username = "Andrew"; // <- Here, we're creating a variable called username.
                         //    We're assigning it a value.
                         //    Variables can also be made like this:
                         //        var username = "Andrew"; <- This is not recommended any more.
                         //        const username = "Andrew"; <- You can only assign a value to this once.
                         //    The value is a string.
                         //    Strings can be made like this: `Andrew`, 'Andrew', or "Andrew"
                         //    This line ends in a semicolon. This is because it is an "expression".
                         //    Expressions usually (and should) end in a semicolon.
                         //    However, semicolons are optional.
                         //    Expressions are things like:
                         //        Creating a variable:
                         //            let username = "Andrew";
                         //        Assigning a value to a variable:
                         //            username = "Andrew";
                         //        Calling a function: (More on this later.)
                         //            functionName(someValue);

let age = 14; // <- The value of this variable is a number.
              //    Numbers can have _ in them, but they can't have a space.
              //    For example: 100_000_000

let canDrive = false; // <- The value of this variable is a boolean.
                      // Booleans can only be true or false.

let personalInformation = { // <- This is an object.
                            //    Objects can have properties.
                            //    Properties can have values.

    email: "someone@somewhere.com", // <- This is a property of the object.
                                    //    Properties are separated by commas.
                                    //    Properties can be strings, numbers, booleans, functions, arrays or other objects.

    phoneNumber: "123-456-7890" // <- You don't need to put a comma after the last property.
                                //    (But if you want to, you can.)

} // <- This line doesn't end in a semicolon, even though it technically is part of assigning a value to a variable.
  //    This is purely aesthetical.

let friends = ["John", "Jane"]; // <- This is an array.
                                          //    Arrays can have values.
                                          //    Values can be strings, numbers, booleans, functions, objects, or other arrays.

console.log(username); // <- This is a function call. (More on this later.)
                       //    The important part is that it references a variable, username.
                       //    You reference a variable by typing the variable name.
                       //    You can imagine that the variable name is replaced by the variable's value.
                       //    So in this case, this would be the same as:
                       //       console.log("Andrew");
                       //    Because the value of username is "Andrew".

console.log(personalInformation.email); // <- Here, we're accessing a property on an object.
                                        //    Properties can be accessed by typing the object name, then a dot, then the property name.
                                        //    Just like with variables, you can imagine this being replaced with the property's value.
                                        //    So in this case, this would be the same as:
                                        //        console.log("someone@somewhere.com");

console.log(friends[0]); // <- Here, we're accessing a value in an array.
                         //    Arrays are "0-indexed", meaning the first element is at index 0, the second is at index 1, and so on.
                         //    We access values by typing the array name, then a square bracket, then the index number, then a closing square bracket.
                         //    Just like with variables, you can imagine this being replaced with the value.
                         //    So in this case, this would be the same as:
                         //        console.log("John");
                         //    Because the value at index 0 is "John".