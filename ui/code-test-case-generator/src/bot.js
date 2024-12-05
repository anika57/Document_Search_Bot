import React, { useState } from 'react';

const Bot = () => {
    const [file, setFile] = useState(null);
    const [query, setQuery] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle query input change
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        if (!query) {
            alert('Please enter a query.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('query', query);

        setLoading(true);  // Start loading
        setError('');  // Reset any previous errors

        try {
            const response = await fetch('http://localhost:5000/upload-and-query', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }

            const data = await response.json();
            setHistory([...history, { query, answer: data.answer }]);  // Add to history
            setQuery('');  // Clear the query input
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error answering query. Please try again.');
        } finally {
            setLoading(false);  // End loading
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Document Search Bot</h1>
                <form onSubmit={handleSubmit} style={styles.uploadSection}>
                    <label style={styles.uploadLabel}>
                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                        Upload File
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your query"
                        value={query}
                        onChange={handleQueryChange}
                        style={styles.queryInput}
                    />
                    <button type="submit" style={styles.submitButton}>
                        {loading ? 'Processing...' : 'Submit Query'}
                    </button>
                </form>
                {error && <div style={styles.error}>{error}</div>}
                <div style={styles.historySection}>
                    {history.map((item, index) => (
                        <div key={index} style={styles.historyItem}>
                            <div style={styles.query}><strong>Q:</strong> {item.query}</div>
                            <div style={styles.answer}><strong>A:</strong> {item.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Styling (in-line)
const styles = {
    page: {
        backgroundColor: '#2c3e50',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    container: {
        maxWidth: '700px',
        padding: '30px',
        backgroundColor: '#34495e',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        color: '#ecf0f1',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontFamily: '"Roboto", sans-serif',
        color: '#ecf0f1',
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    uploadSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
    },
    uploadLabel: {
        display: 'inline-block',
        padding: '12px 30px',
        cursor: 'pointer',
        backgroundColor: '#3498db',
        color: '#ffffff',
        borderRadius: '5px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(52, 152, 219, 0.4)',
    },
    queryInput: {
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#2c3e50',
        color: '#ffffff',
    },
    submitButton: {
        padding: '12px 30px',
        fontSize: '1rem',
        backgroundColor: '#2ecc71',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(46, 204, 113, 0.4)',
    },
    historySection: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#2c3e50',
        borderRadius: '10px',
        textAlign: 'left',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    historyItem: {
        marginBottom: '15px',
    },
    query: {
        color: '#ecf0f1',
        fontSize: '1rem',
    },
    answer: {
        backgroundColor: '#34495e',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        color: '#c4c4c4',
        whiteSpace: 'pre-wrap',  // Ensure text wraps to the next line
        wordWrap: 'break-word',  // Break long words to fit within the container
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default Bot;