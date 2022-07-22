import { Importance } from "./importance";
import { Status } from "./stage";

export class Task {
    title: string = '';
    category: string = '';
    dueDate?: Date = new Date();
    estimate: string = '';
    importance: Importance = Importance.low;
    status: Status = Status.toDo;
    date?: Date = new Date();
}
