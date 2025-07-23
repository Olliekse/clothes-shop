import Button from "../../../../components/Button";

function Newsletter() {
  return (
    <div className="bg-white px-4 pt-12 md:pt-16 xl:px-[96px] xl:flex xl:justify-between">
      <div>
        <h3 className="font-semibold text-xl text-neutral-900 pb-2">
          Join our newsletter
        </h3>
        <p className="text-neutral-600 pb-8 md:pb-5 xl:pb-0">
          We’ll send you a nice letter once per week. No spam.
        </p>
      </div>
      <div className="flex flex-col md:gap-4 md:flex-row">
        <input
          className="rounded w-full bg-neutral-50 border border-solid border-neutral-200 px-4 py-2 xl:w-[270px] xl:mb-[24px]"
          type="text"
          placeholder="Enter your email"
        />
        <Button onClick={() => {}} type="Subscribe">
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default Newsletter;
