export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

// make selected types of IActivity optional
export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}
