// hooks/useDebounce.js

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number) {
	// สร้าง state เพื่อเก็บค่าที่ถูกหน่วงเวลา
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// ตั้งค่า timer
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// ล้าง timer เก่าทุกครั้งที่ค่า 'value' เปลี่ยน
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Effect นี้จะทำงานใหม่เมื่อ 'value' หรือ 'delay' เปลี่ยน

	return debouncedValue;
}
