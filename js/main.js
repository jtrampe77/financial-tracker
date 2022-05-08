// // Enter JavaScript for the exercise here...

const store = [];
// const storeCredits = [];

window.addEventListener('load', function(e) {
    const tableDisplay = document.querySelector('.transactions')
    const transactionForm = document.querySelector('.frm-transactions')

    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const id = uuidv4().substring(0, 8);

        const dataObject = {
            id: uuidv4().substring(0, 8),
            amount: Number(e.currentTarget.amount.value.trim()),
            type: e.currentTarget.type.value,
            description: e.currentTarget.description.value
        }





        descInput = e.currentTarget.querySelector('#description').value;
        typeInput = e.currentTarget.querySelector('#type').value;
        amountInput = e.currentTarget.querySelector('#amount').value;


        // tableFormatter(descInput, typeInput, amountInput);
        tableFormatter(dataObject)
        updateAmount()


        if (typeInput !== "debit" && typeInput !== "credit") {
            window.alert('Please select a type of payment!')
        }

        transactionForm.reset();

    })

    function tableFormatter(transaction) {
        const template =
            `
        <table>
            <tbody>
                <tr class="${transaction.type} data-key${transaction.id}">
                    <td>${transaction.description}</td>
                    <td>${transaction.type}</td>
                    <td class="amount">${transaction.amount}</td>
                    <td class="tools">
                        <i class="delete fa fa-trash-o"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        `

        // create element fragment
        const element = document.createRange().createContextualFragment(template)

        // get the element needed
        const tableElement = element.querySelector('tr')

        // remove
        tableElement.querySelector('.tools').addEventListener(
            'click',
            function(e) {
                const msg = confirm("Are you sure you want to delete it?");
                if (msg === true) {
                    tableDisplay.removeChild(e.currentTarget.parentElement)
                }
            }
        )

        store.push(transaction)

        tableDisplay.appendChild(tableElement)

    }


    function updateAmount() {

        const totalAmount = store.reduce((total, transaction) => {
            return transaction.amount + total
        }, 0)

        const totalDebitsDisplay = document.querySelector('.debits')
        const totalCreditDisplay = document.querySelector('.credits')

        if (typeInput == "debit") {
            totalDebitsDisplay.textContent = '$' + totalAmount

        } else if (typeInput == 'credit') {
            totalCreditDisplay.textContent = '$' + totalAmount
        }

    }



})