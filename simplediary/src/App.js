import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

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

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onDelete = (targetId) => {
    console.log(targetId);
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, targetContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: targetContent } : item
      )
    );
  };
  return (
    <div className="App">
      {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
