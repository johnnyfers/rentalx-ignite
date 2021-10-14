# rentalx-ignite

# Diagram
<img src="./diagrama.png">


# Car registration

**RF**
- It must be possible to register a new car.


**RN**
- It must not be possible to register a car with an existing license plate.
- The car must be registered, by default, with availability.
- The user responsible for registration must be an administrator user.

# Car listing

**RF**
- It must be possible to list all available cars
- It should be possible to list all available cars by - category name
- It should be possible to list all available cars by - brand name
- It should be possible to list all available cars by - car name

**RN**
- The user does not need to be logged into the system.


# Registration of Specification on the car

**RF**
- It must be possible to register a specification for a car


**RN**
- It must not be possible to register a specification for an - unregistered car.
- It must not be possible to register an existing specification for the same car.
- The user responsible for the registration must be a user - administrator.


# Registration of car images

**RF**
- It must be possible to register the car image

**RNF**
- Use multer to upload files

**RN**
- The user must be able to register more than one image for the - same car
- The user responsible for the registration must be a user - administrator.


# Car rental

**RF**
- It must be possible to register a rental


**RN**
- The rental must have a minimum duration of 24 hours.
- It should not be possible to register a new rental if it already exists - there is one open for the same user
- It should not be possible to register a new rental if it already exists - there is one open for the same car
- The user must be logged in to the application
- When renting, the status of the car must be - changed to unavailable


# Car return

**RF**
- It must be possible to return a car

**RN**
- If the car is returned with less than 24 hours, it must be - charged in full daily.
- When returning, the car must be released for - another rental.
- When returning, the user must be released - for another rental.
- When returning, the total rent must be calculated.
- If the return time is longer than the scheduled delivery time, a fine will be charged - proportional to the days of delay.
- If there is a fine, it must be added to the total rent.
- The user must be logged in to the application


# User Rental Listing

**RF**
- It must be possible to search all rentals for the user

**RN**
- The user must be logged in to the application


# Recover Password

**RF**
- It must be possible for the user to recover the password by entering the email
- The user should receive an email with the step-by-step password recovery
- User must be able to enter a new password

**RN**
- The user needs to enter a new password
- The link sent for recovery must expire in 3 hours 
