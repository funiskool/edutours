import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return navigate("/login");

      await supabase.from("user_profiles").upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || "",
      });

      const { data } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      navigate(
        data.role === "admin"
          ? "/admin-dashboard"
          : "/user-dashboard"
      );
    };

    handleAuth();
  }, [navigate]);

  return <p className="text-center mt-10">Signing you in...</p>;
};

export default AuthCallback;
