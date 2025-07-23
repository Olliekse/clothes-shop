import { useState } from "react";
import Button from "../../../../components/Button";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email address is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    alert("You are now signed up!");
    setEmail("");
  };

  return (
    <div className="bg-white px-4 pt-12 md:pt-16 xl:px-[96px] xl:pt-[96px] xl:flex xl:justify-between">
      <div>
        <h3 className="font-semibold text-xl text-neutral-900 pb-2">
          Join our newsletter
        </h3>
        <p className="text-neutral-600 pb-8 md:pb-5 xl:pb-0">
          We’ll send you a nice letter once per week. No spam.
        </p>
      </div>

      <form
        className="flex flex-col md:gap-4 md:flex-row justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full md:flex-row md:items-start min-[425px]:gap-4">
          <div className="flex flex-col w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded bg-neutral-50 border border-solid border-neutral-200 px-4 xl:w-[270px] h-[40px]"
              placeholder="Enter your email"
              required
            />
            <span
              className={`text-red-600 text-sm block ${
                error ? "mt-[6px] h-[20px]" : "newsletter-mobile-gap-none"
              } md:min-h-[20px] md:mt-0`}
              aria-live="polite"
            >
              {error}
            </span>
          </div>
          <div
            className={`w-full md:w-auto md:mt-0 md:ml-4 ${
              error ? "newsletter-mobile-gap" : "newsletter-mobile-gap-16"
            }`}
          >
            <Button onClick={() => {}} type="Subscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
