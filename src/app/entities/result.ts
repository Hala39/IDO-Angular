export class Result<T> {
    value: T | null = null;
    isSuccess: boolean = true;
    error: string | null = null;
}