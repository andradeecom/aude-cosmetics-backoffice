import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { SignInForm } from "@/components/SignInForm";
import type { SignInFormSchema } from "@/pages/auth/sign-in/SignInFormSchema";

export default function SignInPage() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: SignInFormSchema) => {
    const { email, password } = values;

    try {
      const success = await signin(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        console.error("Invalid email or password");
      }
    } catch {
      console.error("An error occurred during login");
    } finally {
      console.log("Login attempt completed");
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>Aude Cosmetics</h1>
        <SignInForm onSubmit={handleSubmit} />

        <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
          Demo: Use any email and password to login
        </div>
      </div>
    </div>
  );
}
