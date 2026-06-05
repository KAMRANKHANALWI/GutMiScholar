# Evaluation Methodology

This document describes the evaluation methodology used to assess the performance of GutMiScholar.

The goal of the evaluation was to measure how accurately the system retrieves relevant scientific information and generates literature-grounded answers for gut microbiome research questions.

---

# Evaluation Overview

Evaluating a Retrieval-Augmented Generation (RAG) system is fundamentally different from evaluating a traditional question-answering model.

A correct answer depends on both:

* Retrieving the correct evidence from the document collection
* Generating an answer that is supported by the retrieved evidence

To evaluate these components, GutMiScholar uses a two-part evaluation framework:

1. Multiple Choice Question (MCQ) Evaluation
2. Open-Ended Question Evaluation using RAGAS

The evaluation dataset was created from a collection of approximately 100 gut microbiome research papers indexed by the system.

---

# Evaluation Workflow

```text
Research Papers
        ↓
Question Dataset Generation
        ↓
Dataset Consolidation
        ↓
RAG Answer Generation
        ↓
MCQ Evaluation
        ↓
Open-Ended Evaluation (RAGAS)
        ↓
Metric Aggregation
        ↓
Error Analysis
```

---

# Dataset Creation

The evaluation dataset was generated from the same scientific literature collection used by the chatbot.

Each research paper was processed individually to create evaluation questions.

Question generation was performed using a large language model with prompts designed to produce:

* Easy questions (factual information)
* Medium questions (mechanisms and processes)
* Hard questions (comparisons, reasoning, and complex scientific concepts)

For every paper, the dataset contains:

* 15 Open-Ended Questions
* 10 Multiple Choice Questions (MCQs)

The resulting datasets were consolidated into a single evaluation corpus covering the entire gut microbiome collection.

---

# MCQ Evaluation

MCQ evaluation measures whether the system can retrieve the correct evidence and select the correct answer.

For each MCQ:

1. The question and answer options are sent through the complete GutMiScholar retrieval pipeline.
2. The chatbot generates an answer.
3. The predicted option is extracted from the generated response.
4. The predicted option is compared against the ground-truth option.

The final metric is:

```text
Accuracy = Correct Answers / Total Questions
```

This evaluation provides a simple and interpretable measure of system performance.

---

# Open-Ended Evaluation

Open-ended evaluation measures answer quality for realistic scientific questions.

Each question is processed through the full GutMiScholar pipeline:

```text
Question
    ↓
Retrieval
    ↓
Reranking
    ↓
Answer Generation
```

For every generated answer, the following information is stored:

* Generated answer
* Retrieved contexts
* Retrieved sources
* Similarity scores

These outputs are then evaluated using RAGAS.

---

# RAGAS Metrics

The following RAGAS metrics are used.

## Faithfulness

Measures whether the generated answer is supported by the retrieved context.

Higher scores indicate fewer hallucinations.

---

## Answer Relevancy

Measures how well the answer addresses the user's question.

Higher scores indicate more relevant answers.

---

## Answer Correctness

Measures semantic similarity between the generated answer and the reference answer.

This metric serves as the primary answer quality metric.

---

## Context Precision

Measures how much of the retrieved context is actually useful for answering the question.

Higher scores indicate less irrelevant retrieval.

---

## Context Recall

Measures whether the retrieved context contains the information required to answer the question.

Higher scores indicate stronger retrieval coverage.

---

# Local LLM Judge

RAGAS evaluations require an evaluation model to score generated answers.

Instead of relying on hosted models such as GPT-4, GutMiScholar uses a locally hosted LLM through Ollama.

Benefits include:

* No API costs
* Fully reproducible evaluation
* Offline execution
* Improved privacy for scientific datasets

The evaluation model can be configured through environment variables.

---

# Result Aggregation

After evaluation, metrics are aggregated across the full dataset.

Summary reports include:

* MCQ Accuracy
* Average Faithfulness
* Average Answer Relevancy
* Average Answer Correctness
* Average Context Precision
* Average Context Recall

Additional distribution analyses are generated to identify weak-performing questions and retrieval failures.

---

# Error Analysis

To support deeper investigation, evaluation outputs are merged with:

* Generated answers
* Retrieved contexts
* Reference answers
* Evaluation scores

This enables manual inspection of:

* Low-correctness answers
* Retrieval failures
* Hallucinated responses
* Missing context cases

The resulting datasets can be used to guide future improvements to retrieval, reranking, chunking, and prompting strategies.

---

# Evaluation Limitations

The current evaluation framework has several limitations.

* Evaluation questions are generated using a large language model.
* Questions are not manually validated by domain experts.
* RAGAS metrics depend on the quality of the evaluation model.
* The evaluation focuses on answer quality and retrieval quality rather than retrieval ranking metrics.
* Metrics such as Hit@K, MRR, and NDCG are not currently included.

These limitations should be considered when interpreting evaluation results.

---

# Future Improvements

Potential future enhancements include:

* Human expert evaluation
* Retrieval-specific benchmarks
* Hit@K and MRR evaluation
* Citation accuracy evaluation
* Multi-document reasoning benchmarks
* Long-context evaluation scenarios

These additions would provide a more comprehensive assessment of retrieval and generation quality.
