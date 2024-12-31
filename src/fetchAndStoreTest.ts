import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertTest } from './database';

const API_URL = 'https://tgryl.pl/quiz/tests';

export const fetchAndStoreTests = async () => {
  try {
    console.log('Fetching tests from API...');
    const response = await fetch(API_URL);
    const tests = await response.json();

    for (const test of tests) {
      await insertTest(test);
    }

    const today = new Date().toISOString().split('T')[0];
    await AsyncStorage.setItem('lastFetchDate', today);
    console.log('Tests fetched and stored successfully.');
  } catch (error) {
    console.error('Error fetching or storing tests:', error);
  }
};