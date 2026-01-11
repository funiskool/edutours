import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";
import { supabase } from "../../../lib/supabase";

const AuthForm = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===============================
  // LOGIN
  // ===============================
  const loginUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) throw error;

  await syncUserProfile(data.user);
};


  const syncUserProfile = async (user) => {
  const { error } = await supabase
    .from("user_profiles")
    .upsert({
      id: user.id,
      full_name: user.user_metadata.full_name,
      email: user.email,
      phone: user.user_metadata.phone,
    });

  if (error) throw error;
};

  // ===============================
  // SIGNUP
  // ===============================
  const signupUser = async () => {
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
        phone: formData.phone,
      },
    },
  });

  if (error) throw error;
};


  // ===============================
  // FORM SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginUser();
        navigate("/user-dashboard");
      } else {
        await signupUser();
        setSuccess(
          "Signup successful! Please check your email to confirm your account."
        );
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE LOGIN
  // ===============================
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/user-dashboard`,
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {mode === "login" ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "login"
            ? "Sign in to continue"
            : "Join Funiskool and start your journey"}
        </p>
      </div>

      {/* Error / Success */}
      {error && (
        <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
      )}
      {success && (
        <p className="mb-4 text-sm text-green-600 text-center">{success}</p>
      )}

      {/* Animated Form */}
      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mode === "signup" && (
            <>
              <Input
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </Button>
        </motion.form>
      </AnimatePresence>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs text-muted-foreground">OR</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Google Login */}
      <Button variant="outline" fullWidth onClick={handleGoogleLogin}>
        <Icon name="Mail" size={18} className="mr-2" />
        Continue with Google
      </Button>

      {/* Switch */}
      <p className="text-center text-sm mt-6">
        {mode === "login"
          ? "Don’t have an account?"
          : "Already have an account?"}
        <button
          type="button"
          className="ml-2 text-primary font-medium hover:underline"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
