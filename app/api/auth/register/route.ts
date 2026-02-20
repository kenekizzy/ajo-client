import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for registration
const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedFields = registerSchema.safeParse(body);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validatedFields.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { fullName, email, phoneNumber, password } = validatedFields.data;

    // TODO: Implement actual user registration logic
    // In a real application, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Send verification email (optional)
    
    // For now, we'll simulate a successful registration
    // Check if email already exists (mock check)
    if (email === "existing@example.com") {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Mock successful registration
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      phoneNumber,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { 
        message: "User registered successfully", 
        user: newUser 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}