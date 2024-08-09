import { redirect, useNavigate, useSubmit } from "react-router-dom";

export default function Auth() {
  const submit = useSubmit();
  const navigate = useNavigate();
  async function handleEmailClick() {
    // const response = await fetch(
    //   `${import.meta.env.VITE_DOMAIN_API}/auth/google`
    // );
    // const resData = await response.json();
    // console.log(resData);
    window.location.href = `${import.meta.env.VITE_DOMAIN_API}/auth/google`;
  }
  return (
    <>
      <h1>Authentication</h1>
      <div className="bg-sky-500 min-h-[50vh] text-slate-200">
        <button onClick={handleEmailClick}>Login with email</button>
      </div>
    </>
  );
}
