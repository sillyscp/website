import { z } from 'zod';

export const applySchema = z.object({
    tag: z.string().min(2, "Discord tags are at least 2 characters in length").max(32, "Discord names are less than 32 characters in length"),
    id: z.string().min(17, "Please enter a valid Discord ID").max(19, "Please enter a valid Discord ID"),
    age: z.number().int().min(16, "You must be at least 16 to apply, please do not lie just to apply").max(99, "No way you're above 100."),
    q1: z.string().min(10),
    q2: z.string().min(10),
    q3: z.string().min(10),
    q4: z.string().min(10),
    q5: z.string().min(10),
    q6: z.string().min(10),
    q7: z.string().min(10),
    q8: z.string().min(10),
})

export type ApplySchema = typeof applySchema;