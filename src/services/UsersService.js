class UsersService {
    constructor() {
        this.baseUrl = 'https://reqres.in/api';
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    async getUsers() {
        try {
            const response = await fetch(`${this.baseUrl}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getUserDetails(id) {
        try {
            const response = await fetch(`${this.baseUrl}/users/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }
}

export {UsersService};