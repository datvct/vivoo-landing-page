const RadarIcon = ({
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
            <path
                d="M37.5 18.7L56.4 37.6
           M45.3 26.5V53.2
           M45.3 37.5L26.5 56.4
           M37.5 45.3H10.8
           M26.5 45.3L7.6 26.5
           M18.7 37.5V10.8
           M18.7 26.5L37.5 7.6
           M26.5 18.7H53.2
           M32 57C45.8 57 57 45.8 57 32
           C57 18.2 45.8 7 32 7
           C18.2 7 7 18.2 7 32
           C7 45.8 18.2 57 32 57Z"
                stroke="#111111"
                strokeWidth={2}
                strokeMiterlimit={10}
                fill="none"
            />
        </svg>
    );
};

export default RadarIcon;