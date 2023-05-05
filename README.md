# JOB_STOP

This is a Node.js application built using the Express.js framework and MongoDB for the database. The purpose of this application is to allow admins to post jobs, internships, and remote jobs to the website, as well as manage user accounts and notifications.

## Features

### The application includes the following features:

- User registration and authentication
- Admin user accounts with additional privileges
- Job posting functionality with the ability to edit and delete posts
- Notification system for users to receive updates on job postings
- Ability to post notifications to users
- Posting and management of questions for job applications
- Test taking functionality with the ability to edit and delete tests
- A responsive design.
- Effect of hovering.
- The width of the device will be automatically fixed.

## Installation
To install this application, you will need to have Node.js and MongoDB installed on your system. Then, follow these steps:

 - Clone this repository to your local machine
- Install dependencies using `npm install`
- Start the server using `npm start`
- Access the application at http://localhost:3000


## Routes (You can use 👍)
### User Routes & their works
- `/register` : to show registration form
- `/register` : to register new user
- `/login` : to show login form
- `/login` : to login
- `/logout` : to logout

### Jobs Routes & their works
- `/` : home page
- `/jobs` : to view jobs
- `/jobs/new` : to create new job
- `/jobs/:id` : to view job
- `/jobs/:id/edit` : to edit job
- `/jobs/:id/delete` : to delete job


## Notification Routes & their work
- `/notifications` : to view notifications
- `/notifications/new` : to create new notification
- `/notifications/:id` : to delete notification


## Questions Routes & their work
- `/questions` : to view questions
- `/questions/new` : to create new question
- `/questions/:id` : to delete question
- `/test` : to give test


## User Routes & their work
- `/users` : to view user
- `/users/:id/edit` : to edit user
- `/users/:id` : to delete user





## Authors

- [@vishalfegade](https://github.com/vishalfegade)


## Contributing

Contributions to this project are welcome! If you notice any issues or would like to add a new feature, feel free to open an issue or submit a pull request.


## Demo

https://job-stop.onrender.com/


## Feedback

If you have any feedback, please reach out to us at vsfegade2000@gmail.com


## 🔗 Links

[<img src="https://www.seekpng.com/png/detail/111-1112824_picture-my-portfolio-logo-png.png" width="150">](https://codewithpankaj.vercel.app)


<a href="https://www.linkedin.com/in/vishal-f-10286924a/" target="blank"><img align="center" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin" height="40"/></a><br><br>
<a href="https://leetcode.com/vsfegade/" target="blank"><img align="center" src="https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=#d16c06" alt="LeetCode" height="40"/></a>
<a href="https://auth.geeksforgeeks.org/user/vsfegade/practice" target="blank"><img align="center" src="https://img.shields.io/badge/GeeksforGeeks-gray?style=for-the-badge&logo=geeksforgeeks&logoColor=35914c" alt="geeksforgeeks" height="40"/></a><br><br>

## Lessons Learned

I learned many things while making this repository, i.e.
- How to make a use of Routes & Routing
- How to use MongoDB as a Database
- Dynamic Pages (using express js)
- How to host Full Stack application
- Use of Packages (Package.json)
- Hiding of Private data (.env), environment variables
- Models & Middleware's & Views
- MVC (Model, View, Controller) in Node JS Application
- And much much more....
## Run Locally

Clone the project

```bash
  git clone https://github.com/vishalfegade/Job_stop.git
```

Go to the project directory

```bash
  cd Job_stop
```

Start code editor

```bash
  code .
```




