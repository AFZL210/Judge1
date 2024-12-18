import { ZodError } from "zod";

class CustomError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
}
  
const createError = (error: string | ZodError | Error = 'Something went wrong', status: number = 400): CustomError => {
  let errorMessage;
  let errorStatus: number = status;

  if(error instanceof ZodError) {
    errorMessage = error.errors[0].message;
    errorStatus = status;
  }
  else if(error instanceof Error) {
    errorMessage = error.message;
  }
  else {
    errorMessage = error;
  }

  return new CustomError(errorStatus, errorMessage);
};

export default createError;