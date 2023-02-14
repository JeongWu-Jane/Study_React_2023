import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";
import { useState, useRef, useMemo, useCallback } from "react";

// const dummmyList = [
//   {
//     id: 1,
//     author: "박정우",
//     content: "hi1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "홍길동",
//     content: "hi2",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "아무개",
//     content: "hi3",
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "김작가",
//     content: "hi4",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
// ];
function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicond.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        athor: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    // setData([newItem, ...data]);
    setData((data) => [newItem, ...data]); //함수를 전달하는것을 함수형 update --> 최신의 state를 인자로 받으면서 최신의 state 참조 가능
  }, []);
  const onDelete = useCallback((targetId) => {
    setData((data) => data.filter((item) => item.id !== targetId));
    // const newDiaryList = data.filter((item) => item.id !== targetId);
    // setData(newDiaryList);
  }, []);

  const onEdit = useCallback((targetId, targetContent) => {
    setData((data) =>
      data.map((item) =>
        item.id === targetId ? { ...item, content: targetContent } : item
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => ite.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //함수가 아닌 값을 return

  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기:{data.length}</div>
      <div>기분좋은 일기 갯수:{goodCount}</div>
      <div>기분나쁜 일기 갯수:{badCount}</div>
      <div>기분좋은 일기 비율{goodRatio}</div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
