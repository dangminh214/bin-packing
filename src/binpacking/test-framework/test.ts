import { TestFramework } from ".";

const instanceNumber = 10;
const minW = 1;
const maxW = 20;
const minH = 1;
const maxH = 20;
const boxL = 30;

const tf = new TestFramework(instanceNumber, minW, maxW, minH, maxH, boxL);

tf.generateInstances();
tf.runGreedy();
