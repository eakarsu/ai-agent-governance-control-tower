import { getPgKeyValue, setPgKeyValue } from '@/lib/postgres';
import type { TaskItem } from '@/lib/featurePack';
type TaskState={tasks:TaskItem[]};
export async function listTasks():Promise<TaskItem[]>{const s=await getPgKeyValue<TaskState>('entities','__wave10b_tasks__');return s?.tasks||[]}
export async function saveTasks(tasks:TaskItem[]){await setPgKeyValue('entities','__wave10b_tasks__',{tasks})}
