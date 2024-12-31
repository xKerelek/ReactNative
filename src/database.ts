import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('QuizApp.db', '1.0', '', 200000);

export const initializeDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS tests (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            questions TEXT
          );`,
          [],
          () => resolve(),
          (_, error) => {return false }
        );
      },
      (error) => reject(error)
    );
  });
};

export const insertTest = (test: any) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT OR REPLACE INTO tests (id, name, description, questions) VALUES (?, ?, ?, ?);`,
          [test.id, test.name, test.description, JSON.stringify(test.questions)],
          () => resolve(),
          (_, error) => {return false }
        );
      },
      (error) => reject(error)
    );
  });
};

export const loadTestsFromDatabase = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT id, name, description FROM tests;`,
          [],
          (_, results) => {
            const rows = results.rows;
            const tests = [];
            for (let i = 0; i < rows.length; i++) {
              tests.push(rows.item(i));
            }
            resolve(tests);
          },
          (_, error) => {return false }
        );
      },
      (error) => reject(error)
    );
  });
};

export const loadOfflineTests = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tests;`,
          [],
          (_, results) => {
            const rows = results.rows;
            const tests = [];
            for (let i = 0; i < rows.length; i++) {
              const test = rows.item(i);
              test.questions = JSON.parse(test.questions);
              tests.push(test);
            }
            resolve(tests);
          },
          (_, error) => {return false }
        );
      },
      (error) => reject(error)
    );
  });
};

export const loadTestDetails = (testId: string) => {
  return new Promise<any>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM tests WHERE id = ?;`,
          [testId],
          (_, results) => {
            if (results.rows.length > 0) {
              const test = results.rows.item(0);
              test.questions = JSON.parse(test.questions);
              resolve(test);
            } else {
              reject(new Error('Test not found in the database.'));
            }
          },
          (_, error) => {return false }
        );
      },
      (error) => reject(error)
    );
  });
};
