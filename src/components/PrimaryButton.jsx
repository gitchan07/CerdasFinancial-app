import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const PrimaryButton = forwardRef((props, ref) => {
    const classNames = twMerge(
        "rounded bg-blue-600 px-4 py-2 text-gray-50 font-medium transition-colors duration-200 hover:bg-blue-900 hover:text-white",
        props.className
    );

    if (props.as === "link") {
        return <Link ref={ref} {...props} className={classNames} />;
    } else {
        return (
            <button
                ref={ref}
                {...props}
                type={props.type || "button"}
                className={classNames}
            />
        );
    }
});

export default PrimaryButton;
