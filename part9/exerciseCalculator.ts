interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateValues {
  target: number;
  hours: number[];
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number,
): ExerciseSummary => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((a, b) => a + b, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent, target met!";
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "needs improvement";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): CalculateValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  const target = Number(args[2]);
  const hours = args.slice(3).map((hour) => Number(hour));

  if (isNaN(target) || hours.some((h) => isNaN(h))) {
    throw new Error("Provided values were not numbers");
  }

  return {
    target,
    hours,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
