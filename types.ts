export type Exercise = {
  exName: string;
  exDesc: string;
  exSets: number;
  exReps: number;
  exWeight: string;
};

export type Workout = {
  weekDay: string;
  workout: Exercise[];
};
