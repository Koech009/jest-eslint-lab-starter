const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

// Tests for capitalizeWords
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
});

// Tests for filterActiveUsers
describe('filterActiveUsers', () => {
    test('filters active users from mixed array', () => {
        const users = [
            { name: 'Alice', active: true },
            { name: 'Bob', active: false },
            { name: 'Charlie', active: true },
        ];
        expect(filterActiveUsers(users)).toEqual([
            { name: 'Alice', active: true },
            { name: 'Charlie', active: true },
        ]);
    });

    test('returns empty array if all users are inactive', () => {
        const users = [
            { name: 'Alice', active: false },
            { name: 'Bob', active: false },
        ];
        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns empty array if input array is empty', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});

// Tests for logAction
describe('logAction', () => {
    test('generates correct log string for valid inputs', () => {
        expect(logAction('login', 'Alice')).toBe('Action: login, User: Alice');
    });

    test('handles missing action', () => {
        expect(logAction('', 'Alice')).toBe('Action: , User: Alice');
    });

    test('handles missing username', () => {
        expect(logAction('login', '')).toBe('Action: login, User: ');
    });

    test('handles missing both action and username', () => {
        expect(logAction('', '')).toBe('Action: , User: ');
    });
});
