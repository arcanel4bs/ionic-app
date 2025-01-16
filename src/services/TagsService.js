class TagService {
    constructor () {
        this.baseUrl = 'https://localhost:7057';
    }

    async getTags() {
        try {
            const response = await fetch(`${this.baseUrl}/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + "eysfsfdsfdsf"
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

export {TagService};