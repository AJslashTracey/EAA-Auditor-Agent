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

## Expected Output Format

The EAA Compliance Agent generates a **structured report** summarizing accessibility compliance issues and best practices.

### **Example Output**
```
EAA Compliance Analysis Results:

Based on the provided accessibility audit results, we can categorize the issues into compliance fixes required to meet the European Accessibility Act (EAA) and WCAG 2.1 AA, as well as best practices that, while not necessarily required, would enhance accessibility.

Compliance Issues (Errors)
- **Missing Submit Button in Form**
  - Issue Code: WCAG2AA.Principle3.Guideline3_2.3_2_2.H32.2
  - Description: The form lacks a submit button, which is essential for users relying on keyboard navigation.
  - Fix: Include an `<input type="submit">` or `<button type="submit">` to ensure that users can submit the form.

- **Textarea Lacking Accessible Name**
  - Issue Code: WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Textarea.Name
  - Description: The textarea does not have an accessible name recognized by assistive technologies.
  - Fix: Add a `<label>` element associated with the textarea using the `for` attribute or use `aria-label` or `aria-labelledby` attributes to define an accessible name.

Best Practices (Informational)
- **Use of ARIA Roles and Attributes**
  - While the role of presentation is used incorrectly in several instances, ensuring proper use of ARIA roles and attributes improves the experience for users who rely on assistive technologies.

- **General Labeling Practices**
  - Ensuring all form fields and interactive elements are properly labeled enhances usability for all users, not just those with disabilities.

### **Summary**
The audit identifies several compliance issues that must be addressed to align with the European Accessibility Act and WCAG 2.1 AA standards. The issues related to form submission and labeling are critical and should be prioritized for fixes. Meanwhile, best practices around ARIA roles and semantic labeling can further enhance accessibility and user experience.
```

---

Agent will be available on [OpenServ AI](https://openserv.ai/)

For questions, DM us on Discord: `.mainjcr` 🚀
