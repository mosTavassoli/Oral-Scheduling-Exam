"use strict";

// const student_lists = require("../models/student_lists");
const db = require("../db/index");

exports.getStudentLists = async (userId) => {
  const sql = `SELECT id , username,name from users where role = "student" and  id in (
    select sc.student_id from users u , courses c , student_courses sc where u.id = ? and u.course_id = c.id and sc.course_id = u.course_id and sc.student_id not in 
    (select e.student_id from student_exams se ,exams e where se.exam_no =e.exam_no  and grade > 0)
    )`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, [userId]);
    console.log(sql);
    if (!studentLists || !studentLists.rows.length) {
      return [];
    }

    const student_lists = studentLists.rows;

    // student_lists = studentLists.rows.map((StudentList) => {

    // return new student_lists(
    //   StudentList.id,
    //   StudentList.username,
    //   StudentList.name
    // );
    // });

    return student_lists;
  } catch (error) {
    throw error;
  }
};

exports.getLastExamNo = async (userId) => {
  const sql = `select exam_no from exams ORDER by exam_no DESC Limit 1`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, []);
    const result = studentLists.rows[0];
    return result ? result.exam_no : 1;
  } catch (error) {
    throw error;
  }
};

exports.insertIntoExams = async ({
  exam_no,
  duration,
  start_time,
  end_time,
  booking_status = false,
  course_id,
  teacher_id,
  date,
  student_id = null,
  grade = null,
}) => {
  const sql = `INSERT INTO exams(exam_no, duration, start_time, end_time, booking_status, course_id, teacher_id , date , student_id, grade) VALUES(?,?,?,?,?,?,?,?,?,?)`;
  console.log(sql);
  try {
    let studentLists = await db.query(sql, [
      exam_no,
      duration,
      start_time,
      end_time,
      booking_status,
      course_id,
      teacher_id,
      date,
      student_id,
      grade,
    ]);
    console.log(sql);
    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    const lastExamNo = studentLists.rows[0];

    return lastExamNo;
  } catch (error) {
    throw error;
  }
};

exports.createStudentExam = async (student_id, exam_no) => {
  const sql = `INSERT INTO student_exams(student_id, exam_no) VALUES(?,?)`;
  try {
    await db.query(sql, [student_id, exam_no]);
  } catch (error) {
    throw error;
  }
};

exports.getExamtLists = async (userId) => {
  const sql = `SELECT DISTINCT exam_no, date from exams WHERE teacher_id = ?  and exam_done is Null and student_id is not NULL`;
  console.log(sql);
  try {
    let examLists = await db.query(sql, [userId]);
    console.log(sql);
    console.log(examLists);
    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    return examLists.rows;
  } catch (error) {
    throw error;
  }
};

exports.getExamSlots = async (userId) => {
  const sql = `SELECT * from exams WHERE teacher_id = ?  and exam_no = ?`;
  console.log(sql);
  try {
    let examLists = await db.query(sql, [userId]);
    console.log(sql);
    console.log(examLists);
    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    return examLists.rows;
  } catch (error) {
    throw error;
  }
};

exports.getTeacherSlots = async (userId, exam_no, date) => {
  const sql = `SELECT e.id,e.exam_no,e.duration,e.start_time,e.end_time,e.date,e.grade,u.username,u.name from exams e , users u WHERE e.student_id = u.id and teacher_id = ?  and exam_no = ? and date =? and student_id is not NULL and grade is NULL`;
  console.log(sql);
  try {
    let slotLists = await db.query(sql, [userId, exam_no, date]);
    console.log(sql);
    console.log(slotLists);
    // if (!studentLists || !studentLists.rows.length) {
    //   return [];
    // }

    return slotLists.rows;
  } catch (error) {
    throw error;
  }
};

exports.getFinalResultReport = async (userId) => {
  // const sql = `select * from exams where teacher_id =? and grade is not null`;
  const sql = `select e.id,e.exam_no,e.start_time,e.end_time, c.name,e.date,u.username,e.grade from exams e ,users u ,courses c where e.course_id=c.id and e.student_id=u.id and e.teacher_id =? and e.grade is not null `;
  try {
    let resultReport = await db.query(sql, [userId]);
    let result = resultReport.rows;
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateGrade = async (examId, grade) => {
  const sql1 = `DELETE from student_courses where student_id = (select student_id from exams where id = ? and grade >=18 and grade <=31) and course_id = (select course_id from exams where id =?  ) `;
  const sql2 = `UPDATE exams set grade = ? , exam_done = 1 where id = ? `;
  try {
    let result1 = await db.query(sql1, [examId, examId]);
    let result2 = await db.query(sql2, [grade, examId]);
  } catch (error) {
    throw error;
  }
};

exports.getStudentNotBooked = async (userId) => {
  // const sql = `select se.id,exam_no,student_id , name,username from student_exams se, users u where se.student_id = u.id and student_id  not in  (select student_id from exams where teacher_id =? and student_id is not null)
  // `;
  const sql = `select se.id,exam_no,student_id , name,username from student_exams se, users u where se.student_id = u.id and student_id  not in  (select student_id from exams where teacher_id =? and student_id is not null) and exam_no in (select DISTINCT exam_no from exams where teacher_id =?)
  `;

  try {
    let resultReport = await db.query(sql, [userId, userId]);
    let result = resultReport.rows;
    return result;
  } catch (error) {
    throw error;
  }
};
