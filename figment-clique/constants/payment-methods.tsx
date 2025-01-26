export const paymentMethods = [
    {
        label: 'GCASH',
        description: `
        <p>After clicking “Complete order”, payment instructions will be displayed.</p><br>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li>Orders are final and cannot be cancelled.</li>
          <li>All proof of payments must be sent to <a href='mailto:support@figmentclique.com'>support@figmentclique.com</a> within 24 hours, otherwise it will be tagged as unpaid.</li>
          <li>Multiple orders with the same address will be shipped individually.</li>
        </ul>`,
    },
    {
        label: 'BPI',
        description: "After selecting BPI, payment instructions will be displayed. Please follow the instructions carefully.",
    },
    {
        label: 'Cash On Delivery',
        description: "You can pay in cash upon receiving your order.",
    },
]