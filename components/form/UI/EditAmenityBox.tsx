import { FC, useRef, useState } from "react";

type CheckboxOptions = {
  name: string;
  description: string;
  checked: boolean;
};

type AmenitiesBoxProps = {
  editAmenities: CheckboxOptions[];
  amenitiesChecked: (amenities: CheckboxOptions[]) => void;
};

const EditAmenitiesBox: FC<AmenitiesBoxProps> = (props) => {
  const checkboxOptions: CheckboxOptions[] = [
    {
      name: "Free Wifi",
      description: "Who doesn't want free wifi?",
      checked: false,
    },
    {
      name: "With Parking",
      description: "Parking is available.",
      checked: false,
    },
  ];

  const amenitiesRef = useRef<CheckboxOptions[]>(
    props.editAmenities
      ? props.editAmenities
      : checkboxOptions.map((option) => ({ ...option, checked: false }))
  );

  const [isChecked, setIsChecked] = useState<boolean[]>(() => {
    return props.editAmenities
      ? props.editAmenities.map((amenity) => amenity.checked)
      : Array(checkboxOptions.length).fill(false);
  });

  // Function to handle checkbox change
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event.target.checked;
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = checked;
      return newState;
    });

    amenitiesRef.current[index].checked = checked;

    props.amenitiesChecked(amenitiesRef.current);
  };

  return (
    <>
      {checkboxOptions.map((option, index) => (
        <div
          key={index}
          className={`relative flex p-2 border-2 rounded-lg h-full w-full cursor-pointer ${
            isChecked[index]
              ? "border-violet-400"
              : "border-gray-200 hover:border-indigo-200 duration-300"
          }`}
        >
          <div className={`${isChecked[index] ? "" : ""}`}>
            <input
              id={`checkbox-${index}`}
              name={option.name}
              type="checkbox"
              checked={isChecked[index]}
              onChange={(e) => handleCheckboxChange(e, index)}
              className="hidden"
            />
          </div>
          <div className="text-sm leading-6">
            <label
              htmlFor={`checkbox-${index}`}
              className={`font-medium text-violet-400 duration-300 cursor-pointer ${
                isChecked[index] ? "text-violet-800" : ""
              }`}
            >
              {option.name}{" "}
              <p
                className={`text-gray-500 duration-200 text-sm cursor-pointer ${
                  isChecked[index] ? "opacity-1" : "opacity-0"
                }`}
              >
                {option.description}
              </p>
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default EditAmenitiesBox;
