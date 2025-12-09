import { Circle, CircleCheck } from "lucide-react";
import { Card } from "./ui/card";

const EmptyTask = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3 ">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "không có nhiệm vụ nào đang làm"
              : filter === "completed"
              ? "chưa có nhiệm vụ nào hoàn thành"
              : "chua có nhiệm vụ"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Theem  nhiệm vụ mới để bắt đầu"
              : `Chuyển sang tất cả để thấy những nhiệm vụ ${
                  filter === "active" ? "đã hoàn thành " : "dang làm"
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmptyTask;
