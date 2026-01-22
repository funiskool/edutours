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
  // GET USER ROLE
  // ===============================
  const getUserRole = async (userId) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data.role;
  };

  // ===============================
  // SYNC USER PROFILE
  // ===============================
  const syncUserProfile = async (user) => {
    const { error } = await supabase.from("user_profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
      phone: user.user_metadata?.phone || "",
    });

    if (error) throw error;
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

    try {
      await syncUserProfile(data.user);
    } catch (syncError) {
      console.error("Profile sync error:", syncError);
      // Continue anyway - profile might already exist
    }

    // Get user name from database
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from("user_profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;
      console.log("User Name:", userProfile.full_name);
    } catch (nameError) {
      console.error("Error fetching user name:", nameError);
    }

    try {
      const role = await getUserRole(data.user.id);
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (roleError) {
      console.error("Get role error:", roleError);
      // Default to user if role lookup fails
      navigate("/user-dashboard");
    }
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

    setSuccess("Signup successful! Please verify your email.");
  };

  // ===============================
  // FORM SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginUser();
      } else {
        await signupUser();
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
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
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <AnimatePresence mode="wait">
        <motion.form
          key={mode}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mode === "signup" && (
            <>
              <Input name="name" label="Full Name" onChange={handleChange} />
              <Input name="phone" label="Phone" onChange={handleChange} />
            </>
          )}

          <Input
            name="email"
            label="Email"
            type="email"
            required
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            required
            onChange={handleChange}
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </motion.form>
      </AnimatePresence>

      <div className="my-6 text-center text-sm">OR</div>

      <Button variant="outline" fullWidth onClick={handleGoogleLogin}>
        <Icon name="Mail" size={18} className="mr-2" />
        Continue with Google
      </Button>

      <p className="text-center text-sm mt-6">
        {mode === "login" ? "No account?" : "Already have one?"}
        <button
          className="ml-2 text-primary font-medium"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
