import { Importance } from "./importance";
import { Stage } from "./stage";

export class Task {
    title: string = '';
    category: string = '';
    dueDate?: Date = new Date();
    estimate: string = '';
    importance: Importance = Importance.low;
    stage: Stage = Stage.toDo;
    date?: Date = new Date();
}
