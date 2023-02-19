import { useState, useRef } from "react";
import { DiaryDispatchContext } from "./App";
const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onEdit, onDelete } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleDelete = () => {
    if (window.confirm(`${id}번째 삭제?`)) {
      onDelete(id);
    }
  };

  const handleUpdate = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 수정?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date"> {new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          <div>{content}</div>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleUpdate}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
