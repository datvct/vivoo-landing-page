import * as React from "react";

type IconProps =
  React.SVGProps<SVGSVGElement>;

export default function AlertFolderIcon(
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
        d="M32 46V46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
      />

      <path
        d="M32 47C32.5 47 32.8 46.6 32.8 46.2C32.8 45.7 32.5 45.4 32 45.4C31.5 45.4 31.2 45.7 31.2 46.2C31.2 46.6 31.5 47 32 47Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
      />

      <path
        d="M32 27.8V39.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
      />

      <path
        d="M53.7 57H10.3C8.5 57 7 55.5 7 53.7V12H25.3L30.3 18.7H57V53.7C57 55.5 55.5 57 53.7 57Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
