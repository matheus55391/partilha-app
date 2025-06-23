// jest.setup.js
// Mock recomendado pela documentação do @react-native-async-storage/async-storage

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
