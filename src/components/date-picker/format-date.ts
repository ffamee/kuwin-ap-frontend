import moment from "moment";

const possibleFormats = [
	// Common formats
	"MMM D, YY",
	"MMM D, YYYY",
	"MMM DD, YY",
	"MMM DD, YYYY",
	"MMMM D, YY",
	"MMMM D, YYYY",
	"MMMM DD, YY",
	"MMMM DD, YYYY",
	"D MM YY",
	"D MM YYYY",
	"D MMM YY",
	"D MMM YYYY",
	"D MMMM YY",
	"D MMMM YYYY",
	"DD MM YY",
	"DD MM YYYY",
	"DD MMM YY",
	"DD MMM YYYY",
	"DD MMMM YY",
	"DD MMMM YYYY",
	"MMM D YY",
	"MMM D YYYY",
	"MMM DD YY",
	"MMM DD YYYY",
	"MMMM D YY",
	"MMMM D YYYY",
	"MMMM DD YY",
	"MMMM DD YYYY",
	"D/M/YY",
	"D/M/YYYY",
	"D/MM/YY",
	"D/MM/YYYY",
	"D/MMM/YY",
	"D/MMM/YYYY",
	"D/MMMM/YY",
	"D/MMMM/YYYY",
	"DD/M/YY",
	"DD/M/YYYY",
	"DD/MM/YY",
	"DD/MM/YYYY",
	"DD/MMM/YY",
	"DD/MMM/YYYY",
	"DD/MMMM/YY",
	"DD/MMMM/YYYY",
	"M/D/YY",
	"M/D/YYYY",
	"MM/D/YY",
	"MM/D/YYYY",
	"MMM/D/YY",
	"MMM/D/YYYY",
	"MMMM/D/YY",
	"MMMM/D/YYYY",
	"M/DD/YY",
	"M/DD/YYYY",
	"MM/DD/YY",
	"MM/DD/YYYY",
	"MMM/DD/YY",
	"MMM/DD/YYYY",
	"MMMM/DD/YY",
	"MMMM/DD/YYYY",
];

function formatDate(date: Date | undefined) {
	if (!date) {
		return "";
	}

	const d = moment(date);
	if (!d.isValid()) {
		return "";
	}
	return d.format("MMM D, YYYY");
}

function isValidDate(date: string | undefined) {
	if (!date) {
		return false;
	}
	return moment(date, possibleFormats).isValid();
}

export { possibleFormats, formatDate, isValidDate };
