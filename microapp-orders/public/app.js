document.addEventListener('DOMContentLoaded', () => {
    const serviceTitle = 'Orders Service';
    const listTitle = 'Orders List';
    const addTitle = 'Add Order';
    const formFields = `
        <label for="user-name">User Name:</label>
        <input type="text" id="user-name" name="user" required>
        <label for="product-name">Product Name:</label>
        <input type="text" id="product-name" name="product" required>
    `;

    document.getElementById('service-title').textContent = serviceTitle;
    document.getElementById('list-title').textContent = listTitle;
    document.getElementById('add-title').textContent = addTitle;
    document.getElementById('form-fields').innerHTML = formFields;

    const listContainer = document.getElementById('list-container');
    const addOrderForm = document.getElementById('add-form');

    async function fetchOrders() {
        const response = await fetch('/orders');
        const orders = await response.json();
        renderOrders(orders);
    }

    function renderOrders(orders) {
        listContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Product</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.user}</td>
                            <td>${order.product}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    async function addOrder(order) {
        const response = await fetch('/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            await fetchOrders();
        } else {
            alert('Error adding order');
        }
    }

    addOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('user-name').value;
        const product = document.getElementById('product-name').value;
        addOrder({ user, product });
    });

    fetchOrders();
});
