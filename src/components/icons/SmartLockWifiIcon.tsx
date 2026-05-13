const SmartLockWifiIcon = ({
    className,
}: {
    className?: string;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            className={className}
        >
            <path
                d="M21.9 47V50.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M36.8 15.3C42.3 15.3 46.7 19.8 46.7 25.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M36.8 7C46.8 7 55 15.2 55 25.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <circle
                cx="21.9"
                cy="43.7"
                r="3.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M13.6 33.7V22.8C13.6 18.2 17.3 14.5 21.9 14.5C26.5 14.5 30.2 18.2 30.2 22.8V33.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <rect
                x="7"
                y="33.7"
                width="29.8"
                height="23.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default SmartLockWifiIcon;