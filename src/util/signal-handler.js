/* @flow */
import {forwardSignalToSpawnedProcesses} from './child.js';

function forwardSignalAndExit(signal: string) {
  forwardSignalToSpawnedProcesses(signal);
  throw new Error('Received SIGTERM, terminating.');
}

export default function handleSignals() {
  process.on('SIGTERM', () => {
    forwardSignalAndExit('SIGTERM');
  });
}
