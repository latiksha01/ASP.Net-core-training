import React from "react";

function About() {
    return (
        <div style={styles.container}>
            <h1>About Page</h1>
            <p>This application is a demo for React Router concpets.</p>
            <p>It includes navugation, routing, and component rendering.</p>
        </div>
    );
}

const styles ={
    container: {
        textAlign: 'center',
        padding: '40px',
        background: '#fff3cd'
    }
};

export default About;