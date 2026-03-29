import { RotatingLines } from "react-spinners";
export const LoadingSpinner = ({ size = 30, color = '#3b82f6' }) => {
    return (
        <div>
            <RotatingLines
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                width={size}
                visible={true}
            />
        </div>
    )
}