# API Reference

This document describes the public API exposed by GutMiScholar.

---

# Base URL

Local development:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

OpenAPI schema:

```text
http://localhost:8000/openapi.json
```

---

# API Overview

The API is organized into the following groups:

| Group       | Purpose                              |
| ----------- | ------------------------------------ |
| Health      | Service status and model information |
| Chat        | Literature question answering        |
| Collections | Collection and PDF management        |
| Selection   | PDF selection workflows              |
| Metadata    | Collection and document metadata     |
| Search      | File-specific retrieval              |
| Memory      | Conversation history                 |

---

# Health Endpoints

## GET /

Returns service status information.

### Response

```json
{
  "status": "ok",
  "service": "GutMiScholar API",
  "version": "2.0.0"
}
```

---

## GET /api/model-info

Returns information about the currently configured model provider.

### Response

```json
{
  "status": "success",
  "model_info": {}
}
```

---

# Chat Endpoints

The chat API provides literature-grounded question answering over indexed PDF collections.

---

## POST /api/chat/classify

Classifies a user query before retrieval.

### Request

```json
{
  "query": "List all PDFs",
  "is_chatall_mode": false
}
```

### Response

```json
{
  "classification": "list_pdfs",
  "filename": null,
  "confidence": 1.0
}
```

### Possible Classifications

```text
content_search
file_specific_search
list_pdfs
count_pdfs
list_collections
```

Note: classifications are internal routing decisions and may evolve as additional workflows are added.

---

## POST /api/chat/single/{collection_name}

Chat with a single collection.

### Request

```json
{
  "message": "What is the gut microbiome?",
  "chat_id": null,
  "eval": false
}
```

### Response

Server-Sent Events (SSE)

```text
Content-Type: text/event-stream
```

---

## POST /api/chat/all

Chat across all collections.

### Request

```json
{
  "message": "What papers discuss autism and microbiota?",
  "chat_id": null,
  "eval": false
}
```

### Response

Server-Sent Events (SSE)

```text
Content-Type: text/event-stream
```

---

# Streaming Response Format

Chat endpoints stream events incrementally.

Example:

```text
data: {"type":"chat_id","chat_id":"123"}

data: {"type":"sources","sources":[...]}

data: {"type":"content","content":"The gut microbiome"}

data: {"type":"content","content":" is a complex ecosystem"}

data: {"type":"end"}
```

### Event Types

#### chat_id

Provides the conversation identifier.

```json
{
  "type": "chat_id",
  "chat_id": "..."
}
```

#### sources

Provides retrieved source passages.

```json
{
  "type": "sources",
  "sources": []
}
```

#### content

Incremental answer content.

```json
{
  "type": "content",
  "content": "..."
}
```

#### end

Signals stream completion.

```json
{
  "type": "end"
}
```

#### error

Signals an error during processing.

```json
{
  "type": "error",
  "message": "..."
}
```

---

# Collection Endpoints

Collection endpoints manage PDF collections and uploaded documents.

---

## GET /api/collections

Returns all available collections.

---

## POST /api/collections/{collection_name}/upload

Upload one or more PDF files into a collection.

### Content Type

```text
multipart/form-data
```

---

## POST /api/collections/{collection_name}/pdfs/add

Add additional PDFs to an existing collection.

### Content Type

```text
multipart/form-data
```

---

## DELETE /api/collections/{collection_name}

Delete an entire collection and its associated files.

---

## PUT /api/collections/rename

Rename an existing collection.

### Request

```json
{
  "old_name": "old_collection",
  "new_name": "new_collection"
}
```

---

## DELETE /api/collections/{collection_name}/pdfs/{filename}

Delete a PDF from a collection.

---

## PUT /api/collections/pdfs/rename

Rename a PDF within a collection.

### Request

```json
{
  "collection_name": "gut_microbiome",
  "old_filename": "paper1.pdf",
  "new_filename": "paper2.pdf"
}
```

---

## GET /api/collections/{collection_name}/pdfs/{filename}/view

View a PDF directly in the browser.

### Response

```text
application/pdf
```

---

# Selection Endpoints

Selection endpoints allow users to work with a custom subset of PDFs.

Selections are tracked using a session identifier.

---

## POST /api/selection/{session_id}/select

Select a PDF.

---

## POST /api/selection/{session_id}/deselect

Remove a PDF from the current selection.

---

## POST /api/selection/{session_id}/batch-select

Select multiple PDFs in a single request.

---

## DELETE /api/selection/{session_id}/clear

Clear all selected PDFs.

---

## GET /api/selection/{session_id}

Retrieve current selection details.

---

## GET /api/selection/{session_id}/stats

Retrieve statistics about the current selection.

---

## POST /api/selection/{session_id}/search

Search only within selected PDFs.

### Request

```json
{
  "query": "short-chain fatty acids",
  "num_results": 25
}
```

---

## GET /api/selection/{session_id}/chat

Chat only with selected PDFs.

### Query Parameters

```text
query
chat_id
num_results
```

### Response

Server-Sent Events (SSE)

```text
Content-Type: text/event-stream
```

---

# Metadata Endpoints

Metadata endpoints provide information about collections and indexed PDFs.

---

## GET /api/collections/{collection_name}/pdfs

Returns PDF metadata for a collection.

Response includes:

* Total PDFs
* Total chunks
* PDF details

---

## GET /api/collections/{collection_name}/stats

Returns collection statistics.

Response includes:

* Total PDFs
* Total chunks
* PDF-level metadata

---

## GET /api/metadata/all-pdfs

Returns metadata across all collections.

Response includes:

* Total collections
* Total PDFs
* Total chunks
* Collection-level breakdown

---

# Search Endpoints

Search endpoints provide direct file-level retrieval.

---

## POST /api/search/file

Search within a specific PDF.

### Request

```json
{
  "collection_name": "gut_microbiome",
  "filename": "paper.pdf",
  "query": "autism",
  "num_results": 10
}
```

---

## POST /api/search/file-all

Search for a specific PDF across all collections.

### Request

```json
{
  "filename": "paper.pdf",
  "query": "autism",
  "num_results": 10
}
```

---

# Memory Endpoints

Memory endpoints manage conversation history.

---

## POST /api/memory/{chat_id}/add

Add a message to conversation memory.

### Request

```json
{
  "role": "user",
  "content": "What is the gut microbiome?",
  "collection_name": "gut_microbiome"
}
```

---

## GET /api/memory/{chat_id}

Retrieve conversation history.

### Query Parameters

```text
max_messages
```

Default:

```text
10
```

---

## GET /api/memory/{chat_id}/summary

Retrieve conversation summary information.

---

## DELETE /api/memory/{chat_id}

Clear conversation history.

---

# Common Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 400  | Invalid request       |
| 404  | Resource not found    |
| 422  | Validation error      |
| 500  | Internal server error |

---

# Error Response Format

Example:

```json
{
  "error": true,
  "status_code": 404,
  "message": "Collection not found"
}
```

The API attempts to return consistent error responses across endpoints whenever possible.
