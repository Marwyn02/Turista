import React, { useState } from "react";
import { Rating, rem } from "@mantine/core";
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";

const PostRating = () => {
  const [value, setValue] = useState(0);

  //   console.log("Value: ", value);

  const getIconStyle = (color?: string) => ({
    width: rem(24),
    height: rem(24),
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
  return (
    <section>
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
