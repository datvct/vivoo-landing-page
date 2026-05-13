const NotificationSecurityIcon = ({
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
                d="M50.4 13.9C54 13.9 57 16.9 57 20.6V43.3C57 47 54.1 50 50.4 50H13.6C10 50 7 47 7 43.3V20.6C7 16.9 9.9 13.9 13.6 13.9H50.4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M34.7 42.7C34.7 44.2 33.5 45.4 32 45.4C30.5 45.4 29.3 44.2 29.3 42.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />

            <path
                d="M43.1 41C43.1 41 40 37 40 33.3V27C40 22.5 36.4 18.9 32 18.9C27.6 18.9 24 22.5 24 27V33.3C24 36.9 20.9 41 20.9 41H43.1Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeMiterlimit="10"
            />
        </svg>
    );
};

export default NotificationSecurityIcon;