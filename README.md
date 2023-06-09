# HeirBNB

      
HeirBNB is a soft clone of Airbnb. Users will be able to list their spot. Users will also be able to book a spot, as well as create a review for a spot. 

Check out [HeirCNC](https://air-bnb-nsyh.onrender.com)

## Index

[MVP Feature List](https://github.com/FrancisHuynh95/HeirCNC/wiki/Features-List) |
[Database Scheme](https://github.com/FrancisHuynh95/HeirCNC/wiki/Schema) | 
[User Stories](https://github.com/FrancisHuynh95/HeirCNC/wiki/User-Stories) |
[Wireframe](https://github.com/FrancisHuynh95/HeirCNC/files/11681821/AirBnB%2BMVP%2BWireframes.pdf)
|

## Technologies Used


<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

## Splash Page
<img width="702" alt="HeirCNC" src="https://github.com/FrancisHuynh95/HeirCNC/assets/116605438/7a6d2308-ebca-4c63-a562-5e7d63aabe49">

## One spot page and reviews

<img width="635" alt="singleSpot" src="https://github.com/FrancisHuynh95/HeirCNC/assets/116605438/09758f95-5a67-4a73-9bff-67953f47e3c5">
<img width="489" alt="Reviews" src="https://github.com/FrancisHuynh95/HeirCNC/assets/116605438/4a422e65-6b45-4c56-ad5b-ac199aaf115c">


## Getting started
1. Clone this repository:

   `
   https://github.com/FrancisHuynh95/API-project/
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Spots
* Users can create a spot
* Users can read/view other spot
* Users can update their spot
* Users can delete their spot

## Reviews
* Users can create reviews on spots
* users can read/view all of the reviews on a spot
* Users can delete their review on a spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete their booking

## AWS
Logged-in Users can
* Upload multiple images of their spot to AWS S3
