# Required libraries
from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import faiss
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.docstore.document import Document
from langchain_openai import OpenAI
from langchain.chains import RetrievalQA

# Initialize Flask application
app = Flask(__name__)

# Global variables for storing documents and FAISS store
documents = []
faiss_store = None

# Step 1: Function to load and process PDFs
def load_pdf_text(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

# Helper function to split text into chunks
def split_text(text, chunk_size=500):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

# Step 3: API to load multiple PDFs and process them
@app.route('/load_pdfs', methods=['POST'])
def load_pdfs():
    global documents, faiss_store
    try:
        pdf_files = request.files.getlist('pdf_files')

        if not pdf_files:
            return jsonify({"error": "No PDF files provided."}), 400

        for pdf_file in pdf_files:
            pdf_text = load_pdf_text(pdf_file)
            if not pdf_text:
                return jsonify({"message": f"Could not extract text from {pdf_file.filename}.", "skipped": pdf_file.filename}), 400

            chunks = split_text(pdf_text)
            documents.extend([Document(page_content=chunk) for chunk in chunks])

        # Embedding model setup
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        # FAISS VectorStore setup
        faiss_store = FAISS.from_documents(documents, embedding=embedding_model)

        # Return success response
        return jsonify({"message": "PDFs processed successfully.", "num_chunks": len(documents)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Step 4: API for querying the processed PDF data
@app.route('/query_pdf', methods=['POST'])
def query_pdf():
    try:
        global documents, faiss_store

        # Retrieve query and OpenAI API key from request
        query = request.json.get('query')
        api_key = request.json.get('api_key')

        # If no documents are loaded, fallback to ChatGPT without the PDF context
        if not documents:
            # Initialize OpenAI LLM directly
            llm = OpenAI(api_key=api_key)

            # Send query directly to ChatGPT without document context
            response = llm.call(query)
            return jsonify({"response": response}), 200

        # Otherwise, use FAISS-based document retrieval
        llm = OpenAI(api_key=api_key)

        # Set up the retrieval chain
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=faiss_store.as_retriever())

        # Run the query
        response = qa_chain.run(query)
        if not response:
            return jsonify({"error": "No response from the system for the provided query."}), 400

        # Return the response
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Main function to run Flask app
if __name__ == '__main__':
    app.run(debug=False)
