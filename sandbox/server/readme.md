# FrontendForge — AI-Powered Cloud Sandbox IDE

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-1.28+-326CE5?logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-multi--stage-2496ED?logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-cloud-DC382D?logo=redis&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-CloudAMQP-FF6600?logo=rabbitmq&logoColor=white)
![MistralAI](https://img.shields.io/badge/MistralAI-mistral--large--latest-FF7000)
![LangChain](https://img.shields.io/badge/LangChain-LangGraph-1C3C3C?logo=langchain)
![License](https://img.shields.io/badge/license-ISC-blue)
![Build](https://img.shields.io/badge/build-skaffold-00ADD8)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [High-Level Architecture Diagram](#2-high-level-architecture-diagram)
3. [Microservices Breakdown](#3-microservices-breakdown)
4. [Sandbox Lifecycle](#4-sandbox-lifecycle)
5. [AI Code Editing Layer](#5-ai-code-editing-layer)
6. [Data Models & Schemas](#6-data-models--schemas)
7. [Kubernetes Cluster Design](#7-kubernetes-cluster-design)
8. [Developer Setup & Local Development](#8-developer-setup--local-development)
9. [Environment Variables Reference](#9-environment-variables-reference)
10. [API Reference](#10-api-reference)
11. [CI/CD Pipeline](#11-cicd-pipeline)
12. [Security Considerations](#12-security-considerations)
13. [Observability](#13-observability)
14. [Roadmap & Known Limitations](#14-roadmap--known-limitations)
15. [Contributing Guide](#15-contributing-guide)
16. [License](#16-license)

---

## 1. Executive Summary

**FrontendForge** is a browser-based cloud IDE that provisions isolated,
per-user React + Vite sandbox environments on demand inside a Kubernetes
cluster.

Each sandbox runs as a dedicated pod pre-loaded with a starter template;
users interact with a VS Code–style UI that includes a live preview pane,
a file explorer, an integrated terminal, and an AI chat panel powered by
**Mistral Large** via LangChain/LangGraph.