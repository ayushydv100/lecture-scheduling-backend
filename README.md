The Lecture Scheduling Module is a robust web application designed for streamlined course and lecture management. With user-friendly sign-up and login features, the system ensures a secure and personalized experience. Only authenticated administrators have the privilege to add courses and lectures, while all users can effortlessly access and view course and lecture information, promoting seamless interaction and collaboration within the educational environment.

Route details:

Auth Routes

File: authRoutes.js

/signup (POST): Register a new user.<br>
/signin (POST): User login.<br>
/signout (GET): User sign-out.<br>

File: courseRoutes.js

/course/create/:userId (POST): Create a new course (admin only).<br>
/course/:courseId (GET): Retrieve course details.<br>
/course/photo/:courseId (GET): Retrieve the course's photo.<br>
/courses (GET): List all courses.<br>

Instructer Routes

File: instructerRoutes.js

/instructer/create/:userId (POST): Create a new instructor (admin only).<br>
/instructer/:instructerId (GET): Retrieve instructor details.<br>
/instructers (GET): List all instructors.<br>

Lecture Routes

File: lectureRoutes.js

/lecture/create/:userId (POST): Create a new lecture (admin only).<br>
/lecture/:lectureId (GET): Retrieve lecture details.<br>
/lectures (GET): List all lectures.<br>
/lectures/instructers (GET): Get unique instructors for lectures.<br>
/lectures/:course (GET): Get lectures by course.<br>

User Routes

File: userRoutes.js

/user/:userId (GET): Retrieve user details (requires authentication and authorization).

