/* @flow */

import handleSignals from '../../src/util/signal-handler.js';

(process: any).on = jest.fn();

beforeEach(() => {
  process.on.mockClear();
});

afterAll(() => {
  process.on.mockRestore();
});

it('should attach a handler for SIGTERM event', () => {
  handleSignals();
  expect(process.on.mock.calls[0][0]).toBe('SIGTERM');
});

it('attached SIGTERM handler should throw an unhandled exception and exit', () => {
  handleSignals();
  const sigtermHandler = process.on.mock.calls[0][1];
  expect(sigtermHandler).toThrowError('Received SIGTERM, terminating.');
});
