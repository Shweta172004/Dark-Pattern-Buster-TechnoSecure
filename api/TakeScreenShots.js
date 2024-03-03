function captureAndSendScreenshot() {
    html2canvas(document.body).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(function(blob) {
            var formData = new FormData();
            formData.append('screenshot', blob, 'screenshot.png');

            // Send the screenshot as a POST request to the Flask server
            fetch('http://localhost:5000/upload_screenshot', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        });
    });
}
