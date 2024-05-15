export default function currencyFormatter(amount) {
    let IndianRupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0, // Set minimum fraction digits to 0
        maximumFractionDigits: 2, // Set maximum fraction digits to 0
    });
    return IndianRupee.format(amount);
}