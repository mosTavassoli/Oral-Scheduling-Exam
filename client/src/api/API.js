const baseURL = "/api";

async function userLogin(username, password, role) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
        // role: role,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            resolve(user);
          });
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function userLogout() {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/logout", {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response
          .json()
          .then((obj) => {
            reject(obj);
          }) // error msg in the response body
          .catch((err) => {
            reject({
              errors: [
                { param: "Application", msg: "Cannot parse server response" },
              ],
            });
          }); // something else
      }
    });
  });
}

async function isAuthenticated() {
  const response = await fetch(`${baseURL}/verify`);
  const userJson = await response.json();
  if (response.ok) {
    return userJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

// ------------- fetch the list of Students form DB for CreateExam Component
async function getStudentLists() {
  try {
    const response = await fetch(`${baseURL}/studentLists`);
    // if (response.status === 200) {
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

// ------------- Save slots for an exams into DB
async function saveExam(payLoad) {
  const response = await fetch(`${baseURL}/saveExam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payLoad }),
  });
  console.log("save exams", response);
  return response.json();
}

// ------------- fetch the list of Exams form DB for ExecuteExam Component
async function getExamLists() {
  try {
    const response = await fetch(`${baseURL}/examLists`);

    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

// ------------- fetch the list of slots form DB for ShowSlots Component
async function getTeacherSlots(exam_no, date) {
  try {
    const response = await fetch(
      `${baseURL}/teacherExamSlots/${exam_no}?date=${date}`
    ); // Query String

    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

// ------------------------------------- Update the grade in proper table

async function updateGrade(payLoad) {
  const response = await fetch(`${baseURL}/updateGrade`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payLoad }),
  });
  return response.json();
}
//---------------Teacher report page API FUNCTIONS

async function getFinalResultReport() {
  try {
    const response = await fetch(`${baseURL}/exam/getFullreport`);
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}
async function getstudentNotBooked() {
  try {
    const response = await fetch(`${baseURL}/exam/getStudentNotBooked`);
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

//---------------StudentPage and BookingSlots API FUNCTIONS

async function getStudentExams() {
  try {
    const response = await fetch(`${baseURL}/studentExams`);
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

async function getReservedExams() {
  try {
    const response = await fetch(`${baseURL}/reservedExams`);
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

async function getExamSlots(exam_no) {
  try {
    const response = await fetch(`${baseURL}/examSlots/${exam_no}`);
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

async function reservingSlot(slot_id) {
  const response = await fetch(`${baseURL}/examSlots/${slot_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function cancelExam(reservedExam) {
  const response = await fetch(
    `${baseURL}/deleteExamSlots/${reservedExam.id}?exam_no=${reservedExam.exam_no}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

const API = {
  userLogin,
  userLogout,
  isAuthenticated,
  getStudentLists,
  saveExam,
  getExamLists,
  getTeacherSlots,
  updateGrade,
  getStudentExams,
  getReservedExams,
  getExamSlots,
  reservingSlot,
  cancelExam,
  getFinalResultReport,
  getstudentNotBooked,
};
export default API;
