import Button from "../Button/Button";

export default function Header({ text }) {
  return (
    <div className="flex justify-between items-center mb-[32px]">
      <h1 className="font-semibold text-2xl text-neutral-900">{text}</h1>
      <Button>View all</Button>
    </div>
  );
}
