import { useEffect, useRef } from "react";

export default function useOutsideClick(cb: () => void) {
	const ref = useRef();

	useEffect(() => {
		const handleClick = event => {
			cb();
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return ref;
}
