const ShieldSecurityIcon = ({
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
                d="M32 7C32 7 23.7 10 7 15.9C7 32.6 15.3 49.9 32 57C48.7 49.9 57 32.6 57 15.9C40.3 10 32 7 32 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeMiterlimit="10"
            />

            <path
                d="M30.2 30.5C28.8 29.8 27.9 28.4 27.9 26.8C27.9 24.5 29.8 22.6 32.1 22.6C34.4 22.6 36.3 24.5 36.3 26.8C36.3 28.4 35.4 29.9 34 30.5L35.8 37.2H28.5L30.2 30.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default ShieldSecurityIcon;