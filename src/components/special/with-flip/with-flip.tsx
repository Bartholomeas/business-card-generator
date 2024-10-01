"use client";

import React, {
	type ComponentType,
	type PropsWithoutRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

import { motion, useSpring } from "framer-motion";

import { useFlipState } from "./hooks/use-flip-state";
import { useHandleMouseMove } from "./hooks/use-handle-mouse-move";
import {
	type ConfigOptions,
	type FlipComponentRefProps,
	type WithFlipProps,
} from "./with-flip.types";

import { cn } from "~/utils";

const spring = {
	type: "spring",
	stiffness: 300,
	damping: 40,
};

export function withFlip<T extends WithFlipProps = WithFlipProps>(
	Component: ComponentType<T>,
	{ buttonHandle = false, scaleOnHover = false, withRotation = false }: ConfigOptions,
) {
	const FlippableWrapper = React.forwardRef<FlipComponentRefProps, PropsWithoutRef<T>>(
		(props, ref) => {
			const parentRef = useRef<HTMLDivElement>(null);

			const { isFlipped, handleFlip: _handleFlip } = useFlipState();
			const { rotateXaxis, rotateYaxis, handleMouseMove, handleMouseEnd } =
				useHandleMouseMove(parentRef);

			const handleFlip = () => {
				if (!buttonHandle) return;
				_handleFlip();
			};

			const dx = useSpring(0, spring);
			const dy = useSpring(0, spring);

			useEffect(() => {
				dx.set(-rotateXaxis);
				dy.set(rotateYaxis);
			}, [rotateXaxis, rotateYaxis]);

			useImperativeHandle(ref, () => ({ handleFlip, parentRef }));

			return (
				<motion.div
					onClick={buttonHandle ? undefined : handleFlip}
					transition={spring}
					className="size-full"
					style={{
						perspective: "1200px",
						transformStyle: "preserve-3d",
						...props.style,
					}}
				>
					<motion.div
						ref={parentRef}
						whileHover={{ scale: scaleOnHover ? 1.1 : 1 }}
						onMouseMove={withRotation ? handleMouseMove : undefined}
						onMouseLeave={handleMouseEnd}
						transition={spring}
						style={{
							width: "100%",
							height: "100%",
							rotateX: dx,
							rotateY: dy,
						}}
						data-testid="scaling-parent"
					>
						<div
							style={{
								perspective: "1200px",
								transformStyle: "preserve-3d",
								width: "100%",
								height: "100%",
							}}
						>
							<motion.div
								animate={{ rotateY: isFlipped ? -180 : 0 }}
								transition={spring}
								className={cn("backface-hidden absolute z-0 h-full w-full", {
									"z-1": !isFlipped,
								})}
								data-testid="front"
							>
								<Component {...(props as T)} variant="front" className={props.className} />
							</motion.div>
							<motion.div
								initial={{ rotateY: 180 }}
								animate={{ rotateY: isFlipped ? 0 : 180 }}
								transition={spring}
								className={cn("backface-hidden absolute z-0 h-full w-full", {
									"z-1": isFlipped,
								})}
								data-testid="back"
							>
								<Component {...(props as T)} variant="back" className={props.className} />
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			);
		},
	);
	FlippableWrapper.displayName = "FlippableWrapper";

	return FlippableWrapper;
}
