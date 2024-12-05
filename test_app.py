import os

UPLOAD_FOLDER = 'uploads'

def test_upload_file(client):
    # Test uploading a valid PDF file
    data = {
        'file': (open('uploads/REACT+Cheat+Sheet+.pdf', 'rb'), 'REACT+Cheat+Sheet+.pdf'),
        'query': 'What is this document about?'
    }
    response = client.post('/upload-and-query', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    assert "answer" in response.get_json()

def test_upload_no_file(client):
    # Test uploading without a file
    data = {'query': 'Test query'}
    response = client.post('/upload-and-query', data=data)
    assert response.status_code == 400
    assert response.get_json()['error'] == "File or query part is missing"

def test_list_files(client):
    # Test listing uploaded files
    response = client.get('/list-files')
    assert response.status_code == 200
    assert isinstance(response.get_json().get('files'), list)

def test_delete_file(client):
    # Ensure file deletion works
    filename = 'REACT+Cheat+Sheet+.pdf'
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    open(file_path, 'w').close()  # Create a dummy file
    response = client.delete(f'/delete-file?file={filename}')
    assert response.status_code == 200
    assert response.get_json()['message'] == f"File '{filename}' deleted successfully"

def test_delete_nonexistent_file(client):
    # Test deleting a non-existent file
    response = client.delete('/delete-file?file=nonexistent.pdf')
    assert response.status_code == 404
    assert response.get_json()['error'] == "File not found"
