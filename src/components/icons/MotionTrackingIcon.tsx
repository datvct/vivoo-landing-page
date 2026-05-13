// components/icons/MotionTrackingIcon.tsx

type Props = {
    className?: string;
};

export default function MotionTrackingIcon({
    className,
}: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            className={className}
        >
            <path
                d="
          M57 42.2V57H42.2
          M42.2 7H57V21.8
          M7 21.8V7H21.8
          M21.8 57H7V42.2

          M25.1 20.8
          C26.4 20.8 27.5 19.7 27.5 18.4
          C27.5 17.1 26.4 16 25.1 16
          C23.8 16 22.7 17.1 22.7 18.4
          C22.7 19.7 23.8 20.8 25.1 20.8

          M18.4 33.6L24.4 30.5L28 24H36L40 33.6

          M23.3 47.9L25.9 39.6L32.3 33.2

          M29 25L33 33L35.5 42.8L41.9 49.2
        "
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            />
        </svg>
    );
}