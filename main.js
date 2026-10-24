import { computeAverage } from "./gradeUtils.js";
import isPassing from "./gradeUtils.js";

const enrollees = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

const getEnrollees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 1000);
  });
};







const generateReport = async () => {
  try {
    const students = await getEnrollees();

    const results = students.map(({ name, prelim, midterm, final }) => {
      const average = computeAverage(prelim, midterm, final);
      const status = isPassing(average) ? "PASSING" : "PROBATION";

      return {
        name,
        average,
        status
      };
    });

    const passingStudents = results.filter(
      ({ status }) => status === "PASSING"
    );

    const probationStudents = results.filter(
      ({ status }) => status === "PROBATION"
    );

    const classAverage =
      results.reduce((total, student) => total + student.average, 0) /
      results.length;

    const report = `=== IT313 Enrollment Eligibility Report ===
${results
  .map(
    ({ name, average, status }) =>
      `${name} - Average: ${average.toFixed(2)} - ${status}`
  )
  .join("\n")}
Class Average: ${classAverage.toFixed(2)}
Passing: ${passingStudents.length} / ${results.length}`;

    console.log(report);
  } catch (error) {
    console.error("Failed to retrieve enrollee data:", error.message);
  }
};

generateReport();

