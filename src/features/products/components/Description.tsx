import { dataService } from "../../../api/dataService";
import { useState } from "react";

interface DescriptionProps {
  productId: string;
}

function Description({ productId }: DescriptionProps) {
  const productInfo = dataService.getProductInfo(productId);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const renderSection = (title: string, items: string[]) => {
    const isCollapsed = collapsedSections.has(title);

    return (
      <div key={title}>
        <div className="flex flex-wrap justify-between">
          <h3 className="font-medium text-lg text-neutral-900 pb-[8px]">
            {title}
          </h3>
          <button
            onClick={() => toggleSection(title)}
            className="w-6 h-6 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${title} section`}
          >
            {isCollapsed ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 11H17V13H7V11Z" />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${title === "Shipping" ? "" : "border-b border-solid border-neutral-200 pb-[25px] mb-[32px]"} overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"}`}
        >
          <ul className="min-[1440px]:w-[544px] list-disc text-neutral-600 pl-6 min-[375px]:w-[263px] min-[768px]:w-full">
            {items.map((item, index) => (
              <li key={index}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-[40px]">
      {productInfo.map((info) => renderSection(info.title, info.description))}
    </div>
  );
}

export default Description;
