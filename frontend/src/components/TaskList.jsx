
import EmptyTask from "./EmptyTask";
import TaskCard from "./TaskCard";
import { useEffect } from "react";

const TaskList = ({ filtertask, filter , handleTaskChanged}) => {


  if (!filtertask || filtertask.length === 0) {
    return <EmptyTask filter={filter} />;
  }
  return (
    <div className="space-y-3 ">
      {filtertask.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} index={index} handleTaskChanged={handleTaskChanged}/>
      ))}
    </div>
  );
};

export default TaskList;
