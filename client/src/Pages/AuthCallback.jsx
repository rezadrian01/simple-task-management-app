import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { authAction } from "../store";

export default function AuthCallback() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      dispatch(authAction.login());
      navigate("/");
    }
  });
  return <p>Redirecting...</p>;
}
