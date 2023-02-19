import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  createContext,
} from "react";

const reducer = (state, action) => {
  switch ((action, type)) {
    case "INIT":
      return action.data;
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((item) => item.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.targetContent }
          : item
      );
    }
    default:
      return state;
  }
};

export const DiraryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);
  const [data, disptach] = useReducer(reducer, []);
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
    // setData(initData);
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData([newItem, ...data]);
    //setData((data) => [newItem, ...data]); //함수를 전달하는것을 함수형 update --> 최신의 state를 인자로 받으면서 최신의 state 참조 가능
  }, []);
  const onDelete = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
    //setData((data) => data.filter((item) => item.id !== targetId));
    // const newDiaryList = data.filter((item) => item.id !== targetId);
    // setData(newDiaryList);
  }, []);

  const onEdit = useCallback((targetId, targetContent) => {
    dispatch({ type: "EDIT", targetId, targetContent });
    /* setData((data) =>
      data.map((item) =>
        item.id === targetId ? { ...item, content: targetContent } : item
      )
    ); */
  }, []);

  const memoizedDispatches = useMemo(() => {
    return [onCreate, onDelete, onEdit];
  }, []); //재생성되지않게

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => ite.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //함수가 아닌 값을 return

  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiraryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <OptimizeTest /> */}
          {/* <LifeCycle /> */}
          {/* <DiaryEditor onCreate={onCreate} /> */}
          <DiaryEditor />
          <div>전체 일기:{data.length}</div>
          <div>기분좋은 일기 갯수:{goodCount}</div>
          <div>기분나쁜 일기 갯수:{badCount}</div>
          <div>기분좋은 일기 비율{goodRatio}</div>
          {/* <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} /> */}
          {/* <DiaryList onEdit={onEdit} onDelete={onDelete} /> */}
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiraryStateContext.Provider>
  );
}

export default App;
