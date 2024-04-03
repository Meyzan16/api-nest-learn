import { z, ZodType } from "zod";

export const UserValidation = z.object({
        username: z.number().int(),
        password : z.string().min(1).max(100),
        name : z.string().min(1).max(100),
});