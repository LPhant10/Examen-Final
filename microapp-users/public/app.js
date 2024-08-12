document.addEventListener('DOMContentLoaded', () => {
    const serviceTitle = 'Users Service';
    const listTitle = 'Users List';
    const addTitle = 'Add User';
    const formFields = `
        <label for="user-name">User Name:</label>
        <input type="text" id="user-name" name="name" required>
    `;

    document.getElementById('service-title').textContent = serviceTitle;
    document.getElementById('list-title').textContent = listTitle;
    document.getElementById('add-title').textContent = addTitle;
    document.getElementById('form-fields').innerHTML = formFields;

    const listContainer = document.getElementById('list-container');
    const addUserForm = document.getElementById('add-form');

    async function fetchUsers() {
        const response = await fetch('/users');
        const users = await response.json();
        renderUsers(users);
    }

    function renderUsers(users) {
        listContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    async function addUser(user) {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            await fetchUsers();
        } else {
            alert('Error adding user');
        }
    }

    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        addUser({ name });
    });

    fetchUsers();
});
