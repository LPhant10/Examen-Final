document.addEventListener('DOMContentLoaded', async () => {
    const dataTablesDiv = document.getElementById('data-tables');

    async function fetchAllData() {
        const response = await fetch('/all-data');
        const allData = await response.json();

        // Create tables for users, products, and orders
        const usersTable = createTable('Users', ['ID', 'Name'], allData.users);
        const productsTable = createTable('Products', ['ID', 'Name'], allData.products);
        const ordersTable = createTable('Orders', ['ID', 'User', 'Product'], allData.orders);

        dataTablesDiv.innerHTML = `
            <h3>Users</h3>
            ${usersTable}
            <h3>Products</h3>
            ${productsTable}
            <h3>Orders</h3>
            ${ordersTable}
        `;
    }

    function createTable(title, headers, data) {
        let table = `<table><caption>${title}</caption><thead><tr>`;
        headers.forEach(header => {
            table += `<th>${header}</th>`;
        });
        table += `</tr></thead><tbody>`;
        data.forEach(item => {
            table += `<tr>`;
            headers.forEach(header => {
                table += `<td>${item[header.toLowerCase()] || ''}</td>`;
            });
            table += `</tr>`;
        });
        table += `</tbody></table>`;
        return table;
    }

    fetchAllData();
});
