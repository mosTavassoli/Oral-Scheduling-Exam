class Exams {
  constructor(
    id,
    exam_no,
    duration,
    start_time,
    end_time,
    booking_slot,
    course_id,
    teacher_id,
    date,
    student_id,
    grade
  ) {
    if (id) {
      this.id = id;
    }
    this.exam_no = exam_no;
    this.duration = duration;
    this.start_time = start_time;
    this.end_time = end_time;
    this.booking_slot = booking_slot;
    this.course_id = course_id;
    this.teacher_id = teacher_id;
    this.date = date;
    this.student_id = student_id;
    this.grade = grade;
  }
}
module.exports = Exams;
