import React, { useState } from "react";
import { Rating, rem } from "@mantine/core";
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";

const PostRating = ({ title }: { title: string }) => {
  const [value, setValue] = useState(0);

  console.log("Title: " + title + ", Value: ", value);

  const getIconStyle = (color?: string) => ({
    width: rem(32),
    height: rem(32),
    color: color ? `var(--mantine-color-${color}-7)` : undefined,
  });

  const getEmptyIcon = (value: number) => {
    const iconStyle = getIconStyle();

    switch (value) {
      case 1:
        return <IconMoodCry style={iconStyle} />;
      case 2:
        return <IconMoodSad style={iconStyle} />;
      case 3:
        return <IconMoodSmile style={iconStyle} />;
      case 4:
        return <IconMoodHappy style={iconStyle} />;
      case 5:
        return <IconMoodCrazyHappy style={iconStyle} />;
      default:
        return null;
    }
  };

  const getFullIcon = (value: number) => {
    switch (value) {
      case 1:
        return <IconMoodCry style={getIconStyle("red")} />;
      case 2:
        return <IconMoodSad style={getIconStyle("orange")} />;
      case 3:
        return <IconMoodSmile style={getIconStyle("yellow")} />;
      case 4:
        return <IconMoodHappy style={getIconStyle("lime")} />;
      case 5:
        return <IconMoodCrazyHappy style={getIconStyle("green")} />;
      default:
        return null;
    }
  };

  const valueRating = (value: number) => {
    switch (value) {
      case 1:
        return <p className="font-bold text-sm text-red-500">You rated Poor</p>;
      case 2:
        return <p className="font-bold text-sm text-red-400">You rated Okay</p>;
      case 3:
        return (
          <p className="font-bold text-sm text-orange-400">You rated Good</p>
        );
      case 4:
        return (
          <p className="font-bold text-sm text-green-500">
            You rated Very Good
          </p>
        );
      case 5:
        return (
          <p className="font-bold text-sm text-green-600">
            You rated Excellent
          </p>
        );
      default:
        return null;
    }
  };
  return (
    <section className="border-0 border-b-[1px] px-5 py-2.5 flex justify-between items-center">
      <div className="mb-1.5">
        <p className="font-semibold -mb-1">{title}</p>
        {valueRating(value)}
      </div>
      <Rating
        emptySymbol={getEmptyIcon}
        fullSymbol={getFullIcon}
        highlightSelectedOnly
        onChange={setValue}
      />
    </section>
  );
};

export default PostRating;
