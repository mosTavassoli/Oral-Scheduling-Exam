class Student_Exams {
  constructor(id, student_id, exam_no) {
    if (id) {
      this.id = id;
    }
    this.student_id = student_id;
    this.exam_no = exam_no;
  }
}
module.exports = Student_Exams;
