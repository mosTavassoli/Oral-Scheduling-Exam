"use strict";
const moment = require("moment");

// const StudentExams = require("../models/student_exams");
const db = require("../db/index");
// const ReservedexamsOfStudent = require("../models/exams");

exports.getStudentExams = async (student_id) => {
  const sql = `select distinct c.name ,exam_no ,e.date from exams e , courses c where c.id = e.course_id and exam_no in (select exam_no from student_exams where student_id = ? and  not EXISTS (select * from exams where student_exams.student_id = exams.student_id and student_exams.exam_no = exams.exam_no and exams.student_id is not null))`;
  try {
    let studentExams = await db.query(sql, [student_id]);

    let lists = studentExams.rows;
    var groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    const listGroup = groupBy(lists, "exam_no");
    let newList = [];
    Object.entries(listGroup).forEach(([key, value]) => {
      newList.push(value[0]);
    });
    newList = newList.filter(
      (x) => moment(x.date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")
    );

    return newList;
  } catch (error) {
    throw error;
  }
};
exports.getExamSlots = async (exam_no) => {
  const sql = `select * from exams e where exam_no = ? and booking_status =0`;
  try {
    let examSlots = await db.query(sql, [exam_no]);

    let lists = examSlots.rows;

    return lists;
  } catch (error) {
    throw error;
  }
};

exports.getReservedexamsOfStudent = async (student_id) => {
  const sql = `SELECT e.id,c.name , e.exam_no,e.date,e.start_time,e.end_time,e.grade FROM exams e, courses c where booking_status = 1 and c.id = e.course_id and student_id =?`;
  try {
    let reservedExams = await db.query(sql, [student_id]);
    let lists = reservedExams.rows;
    return lists;
  } catch (error) {
    throw error;
  }
};

exports.reservingExamSlots = async (slot_id, student_id) => {
  const sql = `UPDATE exams set booking_status = 1 ,student_id =? where id = ? `;
  try {
    let reervedSlot = await db.query(sql, [student_id, slot_id]);

    let lists = reervedSlot.rows;

    return lists;
  } catch (error) {
    throw error;
  }
};
exports.cancelingExamSlots = async (slot_id) => {
  const sql = `UPDATE exams set booking_status = 0 ,student_id = null where id = ? `;
  try {
    let reervedSlot = await db.query(sql, [slot_id]);
    let lists = reervedSlot.rows;
    return lists;
  } catch (error) {
    throw error;
  }
};
