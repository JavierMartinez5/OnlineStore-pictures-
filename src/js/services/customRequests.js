class ApiRequests {
    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            body: data
        });
        return await response.text();
    }
    async get(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        return await response.json();
    }
}
export const customHttp = new ApiRequests();