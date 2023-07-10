import express from 'express';
import { spawn } from 'child_process';

const app = express();

let programProcess;

const startProgram = () => {


  programProcess = spawn("yarn",["start-kusama"]);

  programProcess.stdout.on('data', (data) => {
    console.log(`Program stdout: ${data}`);
  });

  programProcess.stderr.on('data', (data) => {
    console.error(`Program stderr: ${data}`);
  });

  programProcess.on('error', (error) => {
    console.error(`Error executing program: ${error}`);
  });

  programProcess.on('close', (code) => {
    console.log(`Program exited with code ${code}`);
    programProcess = null;
  });
};

const stopProgram = () => {
  if (!programProcess) {
    return;
  }

  programProcess.kill();
  programProcess = null;
};

app.listen(4000, () => {
  console.log('Server is running on port 4000');

  startProgram();
});

process.on('SIGINT', () => {
  stopProgram();
  process.exit();
});

