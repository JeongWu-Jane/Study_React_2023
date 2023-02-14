import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`CounteB Update - count: ${obj.count}`);
  });
  return <div>{obj.count}</div>;
});

/* const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  //이전 pros=현재 pros
  return false; //이전 props  != 현재 proops
}; */
const areEqual = (prevProps, nextProps) =>
  prevProps.obj.count === nextProps.obj.count;

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA counter={counter} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        {/* <CounterB obj={obj} /> */}
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};
export default OptimizeTest;
