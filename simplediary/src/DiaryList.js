import DiaryItem from "./DiaryItem";
import { useContext } from "react";
import { DiraryStateContext, DiaryDispatchContext } from "./App";
// const DiaryList = ({ diaryList, onEdit, onDelete }) => {
// const DiaryList = ({ onEdit, onDelete }) => {
const DiaryList = () => {
  const diaryList = useContext(DiraryStateContext);
  const { onEdit, onDelete } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
