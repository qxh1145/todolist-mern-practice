import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import { FilterType, visibleTaskLimit } from "@/lib/data";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchTask();
  }, [dateQuery]);
  const fetchTask = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.task);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completeCount);
      console.log(res.data.task);
    } catch (error) {
      console.error("error while fetch data : ", error);
      toast.error("Error");
    }
  };

  //bien de luu task da sort

  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "dang lam":
        return task.status === "active";
      case "hoan thanh":
        return task.status === "complete";    
      default:
        return true;
    }
  });

  const visibleTask = filteredTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  )

  const totalPage = Math.ceil(filteredTask.length / visibleTaskLimit);

  const handleNewTaskChanged = () => {
    fetchTask();
  }

  const handleNextPage = () => {
    if(page < totalPage){
      setPage((prev) => prev + 1)
    }
  }
  const handlePrevPage = () => {
    if(page > 1) {
      setPage((prev) => prev - 1)
      console.log("ngon")
    }else{
      console.log("kngon")
    }

  }

  const handlepPageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Purple Corner Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
       linear-gradient(to right, #f0f0f0 1px, transparent 1px),
       linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
       radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),
       radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent)
     `,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%, 100% 100%",
        }}
      />
      {/* Your Content Here */}
      <div className="container p-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6 ">
          <Header />

          <AddTask handleNewTaskAdded={handleNewTaskChanged}/>

          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />

          <TaskList filtertask={visibleTask} filter={filter} handleTaskChanged={handleNewTaskChanged} />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination  handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handleTaskChanged={handlepPageChange} page={page} totalPage={totalPage}/>
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
          </div>

          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
