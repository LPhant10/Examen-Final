document.addEventListener('DOMContentLoaded', () => {
    const serviceTitle = 'Products Service';
    const listTitle = 'Products List';
    const addTitle = 'Add Product';
    const formFields = `
        <label for="product-name">Product Name:</label>
        <input type="text" id="product-name" name="name" required>
    `;

    document.getElementById('service-title').textContent = serviceTitle;
    document.getElementById('list-title').textContent = listTitle;
    document.getElementById('add-title').textContent = addTitle;
    document.getElementById('form-fields').innerHTML = formFields;

    const listContainer = document.getElementById('list-container');
    const addProductForm = document.getElementById('add-form');

    async function fetchProducts() {
        const response = await fetch('/products');
        const products = await response.json();
        renderProducts(products);
    }

    function renderProducts(products) {
        listContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    async function addProduct(product) {
        const response = await fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            await fetchProducts();
        } else {
            alert('Error adding product');
        }
    }

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        addProduct({ name });
    });

    fetchProducts();
});
