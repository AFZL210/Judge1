import { z } from 'zod';

export enum CodeSatatusEnum {
  Tle = 'TLE',
  Running = 'RUNNING',
  Completed = 'COMPLETED',
  CompilationError = 'COMPILATION_ERROR'
}

export const CodeSchema = z.object({
  code: z.string().min(1, {message: 'code should not be empty'}),
  input: z.string().default(""),
  lang: z.string(),
});

export const UserSchema = z.object({
  username: z.string().min(1),
  auth_token: z.string().min(1)
});

export type Code = z.infer<typeof CodeSchema>;
export type User = z.infer<typeof UserSchema>;