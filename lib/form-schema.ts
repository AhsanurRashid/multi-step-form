import * as z from "zod"

// Define the form schema for all steps
export const formSchema = z
  .object({
    // Personal Info
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),

    // Address
    street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
    city: z.string().min(2, { message: "City must be at least 2 characters" }),
    state: z.string().min(2, { message: "State must be at least 2 characters" }),
    zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters" }),

    // Account
    username: z.string().min(4, { message: "Username must be at least 4 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Define the type based on the schema
export type FormValues = z.infer<typeof formSchema>