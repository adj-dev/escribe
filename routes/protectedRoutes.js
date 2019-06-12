var router = require("express").Router();
var db = require("../models");
const sendmail = require("sendmail")();

router.use(require("./protection"));
router.use(require("./resolveUser"));

router.get("/", function(req, res) {
  console.log("Home Route Hit");

  let { isInstructor, user } = req.user;
  if (isInstructor) {
    res.render("instructor", user);
  } else {
    res.render("student", user);
  }
});

router.get("/api/instructor/:id", function(req, res) {
  if (!isNotImposter(req)) {
    return res.status(403).json("That is not your data!");
  }
  let condition = {
    include: [{ model: db.Student, include: db.Lesson }],
    where: { id: req.params.id }
  };

  db.Instructor.findOne(condition).then(function(instructor) {
    res.json(instructor);
  });
});

// Get all student data
router.get("/api/student/:id", function(req, res) {
  if (!hasStudent(req)) {
    return res.status(403).json("That is not your data!");
  }

  let condition = { include: [db.Lesson], where: { id: req.params.id } };

  db.Student.findOne(condition).then(function(student) {
    res.json(student);
  });
});

// Get a lesson by id
router.get("/api/lesson/:id", function(req, res) {
  if (!hasLesson(req)) {
    return res.status(403).json("That is not your data!");
  }
  let condition = { where: { id: req.params.id } };

  db.Lesson.findOne(condition).then(function(lesson) {
    res.json(lesson);
  });
});

// Create a new Student
router.post("/api/student", function(req, res) {
  let instructorId = req.user.user.id;
  console.log(req.body);
  let newStudent = req.body;

  db.User.create({
    email: newStudent.email,
    password: newStudent.password,
    isInstructor: false
  }).then(user => {
    sendmail(
      {
        from: "admin@enscribe.io",
        to: user.email,
        subject: "Welcome to Enscribe",
        html:
          "Your login info:<br>email: " +
          user.email +
          "<br>password: " +
          user.password +
          "<br><br>Click <a href='https://pure-wave-91989.herokuapp.com/' target='_blank'>here</a> to log in."
      },
      function(err, reply) {
        console.dir(reply);
        console.log("There");
      }
    );
    db.Student.create({
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      phone: newStudent.phone,
      notes: newStudent.notes,
      UserId: user.id,
      InstructorId: instructorId
    }).then(student => {
      res.json(student);
    });
  });
});

// Create a new Lesson
router.post("/api/lesson", function(req, res) {
  console.log(req.body);
  db.Lesson.create(req.body).then(function(lesson) {
    res.json(lesson);
  });
});

router.post("/new_instructor", function(req, res) {
  db.User.create({
    email: "foo@bar.net",
    password: "1235",
    isInstructor: true
  }).then(user => {
    db.Instructor.create({
      firstName: "Susy",
      lastName: "Queww",
      email: user.email,
      phone: "5554441234",
      UserId: user.id
    }).then(result => {
      res.json(result);
    });
  });
});

router.post("/new_student", function(req, res) {
  // simulating grabbing an id from the req.body
  let instructorId = 1;
  db.User.create({
    email: "johniblake93@gmail.com",
    password: "poop",
    isInstructor: false
  }).then(user => {
    sendmail(
      {
        from: "admin@enscribe.io",
        to: user.email,
        subject: "Welcome to Enscribe",
        html:
          "Your login info:<br>email: " +
          user.email +
          "<br>password: " +
          user.password +
          "<br><br>Click <a href='https://pure-wave-91989.herokuapp.com/' target='_blank'>here</a> to log in."
      },
      function(err, reply) {
        console.dir(reply);
        console.log("There");
      }
    );
    db.Student.create({
      firstName: "Joe",
      lastName: "Binger",
      email: user.email,
      phone: "5554631234",
      notes: "This guy is a mellow character.",
      UserId: user.id,
      InstructorId: instructorId
    }).then(student => {
      res.json(student);
    });
  });
});

router.post("/new_lesson", function(req, res) {
  // simulating grabbing an id from the req.body
  let StudentId = 2;
  db.Lesson.create({
    topic: "THRASH",
    body:
      "THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER THRASHER ",
    StudentId
  }).then(lesson => {
    res.json(lesson);
  });
});

// Edit an Instructor
router.put("/api/instructor/:id", function(req, res) {
  if (!isNotImposter(req)) {
    return res.status(403).json("That is not your data!");
  }
  let { id } = req.params;
  console.log(req.body);
  let condition = { where: { id: id } };
  db.Instructor.update(req.body, condition).then(function(instructor) {
    res.json(instructor);
  });
});
// Edit a Student
router.put("/api/student/:id", function(req, res) {
  if (!hasStudent(req)) {
    return res.status(403).json("That is not your data!");
  }
  let { id } = req.params;
  console.log(req.body);
  let condition = { where: { id: id } };
  db.Student.update(req.body, condition).then(function(student) {
    res.json(student);
  });
});
// Edit a Lesson
router.put("/api/lesson/:id", function(req, res) {
  if (!hasLesson(req)) {
    return res.status(403).json("That is not your data!");
  }
  let { id } = req.params;
  console.log(req.body);
  let condition = { where: { id: id } };
  db.Lesson.update(req.body, condition).then(function(lesson) {
    res.json(lesson);
  });
});

// Delete an example by id
router.delete("/api/instructor/:id", function(req, res) {
  if (!isNotImposter(req)) {
    return res.status(403).json("That is not your data!");
  }
  db.Instructor.destroy({ where: { id: req.params.id } }).then(function(
    instructor
  ) {
    res.json(instructor);
  });
});

// Delete an example by id
router.delete("/api/student/:id", function(req, res) {
  if (!hasStudent(req)) {
    return res.status(403).json("That is not your data!");
  }
  db.Student.destroy({ where: { id: req.params.id } }).then(function(student) {
    res.json(student);
  });
});

// Delete an example by id
router.delete("/api/lesson/:id", function(req, res) {
  if (!hasLesson(req)) {
    return res.status(403).json("That is not your data!");
  }
  db.Lesson.destroy({ where: { id: req.params.id } }).then(function(lesson) {
    res.json(lesson);
  });
});

let isNotImposter = function(req) {
  //this should always be true if this route fires because of our middlewares
  if (req.user) {
    //get the current user's id and the id of the instructor whos data they want
    let userId = req.user.user.id;
    let requestedId = parseFloat(req.params.id);

    //check if the current user is an instructor and if their id matches the instuctor who's data they requested
    if (!req.user.isInstructor || userId !== requestedId) {
      //send an error if the user requested data that is not theirs
      return false;
    }
  }
  return true;
};

let hasStudent = function(req) {
  if (req.user) {
    //get the current user's id and the id of the instructor whos data they want
    let studentId = parseFloat(req.params.id);
    if (req.user.isInstructor) {
      let hasStudent = false;
      let students = req.user.user.Students;
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === studentId) {
          hasStudent = true;
        }
      }
      if (!hasStudent) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

let hasLesson = function(req) {
  if (req.user) {
    let lessonId = parseFloat(req.params.id);

    if (req.user.isInstructor) {
      let hasLesson = false;
      let students = req.user.user.Students;
      for (let i = 0; i < students.length; i++) {
        let lessons = students[i].Lessons;
        for (let j = 0; j < lessons.length; j++) {
          if (lessons[j].id === lessonId) {
            hasLesson = true;
          }
        }
      }
      if (!hasLesson) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

module.exports = router;
