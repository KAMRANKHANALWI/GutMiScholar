# Evaluation Dataset

This document describes the dataset used to evaluate GutMiScholar.

The dataset was specifically created for gut microbiome literature and was designed to measure both retrieval quality and answer generation quality.

---

# Dataset Overview

The evaluation dataset was generated from approximately 100 scientific research papers related to gut microbiome research.

These papers are the same documents indexed by GutMiScholar and stored within the system's vector database.

The dataset contains two evaluation formats:

1. Open-Ended Questions
2. Multiple Choice Questions (MCQs)

The goal was to create a diverse benchmark covering factual knowledge, biological mechanisms, scientific reasoning, and comparative analysis.

---

# Dataset Generation Process

Each paper was processed individually.

A large language model was prompted to generate evaluation questions directly from the paper content.

For every paper:

```text
15 Open-Ended Questions
10 Multiple Choice Questions
```

were generated.

Questions were designed to cover different levels of difficulty.

---

# Difficulty Levels

Questions were divided into three difficulty categories.

## Easy

Focused on factual information.

Examples:

* Definitions
* Study objectives
* Reported findings
* Named biological entities

---

## Medium

Focused on mechanisms and scientific processes.

Examples:

* Biological pathways
* Host-microbiome interactions
* Experimental observations
* Cause-effect relationships

---

## Hard

Focused on reasoning and scientific interpretation.

Examples:

* Multi-step mechanisms
* Comparisons between studies
* Interpretation of findings
* Complex biological interactions

---

# Dataset Structure

The dataset generation process produced one JSON file per paper.

Example:

```text
Eval_Data/

1-Introduction to the human gut microbiota.json
2-Gut microbiome and health - mechanistic insights.json
3-Human gut microbiota.json
...
```

Each JSON file contains:

```text
Paper Metadata
Open-Ended Questions
Multiple Choice Questions
Ground Truth Answers
Reference Documents
Difficulty Labels
```

---

# Open-Ended Questions

Each open-ended question contains:

```json
{
  "id": "qa_easy_001",
  "question": "...",
  "reference": "...",
  "source_document": "...",
  "expected_document": "..."
}
```

Fields:

| Field             | Description                |
| ----------------- | -------------------------- |
| id                | Unique question identifier |
| question          | Evaluation question        |
| reference         | Ground-truth answer        |
| source_document   | Source paper               |
| expected_document | Expected retrieval source  |

---

# Multiple Choice Questions

Each MCQ contains:

```json
{
  "id": "mcq_medium_001",
  "question": "...",
  "option_a": "...",
  "option_b": "...",
  "option_c": "...",
  "option_d": "...",
  "correct_option": "B"
}
```

Fields:

| Field          | Description         |
| -------------- | ------------------- |
| question       | MCQ prompt          |
| option_a-d     | Candidate answers   |
| correct_option | Ground-truth answer |

---

# Dataset Consolidation

Individual paper-level JSON files are consolidated into a unified dataset.

The consolidation process produces:

```text
Eval_Dataset_New/

gut_microbiome_dataset.json
gut_microbiome_full_dataset.csv
gut_microbiome_mcq.csv
gut_microbiome_open_ended.csv
```

---

# Consolidated Files

## gut_microbiome_dataset.json

Master dataset containing all generated questions.

---

## gut_microbiome_mcq.csv

Contains only MCQ questions.

Used by:

```text
rag_mcq.py
eval_mcq.py
```

---

## gut_microbiome_open_ended.csv

Contains only open-ended questions.

Used by:

```text
rag_open_ended.py
eval_open_ended_ragas.py
```

---

## gut_microbiome_full_dataset.csv

Combined dataset containing both MCQ and open-ended questions.

Useful for dataset inspection and analytics.

---

# Dataset Statistics

Current dataset size:

```text
≈ 100 Research Papers

≈ 1500 Open-Ended Questions

≈ 1000 MCQs
```

Total evaluation questions:

```text
≈ 2500 Questions
```

The exact number may vary as the dataset evolves.

---

# Why Generate Questions Per Paper?

Generating questions directly from individual papers provides several advantages.

* Questions remain grounded in source literature.
* Ground-truth answers can be extracted from the same paper.
* Retrieval quality can be measured more reliably.
* Questions cover paper-specific findings rather than generic domain knowledge.

This produces a benchmark that more closely reflects real-world literature exploration tasks.

---

# Dataset Limitations

The dataset is synthetic.

Questions and answers were generated using a large language model rather than manually created by domain experts.

Potential limitations include:

* LLM-generated question bias
* Incomplete coverage of paper content
* Occasional ambiguity in generated answers
* Dependence on source paper quality

Despite these limitations, the dataset provides a scalable and reproducible benchmark for evaluating GutMiScholar.

---

# Future Improvements

Potential future enhancements include:

* Human-reviewed questions
* Expert-validated reference answers
* Multi-document reasoning questions
* Citation-focused evaluation tasks
* Retrieval-specific benchmark datasets

These additions would improve the robustness and realism of future evaluations.
