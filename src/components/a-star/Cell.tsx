import { cn } from "@/lib/utils";
import type { AStarCell } from "@/types/aStar";
import { memo, type HTMLAttributes } from "react";

type CellProps = HTMLAttributes<HTMLDivElement> & { cell: AStarCell };

const Cell = memo(({ cell, className, ...props }: CellProps) => {
	return (
		<div
			className={cn(
				"border-e border-t absolute top-0 start-0 border-black hover:opacity-80 transition-opacity cursor-pointer text-black bg-slate-50",
				cell.type === "obsticle"
					? "bg-slate-700"
					: cell.type === "source"
					? "bg-emerald-400"
					: cell.type === "destination"
					? "bg-rose-400"
					: cell.uiType === "path"
					? "bg-amber-300"
					: cell.uiType === "open"
					? "bg-sky-300"
					: cell.uiType === "closed"
					? "bg-red-500"
					: "",
				className
			)}
			{...props}>
			{cell.type !== "obsticle" && cell.type !== "source" && cell.type !== "destination" ? (
				<>
					{cell.uiType ? (
						<>
							<span className="text-[8px] absolute top-0.5 start-0.5">{cell.g}</span>
							<span className="text-[8px] absolute top-0.5 end-0.5">{cell.h}</span>
							<span className="text-[8px] absolute start-0.5 bottom-0">{cell.f}</span>
						</>
					) : null}
				</>
			) : null}
		</div>
	);
});

export default Cell;
