# EAA Compliance Agent

An AI-powered agent that audits websites for compliance with the **European Accessibility Act (EAA)**. Built with OpenServ SDK and leveraging automated accessibility analysis.

## Features

- 🔍 Validates and audits websites for **EAA compliance**
- 🌐 Accepts only domain names (e.g., `github.com`) and formats them correctly
- 📊 Runs an accessibility audit using `getFeedback()`
- 📑 Categorizes issues into **EAA violations** and **best practices**
- 🤖 Responds to chat requests with structured compliance feedback

## Prerequisites

- **Node.js** >= 18.0.0
- **OpenServ API Key**
- **OpenAI API Key**

## Environment Variables

Create a `.env` file in the root directory with the following:
```env
OPENSERV_API_KEY=your_openserv_api_key
OPENAI_API_KEY=your_openai_api_key
```

## How to Use the EAA Compliance Agent

1. **Request a Website Audit**  
   - Provide a **domain name** (not a full URL) in chat:  
     ```
     github.com
     ```
   - The agent will format it as `https://github.com` and perform an **EAA compliance audit**.

2. **Processing the Audit Task**  
   - The agent will run `getFeedback()` to analyze accessibility compliance.
   - It will categorize issues as **EAA-required fixes** or **best practices**.

3. **Retrieving the Output**  
   - Once the audit is complete, ask for the output:
     ```
     What are the compliance results?
     ```
   - The response will include a **structured compliance report** with necessary fixes and recommendations.

4. **Review the Report**  
   - The final report provides AI-generated insights and guidance for fixing accessibility issues.
   - The analysis can be used for **ensuring website accessibility**, **regulatory compliance**, or **improving user experience**.

---

Agent will be available on [OpenServ AI](https://openserv.ai/)

For questions, DM us on Discord: `.mainjcr` or `.pandaroe`. 🚀
