import Image from "next/image";
import * as React from "react";
import { CircleX } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ZoomImgModal from "../zoom-image/zoom-modal";

const DragAndDrop = () => {
	const [isDragging, setIsDragging] = React.useState(false);
	const [file, setFile] = React.useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
	const [openPreview, setOpenPreview] = React.useState(false);

	const fileInputRef = React.useRef<HTMLInputElement | null>(null);

	const isMobile = useIsMobile();

	React.useEffect(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
		} else {
			setPreviewUrl(null);
		}
	}, [file]);

	// สร้างฟังก์ชันสำหรับจัดการ Event
	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			if (!e.dataTransfer.files[0].type.startsWith("image/")) {
				console.log("Please upload an image file.");
			}
			setFile(e.dataTransfer.files[0]);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	// ฟังก์ชันอัปโหลด (ตัวอย่าง)
	const handleUpload = () => {
		if (!file) return;
		console.log(file);
		const formData = new FormData();
		formData.append("file", file);
		console.log(formData.get("file"));

		// // ตัวอย่างการใช้ XMLHttpRequest เพื่อแสดง progress
		// const xhr = new XMLHttpRequest();
		// xhr.open("POST", "/api/upload");

		// xhr.upload.addEventListener("progress", (event) => {
		// 	if (event.lengthComputable) {
		// 		const percent = Math.round((event.loaded * 100) / event.total);
		// 		setUploadProgress(percent);
		// 	}
		// });

		// xhr.onload = () => {
		// 	if (xhr.status === 200) {
		// 		console.log("Upload successful");
		// 		setUploadProgress(100);
		// 	} else {
		// 		console.error("Upload failed");
		// 	}
		// };

		// xhr.send(formData);
	};

	return (
		<div
			className={`border-dashed border-2 rounded-md p-8 text-center transition-all ${
				isDragging
					? "border-accent-foreground border-4 bg-gray-100"
					: "border-gray-300 bg-white"
			}`}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className="flex flex-col items-center text-gray-500">
				{!file && (
					<div className=" border-gray-800 rounded-md p-4">
						<div className="mt-4">
							Drag and drop an image file here, or
							<div
								className={`text-blue-500 cursor-pointer underline ml-1 ${
									!fileInputRef.current ? "opacity-50 cursor-not-allowed" : ""
								}`}
								onClick={() => {
									if (fileInputRef.current) fileInputRef.current.click();
								}}
							>
								choose a file
							</div>
						</div>
					</div>
				)}
				<input
					type="file"
					hidden
					ref={fileInputRef}
					accept="image/*"
					onChange={handleFileSelect}
				/>
			</div>

			{file && (
				<div className="mt-4 flex flex-col items-center-safe space-y-4">
					<p className="text-sm text-gray-700">{file.name}</p>
					{previewUrl && (
						<div className="relative group">
							<CircleX
								onClick={() => setFile(null)}
								className="opacity-0 absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10 bg-red-500 size-4 rounded-full text-white group-hover:opacity-100"
							/>
							<Image
								draggable={false}
								src={previewUrl}
								alt="Preview"
								className={`w-auto h-auto cursor-pointer
								${
									isMobile
										? "object-contain max-w-full max-h-full "
										: "object-cover max-w-14 max-h-14"
								}
									group-hover:border-2 border-accent-foreground`}
								width={200}
								height={200}
								onClick={() => setOpenPreview(true && !isMobile)}
							/>
						</div>
					)}
				</div>
			)}
			{/* modal for preview image and display in the middle of screen*/}
			{openPreview && previewUrl && !isMobile && (
				<ZoomImgModal src={previewUrl} onClose={() => setOpenPreview(false)} />
			)}
		</div>
	);
};

export default DragAndDrop;
