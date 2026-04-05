const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const appDatabaseDirectory = path.join(__dirname, "..", "database");
const configuredDatabasePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(appDatabaseDirectory, "library.db");
const databaseDirectory = path.dirname(configuredDatabasePath);
const databasePath = configuredDatabasePath;
const schemaPath = path.join(appDatabaseDirectory, "schema.sql");
const seedPath = path.join(appDatabaseDirectory, "seed.sql");

fs.mkdirSync(databaseDirectory, { recursive: true });

const db = new sqlite3.Database(databasePath);

function run(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function runCallback(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve(this);
    });
  });
}

function get(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function all(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function exec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function seedAdmin() {
  const adminUser = await get(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    ["admin@library.com"]
  );

  if (adminUser) {
    return;
  }

  const seedSql = fs.readFileSync(seedPath, "utf8");
  const adminPasswordHash = bcrypt.hashSync("admin123", 10);
  const finalSeedSql = seedSql.replace("{{ADMIN_PASSWORD_HASH}}", adminPasswordHash);

  await exec(finalSeedSql);
}

async function seedSampleData() {
  const sampleStudentPassword = bcrypt.hashSync("student123", 10);

  const sampleStudents = [
    {
      full_name: "Aman Sharma",
      email: "aman.sharma@example.com",
      roll_number: "BCA2023001",
      course: "BCA",
      phone_number: "9876543210"
    },
    {
      full_name: "Priya Verma",
      email: "priya.verma@example.com",
      roll_number: "BCA2023002",
      course: "BCA",
      phone_number: "9812345678"
    },
    {
      full_name: "Rohit Singh",
      email: "rohit.singh@example.com",
      roll_number: "BCA2023003",
      course: "BCA",
      phone_number: "9898989898"
    },
    {
      full_name: "Neha Gupta",
      email: "neha.gupta@example.com",
      roll_number: "BCA2023004",
      course: "BCA",
      phone_number: "9823456789"
    }
  ];

  const sampleBooks = [
    {
      title: "Introduction to C Programming",
      author: "E. Balagurusamy",
      category: "Programming",
      isbn: "9789388176055",
      total_copies: 5,
      shelf_location: "Rack A-1",
      description: "Basic programming concepts for beginners."
    },
    {
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      category: "Database",
      isbn: "9780073523323",
      total_copies: 4,
      shelf_location: "Rack B-2",
      description: "Covers relational databases, SQL, and transactions."
    },
    {
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      category: "Networking",
      isbn: "9789332585490",
      total_copies: 3,
      shelf_location: "Rack C-1",
      description: "Simple and practical explanation of network concepts."
    },
    {
      title: "Operating System Principles",
      author: "Abraham Silberschatz",
      category: "Operating System",
      isbn: "9788126551960",
      total_copies: 4,
      shelf_location: "Rack C-3",
      description: "Helps students understand processes, memory, and files."
    },
    {
      title: "Web Technologies",
      author: "Uttam K. Roy",
      category: "Web Development",
      isbn: "9780199464500",
      total_copies: 6,
      shelf_location: "Rack D-1",
      description: "Useful for HTML, CSS, JavaScript, and web basics."
    }
  ];

  for (const student of sampleStudents) {
    await run(
      `INSERT OR IGNORE INTO users
      (full_name, email, password, role, roll_number, course, phone_number)
      VALUES (?, ?, ?, 'student', ?, ?, ?)`,
      [
        student.full_name,
        student.email,
        sampleStudentPassword,
        student.roll_number,
        student.course,
        student.phone_number
      ]
    );
  }

  for (const book of sampleBooks) {
    await run(
      `INSERT OR IGNORE INTO books
      (title, author, category, isbn, total_copies, available_copies, shelf_location, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        book.title,
        book.author,
        book.category,
        book.isbn,
        book.total_copies,
        book.total_copies,
        book.shelf_location,
        book.description
      ]
    );
  }

  const sampleIssues = [
    {
      studentEmail: "aman.sharma@example.com",
      bookIsbn: "9789388176055",
      issue_date: "2026-04-01",
      due_date: "2026-04-15",
      return_date: null,
      status: "issued"
    },
    {
      studentEmail: "priya.verma@example.com",
      bookIsbn: "9780073523323",
      issue_date: "2026-03-20",
      due_date: "2026-04-03",
      return_date: null,
      status: "issued"
    },
    {
      studentEmail: "aman.sharma@example.com",
      bookIsbn: "9780199464500",
      issue_date: "2026-03-10",
      due_date: "2026-03-24",
      return_date: "2026-03-22",
      status: "returned"
    }
  ];

  for (const issue of sampleIssues) {
    const student = await get("SELECT id FROM users WHERE email = ? LIMIT 1", [
      issue.studentEmail
    ]);
    const book = await get("SELECT id FROM books WHERE isbn = ? LIMIT 1", [
      issue.bookIsbn
    ]);

    if (!student || !book) {
      continue;
    }

    const existingIssue = await get(
      `SELECT id FROM issue_records
       WHERE student_id = ? AND book_id = ? AND issue_date = ? AND due_date = ?
       LIMIT 1`,
      [student.id, book.id, issue.issue_date, issue.due_date]
    );

    if (existingIssue) {
      continue;
    }

    await run(
      `INSERT INTO issue_records
      (student_id, book_id, issue_date, due_date, return_date, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        student.id,
        book.id,
        issue.issue_date,
        issue.due_date,
        issue.return_date,
        issue.status
      ]
    );

    if (issue.status === "issued") {
      await run(
        `UPDATE books
         SET available_copies = available_copies - 1, updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND available_copies > 0`,
        [book.id]
      );
    }
  }
}

async function initializeDatabase() {
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  await exec(schemaSql);
  await seedAdmin();
  await seedSampleData();
}

module.exports = {
  db,
  run,
  get,
  all,
  exec,
  initializeDatabase
};
