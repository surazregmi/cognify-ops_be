export interface Project {
  project_id: number;
  name: string;
  description?: string;
  created_by: number;
  created_at?: Date;
  updated_at?: Date;
}
