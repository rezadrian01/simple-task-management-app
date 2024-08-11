export default function Auth() {
  async function handleEmailClick() {
    window.location.href = `${import.meta.env.VITE_DOMAIN_API}/auth/google`;
  }
  return (
    <>
      <div className="bg-emerald-600/50 min-h-[50vh]   mx-auto rounded-lg shadow-lg p-6 flex flex-col gap-4 items-center">
        <div className="border-b-2 border-b-emerald-600 ">
          <h3 className="font-medium text-xl lg:text-3xl tracking-wide">
            Login with one click
          </h3>
        </div>
        <button
          className="border-2 border-green-600 px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-emerald-700 hover:-translate-y-1 transition-transform"
          onClick={handleEmailClick}
        >
          Login with Email
        </button>
        <div>
          <p className="text-sm lg:text-base">Or</p>
        </div>
        <button
          disabled
          className="border-2 disabled:hover:bg-transparent disabled:hover:-translate-y-0 disabled:text-slate-400  border-green-600 px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-emerald-700 hover:-translate-y-1 transition-transform"
        >
          Login with Facebook
        </button>
      </div>
    </>
  );
}
