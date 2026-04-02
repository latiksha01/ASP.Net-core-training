import React from "react";

function Contact() {
    return (
        <div style={styles.container}>
            <h1>Contact Page</h1>
            <p>You can reach us at:</p>
            <p>Email: 2qBt4@example.com</p>
            <p>Phone: 123-456-7890</p>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "40px",
        background: "#d4edda",
    },
};

export default Contact;