import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { getKeyFromCoords } from "@/lib/getKeyFromCoords";
import useStore from "@/store/store";
import { ChevronRightIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function StepControls() {
	const { setGrid, steps, currentStep, setCurrentStep } = useStore(
		useShallow(selector => ({
			size: selector.size,
			setSize: selector.setSize,
			selecteCellType: selector.selectedCellType,
			setSelectedCellType: selector.setSelectedCellType,
			grid: selector.grid,
			setGrid: selector.setGrid,
			steps: selector.steps,
			setSteps: selector.setSteps,
			currentStep: selector.currentStep,
			setCurrentStep: selector.setCurrentStep,
		}))
	);
	const handleStepForward = () => {
		setCurrentStep(currentStep => {
			const step = steps[currentStep];
			console.log(step);
			setGrid(grid => grid.map(row => row.map(cell => step.get(getKeyFromCoords(cell.x, cell.y)) ?? cell)));
			return currentStep + 1;
		});
	};
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button size="sm" variant="ghost" onClick={handleStepForward} disabled={currentStep === steps.length}>
					<ChevronRightIcon />
				</Button>
			</TooltipTrigger>
			<TooltipContent>step forward</TooltipContent>
		</Tooltip>
	);
}
