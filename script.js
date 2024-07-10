document.getElementById('emiForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenureYears = parseInt(document.getElementById('loanTenureYears').value);
    const loanTenureMonths = parseInt(document.getElementById('loanTenureMonths').value);

    const loanTenure = (loanTenureYears * 12) + loanTenureMonths;
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenure) / (Math.pow(1 + monthlyInterestRate, loanTenure) - 1);

    let balance = loanAmount;
    let totalInterest = 0;

    let resultHTML = `<table>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Principal (A)</th>
                                <th>Interest (B)</th>
                                <th>Total Payment (A + B)</th>
                                <th>Balance</th>
                                <th>Loan Paid To Date</th>
                            </tr>
                        </thead>
                        <tbody>`;

    for (let i = 1; i <= loanTenure; i++) {
        const interest = balance * monthlyInterestRate;
        const principal = emi - interest;
        balance -= principal;
        totalInterest += interest;

        const year = Math.floor((i - 1) / 12) + 1;
        const month = i % 12 === 0 ? 12 : i % 12;
        const loanPaidToDate = ((loanAmount - balance) / loanAmount) * 100;

        resultHTML += `<tr>
                        <td>${year}</td>
                        <td>${month}</td>
                        <td>₹${principal.toFixed(2)}</td>
                        <td>₹${interest.toFixed(2)}</td>
                        <td>₹${emi.toFixed(2)}</td>
                        <td>₹${balance.toFixed(2)}</td>
                        <td>${loanPaidToDate.toFixed(2)}%</td>
                    </tr>`;
    }

    resultHTML += `</tbody></table>`;
    document.getElementById('result').innerHTML = resultHTML;
});
