"use client";
import Image from "next/image";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomImgProps {
	src: string;
	onClose: () => void;
}

export default function ZoomImgModal({ src, onClose }: ZoomImgProps) {
	const [isDragging, setIsDragging] = React.useState(false);
	const handleClickOutside = () => {
		if (isDragging) {
			return;
		}
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={handleClickOutside}
		>
			<div
				className="relative max-w-[90dvw] max-h-[90dvh]"
				onClick={(e) => e.stopPropagation()}
			>
				<TransformWrapper
					initialScale={1}
					minScale={1}
					maxScale={5}
					wheel={{ step: 0.4 }}
					pinch={{ disabled: false }}
					doubleClick={{
						mode: "toggle", // ซูมเข้าเมื่อดับเบิ้ลคลิก
						step: 1.2, // ระดับซูม
						animationTime: 200,
					}}
					limitToBounds={true} // อนุญาตลากพ้นขอบได้
					onPanningStart={() => setIsDragging(true)}
					onPanningStop={() => {
						setTimeout(() => setIsDragging(false), 50);
					}} // ป้องกันการคลิกผิดพลาด
				>
					<TransformComponent>
						<Image
							src={src}
							alt="Zoomable"
							className="max-w-full max-h-full cursor-grab active:cursor-grabbing"
							width={800}
							height={800}
						/>
					</TransformComponent>
				</TransformWrapper>
			</div>
		</div>
	);
}
