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
          () => {
            console.log('Table "tests" created or already exists');
            resolve();
          },
          (_, error) => {
            console.error('Error creating table:', error);
            reject(error);
            return false;
          }
        );
      },
      (error) => reject(error)
    );
  });
};

export const insertTest = (test: any) => {
  return new Promise<void>((resolve, reject) => {
    console.log(`Attempting to insert test: ${JSON.stringify(test)}`); // Log testu przed zapisem
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT OR REPLACE INTO tests (id, name, description, questions) VALUES (?, ?, ?, ?);`,
          [test.id, test.name, test.description, JSON.stringify(test.questions)],
          () => {
            console.log(`Test ${test.id} inserted successfully.`);
            resolve();
          },
          (_, error) => {
            console.error('Error inserting test:', error);
            reject(error);
            return false;
          }
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
            console.log('Loaded tests from database:', tests); // Log danych z bazy
            resolve(tests);
          },
          (_, error) => {
            console.error('Error loading tests from database:', error);
            reject(error);
            return false;
          }
        );
      },
      (error) => reject(error)
    );
  });
};


export const getDatabase = () => db;

export const logDatabaseContent = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM tests;`,
      [],
      (_, results) => {
        const rows = results.rows;
        const tests = [];
        for (let i = 0; i < rows.length; i++) {
          tests.push(rows.item(i));
        }
        console.log('Content of the tests table:', tests);
      },
      (_, error) => {
        console.error('Error loading tests from database:', error);
        return false;
      }
    );
  });
};
