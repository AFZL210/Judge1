import { z } from 'zod';

export const Code = z.object({
    codeId: z.string().min(1),
    code: z.string().min(1),
    input: z.string(),
    language: z.enum(['cpp', 'js', 'py'])
});

export type CodeI = z.infer<typeof Code>;