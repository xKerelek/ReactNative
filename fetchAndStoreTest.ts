import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertTest } from './database';

const API_URL = 'https://tgryl.pl/quiz/tests';

export const fetchAndStoreTests = async () => {
    const API_URL = 'https://tgryl.pl/quiz/tests';
    try {
      console.log('Fetching tests from API...');
      const response = await fetch(API_URL);
      const tests = await response.json();
      console.log('Fetched tests:', tests); // Log pobranych danych
  
      for (const test of tests) {
        console.log(`Saving test to database: ${JSON.stringify(test)}`); // Log każdego testu przed zapisem
        await insertTest(test);
      }
  
      const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem('lastFetchDate', today);
      console.log('Tests fetched and stored successfully.');
    } catch (error) {
      console.error('Error fetching or storing tests:', error);
    }
  };
  
  
  
