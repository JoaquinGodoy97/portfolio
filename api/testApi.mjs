const testNetwork = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (response.ok) {
            const data = await response.json();
            // console.log('Test fetch successful:', data);
        } else {
            console.log('Test fetch failed:', response.status);
        }
    } catch (error) {
        console.error('Error with network availability test:', error.message);
    }
};
testNetwork();