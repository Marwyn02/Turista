import React from "react";

const Dropdown = () => {
  return (
    <>
      <div
        ref={dropdownRef}
        className="absolute right-1 lg:right-20 bg-white rounded border w-32 z-[9999]"
      >
        {activeSession ? (
          <ul className="text-sm text-slate-700">
            <Link href={`/edit/${props.id}`}>
              <li className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300">
                <img
                  src="/pen.svg"
                  height={18}
                  width={18}
                  alt="lel"
                  className="mr-1.5"
                />
                Edit
              </li>
            </Link>
            <li
              onClick={deleteHandler}
              className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300"
            >
              <img
                src="/trash.svg"
                height={18}
                width={18}
                alt="lel"
                className="mr-1.5"
              />{" "}
              Delete
            </li>
          </ul>
        ) : (
          <ul className="text-sm text-slate-700">
            <li className="hover:bg-gray-200 hover:text-black py-1.5 pl-4">
              Save
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
