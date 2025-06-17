import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function Sidebar() {
	const { steps, executionTime } = useStore(useShallow(selector => ({ steps: selector.steps, executionTime: selector.executionTime })));

	return (
		<aside className="bg-card p-4 min-w-64 flex flex-col border-e">
			<p>Solved in {Math.max(0, steps.length - 2)} steps</p>
			<p>Executed in {executionTime.toFixed(2)}ms</p>
			<a href="https://github.com/MohamadTaky" target="_blank" className="mt-auto me-auto transition-colors hover:text-blue-500 font-semibold">
				Mohamad Taky
			</a>
			<div className="w-36 bg-accent h-2 rounded-e-md relative -start-4"></div>
		</aside>
	);
}
