import { Importance } from "./importance";
import { Status } from "./stage";
import { Unit } from "./unit";

export class Task {
    id: number = 0;
    title: string = '';
    category: string = '';
    dueDate?: Date = new Date();
    estimatedTime: number = 1;
    estimationUnit: string = '';
    importance: Importance = Importance.LOW;
    status: Status = Status.TODO;
    date?: Date = new Date();
}
