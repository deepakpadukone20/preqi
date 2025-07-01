# User Management Backend (FastAPI)

This is a simple backend application built with **FastAPI** for managing users.

## Setup Instructions

### 1. Create a Virtual Environment

Using `venv`, create a virtual environment named `myenv`:

```bash
python -m venv myenv
```

### 2. Activate the Virtual Environment

#### On macOS/Linux:
```bash
source myenv/bin/activate
```

#### On Windows:
```bash
myenv\Scripts\activate
```

### 3. Install Required Dependencies

Install dependencies from the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### 4. Run the FastAPI Application

Use `uvicorn` to run the app in development mode with live reload:

```bash
uvicorn main:app --reload
```

The API will be available at: `http://127.0.0.1:8000`

Interactive documentation:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

---

## Useful Links

- 📘 FastAPI Documentation: [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- 🚀 Uvicorn Documentation: [https://www.uvicorn.org](https://www.uvicorn.org)
