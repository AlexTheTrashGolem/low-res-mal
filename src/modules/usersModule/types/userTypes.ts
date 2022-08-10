export type Progress = "completed" | "in_progress" | "dropped" | "plan_to_watch";
export function isProgress(progress: string): progress is Progress {
  return ["completed", "in_progress", "dropped", "plan_to_watch"].indexOf(progress) !== -1;
}
export type loginType = {
  username: string,
  password: string
}