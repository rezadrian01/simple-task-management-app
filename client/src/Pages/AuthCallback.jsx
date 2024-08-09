import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  });
  return <p>Redirecting...</p>;
}
