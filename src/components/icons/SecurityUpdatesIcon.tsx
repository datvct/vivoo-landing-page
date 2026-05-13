const SecurityUpdatesIcon = ({
    className = "",
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
            {/* ROTATE / REFRESH */}
            <path
                d="M7.9 34.3C8.6 43.6 14.6 52.1 23.9 55.5
           C36.3 60 49.8 53.9 54.8 42
           C55 41.6 55.1 41.3 55.2 40.9"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            <polyline
                points="56.2 49 56.2 41.3 48.5 41.3"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            <path
                d="M56.2 29.7C55.5 20.4 49.5 11.9 40.2 8.5
           C27.9 4 14.3 10.1 9.3 22
           C9.1 22.4 9 22.7 8.9 23.1"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            <polyline
                points="7.8 14.9 7.8 22.6 15.5 22.6"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            {/* LOCK BODY */}
            <rect
                x="22.7"
                y="28.3"
                width="18.7"
                height="13.4"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            {/* LOCK TOP */}
            <path
                d="M26.7 25.2
           C26.7 22.2 29.1 19.9 32 19.9
           C35 19.9 37.4 22.3 37.4 25.2"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
            />

            {/* LOCK SIDE LINES */}
            <line
                x1="26.7"
                y1="24.5"
                x2="26.7"
                y2="28.5"
                stroke="#111111"
                strokeWidth={2}
            />

            <line
                x1="37.4"
                y1="24.5"
                x2="37.4"
                y2="28.5"
                stroke="#111111"
                strokeWidth={2}
            />

            {/* LOCK CENTER */}
            <line
                x1="32.1"
                y1="35"
                x2="32.1"
                y2="39"
                stroke="#111111"
                strokeWidth={2}
            />

            <circle
                cx="32.1"
                cy="33.7"
                r="1.3"
                stroke="#111111"
                strokeWidth={2}
            />
        </svg>
    );
};

export default SecurityUpdatesIcon;