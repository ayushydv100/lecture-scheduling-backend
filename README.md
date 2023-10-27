The Lecture Scheduling Module is a robust web application designed for streamlined course and lecture management. With user-friendly sign-up and login features, the system ensures a secure and personalized experience. Authenticated administrators have the privilege to add courses and lectures, while all users can effortlessly access and view course and lecture information, promoting seamless interaction and collaboration within the educational environment.

Route details:

Auth Routes

File: authRoutes.js

/signup (POST): Register a new user.
/signin (POST): User login.
/signout (GET): User sign-out

File: courseRoutes.js

/course/create/:userId (POST): Create a new course (admin only).
/course/:courseId (GET): Retrieve course details.
/course/photo/:courseId (GET): Retrieve the course's photo.
/courses (GET): List all courses.

Instructer Routes

File: instructerRoutes.js

/instructer/create/:userId (POST): Create a new instructor (admin only).
/instructer/:instructerId (GET): Retrieve instructor details.
/instructers (GET): List all instructors.

Lecture Routes

File: lectureRoutes.js

/lecture/create/:userId (POST): Create a new lecture (admin only).
/lecture/:lectureId (GET): Retrieve lecture details.
/lectures (GET): List all lectures.
/lectures/instructers (GET): Get unique instructors for lectures.
/lectures/:course (GET): Get lectures by course.

User Routes

File: userRoutes.js

/user/:userId (GET): Retrieve user details (requires authentication and authorization).

