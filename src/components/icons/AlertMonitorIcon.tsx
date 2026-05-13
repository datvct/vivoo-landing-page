const AlertMonitorIcon = ({
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
                d="M32 15.3V35.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M32 47.8C33.4 47.8 34.5 46.7 34.5 45.3C34.5 43.9 33.4 42.8 32 42.8C30.6 42.8 29.5 43.9 29.5 45.3C29.5 46.7 30.6 47.8 32 47.8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <rect
                x="7"
                y="7"
                width="50"
                height="50"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default AlertMonitorIcon;