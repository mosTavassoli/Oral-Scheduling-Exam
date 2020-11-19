# Exam #3: "Scheduling"

## Student: s269966 TAVASSOLI NOROUZI MOSTAFA

## React client application routes

- Route `/home`: Refer to Teacher component which is presented first Page for a Teacher after Login
- Route `/login`: Refer to LoginForm component which is responsible for handling Login Process and Showing Login Panel
- Route `/exam/create`: Refer to CreateExam component which is responsible for creating a new Exams/Session and Slots
- Route `/exam/execute`: Refer to ExecuteExam component which is responsible for showing defined exams and being able to execute them
- Route `/exam/slots`: Refer to ShowSlots component which is responsible for showing defined slots which are booked by students for specific exam during executing process
- Route `/exam/showreport`: Refer to ShowReport component which is responsible for showing the list of the students participated in the exam and the list of the sudents who have not booked the exam
- Route `/student/reserve`: Refer to BookingSlot component which is responsible for showing the list of the available slots to the students for booking
- Route `/student`: Refer to Teacher component which is presented first Page for a Teacher after Login
- Route `/student/reserve?exam_no=${exam_no}`: passing the exam number in Query for showing slots of that specific exam

## REST API server

- POST `/api/login`

  - request body contain the username, password and role of the user
  - response body contains the user object

- POST `/api/logout`

  - clear the cookies of logged in user

- POST `/api/verify`

  - checking whether the user is authenticated or not

- GET `/api/studentLists`

  - request parameter is userId which is read from req.user.user
  - response body contains the list of students for that specific teacher's course

- POST `/api/saveExam`

  - request parameter contains the payLoad object containing slots, studentsIds, dates, start_time and end_time, total duration, teacherId and courseId. All passing data will be saved into the exams table and studen-exam table

- GET `/api/examLists`

  - request parameter is userId which is read from req.user.user
  - response body contains the list of defined exams

- GET `/api/teacherExamSlots/${exam_no}?date=${date}`

  - request parameter is exam_no and date
  - response body contains the list of slots for the specific exam's session on specific date

- GET `/api/exam/getFullreport`

  - request parameter is userId which is read from req.user.user
  - response body contains the list of final report of exam and student grade

- GET `/api/exam/getStudentNotBooked`

  - request parameter is userId which is read from req.user.user
  - response body contains the list of student that did not book the exam

- PUT `/api/updateGrade`

  - request parameter contains the payLoad object containing slotIds, grades

- GET `/api/studentExams`
  - request parameter contains the studentId which is obtained from req.user.user
  - response body contains the list of assigned exams to the student
- GET `/api/reservedExams`

  - request parameter contains the studentId which is obtained from req.user.user
  - response body contains the list of reserved exams

- GET `/api/examSlots/${exam_no}`

  - request parameter contains the exam_no
  - response body contains the list of available slots for choosed exam for booking

- PUT `/api/examSlots/${slot_id}`

  - request parameter contains the slot_id for booking the slot

- PUT `/api/deleteExamSlots/${reservedExam.id}?exam_no=${reservedExam.exam_no}`

  - request parameter contains the reservedExamId and reservedExamNo for cacceling the booked exam

## Server database

- Table `users` - contains the users details both for teachers and students
- Table `student_exams` - contains the student_id and exam_no which is used to assign the students to the exams
- Table `student_courses` - contains the course_id and student_id which is included the students's courses
- Table `exams` - contains the list of created slots for exams
- Table `courses` - contains the teacher's courses

## Main React Components

- `StudentPage` (in `StudentPage.js`): the first page of student after Login which is showing the available exams, reverved exam and being able to cancel, reserve the exam and see the result exam - this component is included with this component : BookingSlot

- `Teacher` (in `Teacher.js`): the first page of teacher after Login which is showing three options for teacher's operations

- `CreateExam` (in `CreateExam.js`): showing the page for creating exam which contains the list of students for specific teacher and being able to define sessions(date, start_time,etc) - this component is included with this component : CreatedSession

- `ExecuteExam` (in `ExecuteExam.js`): shwoing the page for executing exam which contains the list of desined exam's sessions and slots and being able to execute and assign garde in ShowSlots component (which is included in ExecuteExam component)

- `ShowReport` (in `ShowReport.js`): showing the page for showing the full report both the students who have not booked the exams so far and the list of participated students with gards/status

## Screenshot

![LoginPage](https://www.mediafire.com/convkey/7f2a/ifb1gpzegtt9agd6g.jpg)
![Teacher's main page](https://www.mediafire.com/convkey/4743/ayzcgkw880c05mg6g.jpg)
![Create Exams](https://www.mediafire.com/convkey/500c/cobazj6ihrwdpdq6g.jpg)
![Execute Exams](https://www.mediafire.com/convkey/9005/sk0g34cq6ez8czv6g.jpg)
![Assigning grades](https://www.mediafire.com/convkey/886c/p9rrtqs1ru50uxo6g.jpg)
![Show Report](https://www.mediafire.com/convkey/e9af/bi6y43sqtyupkq46g.jpg)
![Students's main page](https://www.mediafire.com/convkey/7aa4/phi3j98yno1at6f6g.jpg)
![Available Slots for booking](https://www.mediafire.com/convkey/cbbc/a7bns1i250wd4y66g.jpg)
![Students's main page](https://www.mediafire.com/convkey/6a87/jgebbmi0k9hj2jj6g.jpg)

## Test users

# Teachers

# Students

- USERNAME, COURSES
- 269966, Web Application, Network
- 269967, Web Application, Network
- 269968, Web Application, Network
- 269970, Web Application, Network
- 269971, Web Application, Network
- 269972, Web Application
- 269973, Web Application
- 269974, Web Application
- 269975, Web Application
- 269976, Web Application
- 269977, Web Application
- 269978, Web Application
- 269979, Web Application
- 269980, Network
- 269981, Network
- 269982, Network
- 269983, Network
- 269984, Network
- 269985, Network
- 266686, Network
