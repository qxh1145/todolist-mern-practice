import {
  Calendar,
  CheckCircle2,
  Circle,
  CircleCheck,
  Shrink,
  Square,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "./ui/input";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
  const toggleTaskComplete = async () => {
    try {
      if (task.status === "active") {
        await api.put(`tasks/${task._id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        handleTaskChanged()
        toast.success(`complete !`);
      }else {
        if (task.status === "complete") {
        await api.put(`tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        handleTaskChanged()
        toast.success(`complete !`);
      }
    }
    } catch (error) {
        console.log("error in toggle task ", error)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      updateTask();
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success(`deleted`);
      handleTaskChanged();
    } catch (error) {
      console.log(error);
      toast.error(`error while delete`);
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      if (!updateTaskTitle.trim()) {
        setIsEditing(false);
        toast.error(`title mustn't empty`);
      } else {
        await api.put(`tasks/${task._id}`, { title: updateTaskTitle });
        handleTaskChanged();
        toast.success(`update task success`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`error while update`);
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 rounded-full transition-all duration-200 size-8",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskComplete}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="edit"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onblur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title);
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground " />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>

            {task.completedAt && (
              <>
                {" "}
                <Calendar className="size-3 text-muted-foreground " />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="gap-2 hidden group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title);
            }}
          >
            <SquarePen size="4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 size="4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default TaskCard;
