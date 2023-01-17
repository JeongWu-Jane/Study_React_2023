//계산 기능하는 파일

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

//module export
module.exports = {
  moduleName: "calc module",
  add: add,
  sub: sub,
};
