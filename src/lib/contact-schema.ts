import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(80),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "A little more detail, please (10+ characters).")
    .max(2000, "That's a bit long — keep it under 2000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
