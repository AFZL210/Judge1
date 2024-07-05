import { z } from 'zod';

export const Code = z.object({
    codeId: z.string().min(1),
    code: z.string().min(1),
    input: z.number(),
    language: z.enum(['cpp', 'js', 'py']),
    callbackUrl: z.string().min(1)
});

export interface Output {
    output: string
    success: boolean
}

export type CodeI = z.infer<typeof Code>;