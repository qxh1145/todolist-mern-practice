import Task from "../model/Task.js";

export const getAllTask = async (req, res) => {

  const {filter = 'today'} = req.query
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'today' : {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case 'week' : {
      const mondayDate = now.getDate() - (now.getDate() - 1) - (now.getDate() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case 'month' : {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break;
    }

    case 'all' : 
    default: {
      startDate: null
    }
  }

  const query = startDate ? {createdAt : {$gte: startDate} } : {}


  try {
    const result = await Task.aggregate([
      {$match: query}, 
      {
        $facet: {
          tasks: [{$sort: {createdAt: -1}}],
          activeCount: [{$match: {status: "active"}}, {$count: "count"}],
          completeCount: [{$match: {status: "complete"}}, {$count: "count"}]
        }
      }
    ]);

    const task = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    res.status(200).json({task, activeCount, completeCount});
  } catch (err) {
    console.log("Error while getAllTask", err);
    res.status(500).json({ message: "Error while get all task" });
  }
};

export const addNewTask = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title)

    // const task = new Task({ title });

    const newTask = await Task.create({title});
    res.status(201).json(newTask);
  } catch (error) {
    console.log("Error while addNewTask", error);
    res.status(500).json({ message: "Error while add new task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Cannot find task" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error while updated task", error);
    return res.status(500).json({ message: "Error while updated task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res
        .status(404)
        .json({ message: "Cannot find task you want to delete" });
    }
    return res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Error while delete task", error);
    return res.status(500).json({ message: "Error while delete task" });
  }
};
