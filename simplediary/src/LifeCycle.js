import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
    };
  }, []);

  return <div>Unmout Testing Component</div>;
};

const LifeCycle = () => {
  /*   const [count, setCount] = useState(0);
  const [text, setText] = useState(""); */
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(!isVisible);

  /*   useEffect(() => {
    console.log("mount");
  }, []);

  useEffect(() => {
    console.log("update");
  });

  useEffect(() => {
    console.log("count update");
    if (count > 5) {
      alert("count가 5를 넘었습니다.");
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log("text update");
  }, [text]);
 */
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/*  <div>
        {count}
        <button onClick={() => setCount(count + 1)}></button>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div> */}
    </div>
  );
};
export default LifeCycle;
