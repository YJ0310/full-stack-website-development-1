// Question 3: University Student Management System - Array Methods (20 marks)
// Scenario: You are developing a student management system for "Universiti Smol Tako". The system needs to analyze student performance, course enrollment, and generate reports.

// Given Data:

// Requirements:

// Honor Roll Students (5 marks)

// Function: getHonorRollStudents()
// Find students with GPA >= 3.5
// Expected Output:
// [
//     { id: 1, name: "Siti Aminah", age: 20, course: "Computer Science", gpa: 3.8, year: 2, fees: 15000 },
//     { id: 3, name: "Chen Wei Ming", age: 21, course: "Computer Science", gpa: 3.9, year: 3, fees: 18000 },
//     { id: 6, name: "Nurul Iman", age: 19, course: "Computer Science", gpa: 3.7, year: 1, fees: 12000 }
// ]

const students = [
  {
    id: 1,
    name: "Siti Aminah",
    age: 20,
    course: "Computer Science",
    gpa: 3.8,
    year: 2,
    fees: 15000,
  },
  {
    id: 2,
    name: "Raj Kumar",
    age: 19,
    course: "Information Technology",
    gpa: 3.2,
    year: 1,
    fees: 12000,
  },
  {
    id: 3,
    name: "Chen Wei Ming",
    age: 21,
    course: "Computer Science",
    gpa: 3.9,
    year: 3,
    fees: 18000,
  },
  {
    id: 4,
    name: "Fatimah Zahra",
    age: 22,
    course: "Business Administration",
    gpa: 3.5,
    year: 4,
    fees: 20000,
  },
  {
    id: 5,
    name: "David Tan",
    age: 20,
    course: "Information Technology",
    gpa: 2.8,
    year: 2,
    fees: 15000,
  },
  {
    id: 6,
    name: "Nurul Iman",
    age: 19,
    course: "Computer Science",
    gpa: 3.7,
    year: 1,
    fees: 12000,
  },
];

const getHonorRollStudents = (students) => {
  return students.filter((student) => student.gpa > 3.5);
};

// console.log(getHonorRollStudents(students));
// console.log(getHonorRollStudents(students).map(student => student.id));

// Course Enrollment Report (5 marks)

// Function: generateCourseReport()
// Create a summary of students per course with their names
// Expected Output:
// {
//     "Computer Science": ["Siti Aminah", "Chen Wei Ming", "Nurul Iman"],
//     "Information Technology": ["Raj Kumar", "David Tan"],
//     "Business Administration": ["Fatimah Zahra"]
// }

const generateCourseReport = (students) => {
  const courses = [...new Set(students.map((student) => student.course))];
  let students_by_courses = {};
  //   courses.map((course) => console.log(course));
  courses.map((course) => {
    students_by_courses = {
      ...students_by_courses,
      [course]: students
        .filter((student) => student.course == course)
        .map((student) => student.name),
    };
  });
  return students_by_courses;
};

console.log(generateCourseReport(students));
console.table(generateCourseReport(students));

// Financial Analysis (5 marks)

// Function: calculateFinancialSummary()
// Calculate total fees, average fees, and highest fee payer
// Expected Output:
// {
//     totalFees: 92000,
//     averageFees: 15333.33,
//     highestFeePayer: "Fatimah Zahra"
// }

const calculateFinancialSummary = (students) => {
  let financial_summary = {};
  let total_fee = 0;
  let highest_fee = 0;
  let highest_name = "";
  students.map((student) => {
    total_fee += student.fees;
    if (student.fees > highest_name) highest_name = student.name;
  });
  const average_fee = total_fee / students.length;
  return (financial_summary = {
    ...financial_summary,
    total_fee: format_number(total_fee),
    average_fee: format_number(average_fee),
    highest_fee_player: highest_name,
  });
};

const format_number = (number) => {
  return parseFloat(
    Intl.NumberFormat(`en-US`, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    }).format(number)
  );
};

console.table(calculateFinancialSummary(students));

// Student Performance Report (5 marks)

// Function: generatePerformanceReport()
// Create a formatted report showing each student's status
// Students with GPA >= 3.5 are "Excellent", >= 3.0 are "Good", < 3.0 are "Needs Improvement"
// Expected Output:
// [
//     "Siti Aminah (Year 2, Computer Science): Excellent (GPA: 3.8)",
//     "Raj Kumar (Year 1, Information Technology): Good (GPA: 3.2)",
//     "Chen Wei Ming (Year 3, Computer Science): Excellent (GPA: 3.9)",
//     "Fatimah Zahra (Year 4, Business Administration): Excellent (GPA: 3.5)",
//     "David Tan (Year 2, Information Technology): Needs Improvement (GPA: 2.8)",
//     "Nurul Iman (Year 1, Computer Science): Excellent (GPA: 3.7)"
// ]

const generatePerformanceReport = (students) => {
  let new_students = [];
  students.map((student) => {
    const comment_config = [
      {
        grade: 3.5,
        comment: `Excellent`,
      },
      {
        grade: 3.0,
        comment: `Good`,
      },
      {
        grade: 0.0,
        comment: `Need Improvement`,
      },
    ];
    student.comment = comment_config[comment_config.length - 1].comment;
    comment_config.reverse().map((comment) => {
      if (student.gpa >= comment.grade) student.comment = comment.comment;
    });
    new_students.push(
      `${student.name} (${student.year}, ${student.course}): ${student.comment} (GPA: ${student.gpa})`
    );
  });
  return new_students;
};

console.table(generatePerformanceReport(students));
