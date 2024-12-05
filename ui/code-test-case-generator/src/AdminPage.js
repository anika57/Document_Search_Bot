import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [file, setFile] = useState(null);
    const [query, setQuery] = useState('');
    const [history, setHistory] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    // Fetch the list of uploaded files from the backend
    const fetchFiles = async () => {
        try {
            const response = await fetch('http://localhost:5000/list-files');
            const data = await response.json();
            setFiles(data.files);
        } catch (err) {
            console.error('Error fetching files:', err);
        }
    };

    // Handle file input changes
    const handleFileChange = (e) => setFile(e.target.files[0]);

    // Handle query input changes
    const handleQueryChange = (e) => setQuery(e.target.value);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file.');
        if (!query) return alert('Please enter a query.');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('query', query);

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/upload-and-query', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setHistory([...history, { query, answer: data.answer }]);
            setQuery('');
            fetchFiles(); // Refresh file list
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Error answering query. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle file deletion
    const handleDelete = async (fileName) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-file?file=${fileName}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            alert(`File '${fileName}' deleted successfully`);
            fetchFiles(); // Refresh file list after deletion
        } catch (err) {
            console.error('Error deleting file:', err);
            alert(err.message || 'Failed to delete the file');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Document Management</h1>

                {/* Upload and Query Section */}
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

                {/* Display List of Files */}
                <div style={styles.fileList}>
                    <h2>Uploaded Files</h2>
                    {files.length === 0 ? (
                        <p>No files uploaded yet.</p>
                    ) : (
                        <ul>
                            {files.map((fileName, index) => (
                                <li key={index} style={styles.fileItem}>
                                    {fileName}
                                    <button
                                        onClick={() => handleDelete(fileName)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Display Query History */}
                <div style={styles.historySection}>
                    <h2>Query Results</h2>
                    {history.length === 0 ? (
                        <p>No queries submitted yet.</p>
                    ) : (
                        history.map((item, index) => (
                            <div key={index} style={styles.historyItem}>
                                <div style={styles.query}>
                                    <strong>Query:</strong> {item.query}
                                </div>
                                <div style={styles.answer}>
                                    <strong>Answer:</strong> {item.answer}
                                </div>
                            </div>
                        ))
                    )}
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
        maxWidth: '800px',
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
    fileList: {
        marginTop: '20px',
    },
    fileItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    deleteButton: {
        marginLeft: '10px',
        color: '#e74c3c',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
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
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default AdminPage;
