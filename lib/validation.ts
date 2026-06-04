import { z } from "zod";
export const registrationSchema = z.object({ name:z.string().min(2,"Name is required"), email:z.string().email("Valid email is required"), phone:z.string().min(7,"Phone number is required"), age:z.string().min(1,"Age is required"), message:z.string().min(10,"Tell us why you want to join") });
export const contactSchema = z.object({ name:z.string().min(2,"Name is required"), email:z.string().email("Valid email is required"), message:z.string().min(10,"Message is too short") });
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
