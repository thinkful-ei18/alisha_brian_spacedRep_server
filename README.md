 # Foodie Phonetics
An app to learn how to say your favorite foods in your new favorite language!

### The Problem
How do you ask for chicken in France? Eggs in Spain? Cake in Germany? With Foodie Phonetics, the user will be able translate a variety of foods into a new language so they can be a foodie anywhere! The MVP is a fully working English to French version of the app.

### The Solution
Using a spaced repetition algorithm, Foodie Phonetics teaches the user how to say the most common food items in their language of choice. Each time the user gets a question correct, that question is moved farther back in a simulated singly linked list. If the user gets a question incorrect, it will be moved to the top of the list. This way, the user can practice what they don't know more frequently that what they do know.

### The App
The production-ready version of Foodie Phonetics can be found at: https://foodiephonetics.netlify.com

### Demo Account
username: demo <br>
password: demouser123

### The API
A RESTful API was created to handle the requests from the client portion of Foodie Phonetics. 
<br><br>
<b>'./routes/register-route.js'</b> details the user creation process, which includes adding a singly linked list to the user model. <br>
<b>'./routes/login-route.js'</b> details the login process using OAuth 2.0.<br>
<b>'./routes/user-route.js'</b> details the user interaction; such as getting a question or verifying the user answer.

### Visual Representation of Technologies Used
![Alt text](https://github.com/thinkful-ei18/Alisha_Brian_SpacedRep_Client/blob/master/FoodiePhonetics_TechnologiesUsed_041918.png?raw=true "Visual representation of technologies used to create Foodie Phonetics")

### Login Page
![Alt text](https://github.com/thinkful-ei18/Alisha_Brian_SpacedRep_Client/blob/master/FoodiePhonetics_LoginPage_042018.png?raw=true "Foodie Phonetics Login Page")

### Registration Page
![Alt text](https://github.com/thinkful-ei18/Alisha_Brian_SpacedRep_Client/blob/master/FoodiePhonetics_registration-page_042018.png?raw=true "Foodie Phonetics Registration Page")

### Main Page
![Alt text](https://github.com/thinkful-ei18/Alisha_Brian_SpacedRep_Client/blob/master/FoodiePhonetics_main-page_042018.png?raw=true "Foodie Phonetics Main Page")

### The Code

#### Mongoose User Schema
![Alt text](https://github.com/thinkful-ei18/alisha_brian_spacedRep_server/blob/master/FoodiePhonetics_MongooseUserSchema_041918.png?raw=true "Mongoose User Schema")

#### User Routes
![Alt text](https://github.com/thinkful-ei18/alisha_brian_spacedRep_server/blob/master/FoodiePhonetics_UserRoutes_041918.png?raw=true "User Routes")




