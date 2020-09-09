class User {
  constructor(id, username, password, role, name, course_id) {
    if (id) {
      this.id = id;
    }
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
    this.course_id = course_id;
  }
}
module.exports = User;
