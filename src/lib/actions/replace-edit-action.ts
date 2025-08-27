// "use server";
import { ReplaceActionState } from "@/types/replace-type";
import fetcher from "../fetcher";
// import { revalidatePath } from "next/cache";

export default async function ReplaceEditAction(
	// file: File | null,
	// id: number | null,
	_prev: ReplaceActionState,
	formData: FormData
) {
	const id = formData.get("id");
	const eol = formData.get("eol");
	const eos = formData.get("eos");
	// const pic = formData.get("pic");
	const currState: ReplaceActionState = { errors: {}, message: "" };
	// Process the form data as needed, e.g., save to a database
	if (!!!id) currState.errors.id = true;
	// console.log("Group:", group);
	if (!!!eol) currState.errors.eol = true;
	// console.log("EOL:", eol);
	if (!!!eos) currState.errors.eos = true;
	// console.log("EOS:", eos);
	// console.log("pic:", pic);
	// console.log("file:", file);
	// if (file) formData.set("pic", file);
	// else console.log("No file uploaded");
	// const g2 = formData.get("group");
	// const eol2 = formData.get("eol");
	// const eos2 = formData.get("eos");
	// const pic2 = formData.get("pic");
	// if ((pic2 as File).size === 0) console.log("No file uploaded");
	// console.log({ g2, eol2, eos2, pic2 });
	if (currState.errors.id || currState.errors.eol || currState.errors.eos) {
		currState.message = "Please fill in all required fields.";
		return currState;
	}
	// await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
	const res = await fetcher("/lifecycles", {
		method: "POST",
		body: formData,
		credentials: "include",
	});
	if (res.ok) {
		const data = await res.json();
		return {
			...currState,
			payload: data,
			message: "Form submitted successfully.",
			success: true,
		};
	} else {
		const errorData = await res.json();
		return {
			...currState,
			message: errorData.message || "Failed to submit form.",
			success: false,
		};
	}
}
