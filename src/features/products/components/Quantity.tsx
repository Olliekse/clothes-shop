function Quantity() {
  return (
    <div className="py-[32px]">
      <p className="pb-[16px] text-sm text-neutral-500">Quantity</p>
      <button className="px-[8px] justify-between w-[125px] flex items-center gap-3 bg-neutral-50 p-0.5 rounded-md border border-solid border-neutral-200">
        <span>-</span>
        <span>1</span>
        <span>+</span>
      </button>
    </div>
  );
}

export default Quantity;
