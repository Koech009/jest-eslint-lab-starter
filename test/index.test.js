const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

// ---------------------
// Tests for capitalizeWords
// ---------------------
describe('capitalizeWords', () => {
  test('capitalizes normal sentence', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('handles strings with special characters', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });

  test('handles single-word strings', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  test('returns empty string for non-string input', () => {
    expect(capitalizeWords(123)).toBe('');
    expect(capitalizeWords(null)).toBe('');
    expect(capitalizeWords(undefined)).toBe('');
  });
});

// ---------------------
// Tests for filterActiveUsers
// ---------------------
describe('filterActiveUsers', () => {
  test('filters active users from mixed array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Charlie', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Charlie', isActive: true },
    ]);
  });

  test('returns empty array if all users are inactive', () => {
    const users = [
      { name: 'Alice', isActive: false },
      { name: 'Bob', isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  test('returns empty array if input array is empty', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test('returns empty array for non-array input', () => {
    expect(filterActiveUsers(null)).toEqual([]);
    expect(filterActiveUsers({})).toEqual([]);
    expect(filterActiveUsers('not an array')).toEqual([]);
  });

  test('filters out users missing isActive property', () => {
    const users = [
      { name: 'Alice' },
      { name: 'Bob', isActive: false },
      { name: 'Charlie', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([{ name: 'Charlie', isActive: true }]);
  });
});

// ---------------------
// Tests for logAction
// ---------------------
describe('logAction', () => {
  beforeAll(() => {
    // Freeze date to a fixed timestamp for predictable test output
    jest.useFakeTimers().setSystemTime(new Date('2024-11-27T12:00:00Z'));
  });

  test('generates correct log string for valid inputs', () => {
    expect(logAction('login', 'Alice')).toBe(
      'User Alice performed login at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles missing action', () => {
    expect(logAction('', 'Alice')).toBe(
      'User Alice performed  at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles missing username', () => {
    expect(logAction('login', '')).toBe(
      'User  performed login at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles missing both action and username', () => {
    expect(logAction('', '')).toBe(
      'User  performed  at 2024-11-27T12:00:00.000Z'
    );
  });
});
