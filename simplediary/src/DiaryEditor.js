import { useEffect, useState, useRef } from "react";
const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const authorInput = useRef(); //dom에 접근
  const contentInput = useRef(); //dom에 접근

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value, //[e.target.name]가 객체의 key
    });
  };
  /*   (e) => {
              setState({ ...state, content: e.target.value }) */
  const handleClick = () => {
    if (state.author.length < 1) {
      alert("작성자 최소 1글자 이상");
      //focus
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      alert("내용 최소 5글자 이상");
      //focus
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
    alert("저장 성공");
  };
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChange}
        />
        <div>
          <textarea
            ref={contentInput}
            name="content"
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="emotion" onChange={handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <button onClick={handleClick}>저장</button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
