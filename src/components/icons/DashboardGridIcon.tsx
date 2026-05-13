const DashboardGridIcon = ({
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
                d="M16.4 57C21.6 55.6 26.8 54.9 32 54.9C37.2 54.9 42.4 55.6 47.6 57"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <path
                d="M32 55V49.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <path
                d="M7 42.4H57"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <rect
                x="7"
                y="11"
                width="50"
                height="38.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <rect
                x="12.8"
                y="17.3"
                width="10.4"
                height="8.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <rect
                x="26.7"
                y="17.3"
                width="10.4"
                height="8.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <rect
                x="40.8"
                y="17.3"
                width="10.4"
                height="8.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <line
                x1="12"
                y1="31.4"
                x2="51.8"
                y2="31.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />

            <line
                x1="12"
                y1="35.9"
                x2="51.8"
                y2="35.9"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default DashboardGridIcon;