/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman("123")).toBe(false)
  expect(convertBytesToHuman(Symbol("123"))).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe('5.00 B')
  expect(convertBytesToHuman(250)).toBe('250.00 B')
  expect(convertBytesToHuman(1000000)).toBe('976.56 KB')
  expect(convertBytesToHuman(1000000000)).toBe('953.67 MB')
  expect(convertBytesToHuman(0)).toBe('0.00 B')
});

test('Возвращает false для неправильных чисел', () => {
  expect(convertBytesToHuman(-5)).toBe(false)
  expect(convertBytesToHuman(5.5)).toBe(false)
  expect(convertBytesToHuman(-5.5)).toBe(false)
  expect(convertBytesToHuman(Infinity)).toBe(false)
  expect(convertBytesToHuman(NaN)).toBe(false)
});



