class Student_Courses {
  constructor(id, course_id, student_id) {
    if (id) {
      this.id = id;
    }
    this.course_id = course_id;
    this.student_id = student_id;
  }
}
module.exports = Student_Courses;
