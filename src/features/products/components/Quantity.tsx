import { useState } from "react";

function Quantity() {
  const [count, setCount] = useState(1);

  function handleDecrement(): void {
    if (count > 1) setCount(count - 1);
  }

  function handleIncrement(): void {
    setCount(count + 1);
  }

  return (
    <div className="py-[32px]">
      <p className="pb-[16px] text-sm text-neutral-500">Quantity</p>
      <div className="h-[36px] px-[11px] justify-between w-[125px] flex items-center gap-3 bg-neutral-50 p-0.5 rounded-md border border-solid border-neutral-200">
        <button onClick={handleDecrement}>–</button>
        <span>{count}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
}

export default Quantity;
