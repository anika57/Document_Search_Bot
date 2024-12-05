# **Document Search Bot**

## **Objective**
The Document Search Bot allows users to upload documents (PDF, Word, Excel, and PowerPoint) and query information from them. It leverages the **Gemini API (gemini-1.5-flash)** to process queries and return relevant answers based on the uploaded document content.

---

## **Features**
- Upload and process multiple document formats: PDF, DOCX, XLSX, and PPTX.
- Extract relevant text using libraries tailored to each file type.
- Role-based access control:
  - **Admin**: Upload, delete, and query content.
  - **Normal User**: Query-only access to uploaded documents.
- Integration with the **Gemini API** for natural language query processing.

---

## **System Design**

### **Users**
1. **Admin**:
   - Upload and delete documents.
   - Query uploaded content.
2. **Normal User**:
   - Query uploaded content (read-only access).

### **Supported File Formats**
- PDF
- DOCX (Word)
- XLSX (Excel)
- PPTX (PowerPoint)

### **File Constraints**
- **Maximum File Size**: 2MB
- **Error Handling**:
  - Unsupported file formats trigger clear error messages.
  - Files exceeding the size limit are rejected.

### **Text Extraction Logic**
- **PDF**: Extracts text from all pages using `PyPDF2==3.0.1`.
- **DOCX**: Reads all paragraphs using `python-docx`.
- **XLSX**: Processes rows and cells using `openpyxl==3.1.2`.
- **PPTX**: Extracts text from slides and shapes using `python-pptx==0.6.21`.

---

## **Environment Setup**

### **Dependencies**
Install the following Python libraries:
```bash
Flask==2.3.2
python-dotenv==1.0.0
google-generativeai==0.3.0
Werkzeug==2.3.3
PyPDF2==3.0.1
openpyxl==3.1.2
python-pptx==0.6.21
```

### **Environment Variables**
Set the **Gemini API key** in your `.env` file:
```plaintext
GEMINI_API_KEY=<Your-Gemini-API-Key>
```

---

## **Process Workflow**

1. **File Upload**:
   - The user uploads a document.
   - The backend validates the file's type and size.
   - Text is extracted using the appropriate library.

2. **Query Handling**:
   - The user submits a query related to the document content.
   - Extracted text and query are sent to the Gemini API.
   - The API processes the input and returns a response.

3. **Response Display**:
   - The frontend displays the AI-generated response.
   - Errors (e.g., unsupported formats or file size issues) are shown clearly.

---

## **Example Inputs and Outputs**

### **Valid Input**
- **File**: `Report.pdf` (1.5MB)
- **Query**: "What are the key findings from the report?"
- **Output**: "The key findings include increased revenue by 25% and a decrease in operational costs by 15%."

### **Error Examples**
1. **Unsupported File Type**:
   - **File**: `Image.png`
   - **Error**: "Unsupported file type. Please upload a PDF, Word, Excel, or PowerPoint file."
2. **File Size Exceeded**:
   - **File**: `LargeFile.pdf` (3MB)
   - **Error**: "File size exceeds 2MB."

---

## **Test Cases**

### **File Upload Tests**
| **Test Case**               | **Input**        | **Expected Output**                    |
|-----------------------------|------------------|----------------------------------------|
| Upload valid PDF file       | `Report.pdf` (1MB) | File successfully processed.          |
| Upload unsupported file     | `Image.png`      | Error: Unsupported file type.          |
| Upload file exceeding limit | `LargeFile.pdf` (3MB) | Error: File size exceeds 2MB.         |

### **Query Processing Tests**
| **Test Case**                     | **Query**           | **Expected Output**                     |
|-----------------------------------|---------------------|-----------------------------------------|
| Valid query on uploaded content   | "Key metrics?"      | Relevant response from document content. |
| Query with no uploaded document   | "What is the summary?" | Error: No document uploaded.           |

### **Role-Based Access Tests**
| **Test Case**                     | **User Role**   | **Expected Behavior**                  |
|-----------------------------------|-----------------|-----------------------------------------|
| Admin uploads a file              | Admin           | File successfully uploaded.            |
| Normal user attempts file upload  | Normal User     | Error: Insufficient permissions.       |

---

## **Objective Criteria**
1. **File Validation**:
   - File size must not exceed 2MB.
   - Only supported formats are processed.
2. **Response Quality**:
   - Responses are accurate and concise.
   - Derived exclusively from document content.
3. **Error Handling**:
   - Clear and informative error messages.

---

## **Technologies Used**
- **Frontend**: React
- **Backend**: Flask
- **Gemini API**: gemini-1.5-flash

---

