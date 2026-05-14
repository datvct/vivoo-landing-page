import * as React from "react";

type IconProps =
  React.SVGProps<SVGSVGElement>;

export default function ToolsRepairIcon(
  props: IconProps
) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50.1 19.1L44.9 13.9L50.9 7.9C49.6 7.3 48.2 7 46.6 7C40.9 7 36.3 11.6 36.3 17.3C36.3 18.2 36.4 19 36.6 19.8L7.5 46.2L17.8 56.5L44.2 27.4C45 27.6 45.8 27.7 46.7 27.7C52.4 27.7 57 23.1 57 17.4C57 15.8 56.7 14.4 56.1 13.1L50.1 19.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />

      <path
        d="M39.8 41.5L46.7 48.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />

      <path
        d="M28.7 27L21.9 20.2V16.3L14.9 9.4L7.6 16.7L14.6 23.6H18.5L25.2 30.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />

      <path
        d="M40.3 31.7L52.9 44.3C55.8 47.2 55.8 51.8 52.9 54.6C50 57.5 45.4 57.5 42.6 54.6L30.5 42.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
