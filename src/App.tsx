import Grid from "@/components/a-star/Grid";
import OptionsToolbar from "@/components/a-star/OptionsToolbar";
import Sidebar from "@/components/Sidebar";
import useStore from "@/store/store";
import { useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useShallow } from "zustand/react/shallow";

function App() {
	const { editing, setEditing } = useStore(useShallow(selector => ({ editing: selector.editing, setEditing: selector.setEditing })));
	useEffect(() => {
		const cb = (e: KeyboardEvent) => {
			setEditing(e.ctrlKey);
		};
		window.addEventListener("keydown", cb);
		window.addEventListener("keyup", cb);
		return () => {
			window.removeEventListener("keydown", cb);
			window.removeEventListener("keyup", cb);
		};
	}, [setEditing]);
	return (
		<div className="grid grid-cols-[auto_1fr] min-h-screen">
			<Sidebar />
			<div className="mx-auto flex flex-col py-4 gap-4">
				<OptionsToolbar />
				<TransformWrapper smooth minScale={0.1} centerOnInit disabled={editing}>
					<TransformComponent wrapperClass="!w-full my-auto aspect-square flex-1 !h-96 rounded-sm aspect-square">
						<Grid />
					</TransformComponent>
				</TransformWrapper>
			</div>
		</div>
	);
}

export default App;
