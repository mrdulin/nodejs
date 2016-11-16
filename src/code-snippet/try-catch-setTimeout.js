try {
    setTimeout(() => {
        let data = a/0;
    }, 1000)
} catch(e) {
    console.log(e);
}