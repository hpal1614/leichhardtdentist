# Contact-form email templates

Two branded HTML emails for the website contact form:

| File | Who gets it | When |
|------|-------------|------|
| `clinic-notification.html` | The practice / leads inbox | Every time someone submits the form |
| `customer-confirmation.html` | The visitor who submitted | Immediately, as an auto-reply |

Preview images: `clinic-notification.png`, `customer-confirmation.png`
(or just double-click the `.html` files to open them in a browser).

---

## Why these need EmailJS (not the current FormSubmit)

The form currently uses **FormSubmit**, which can only send plain, unbranded
emails — no logo, no design, no auto-reply. To send these templates we use
**EmailJS** (free, no server needed, ~200 emails/month).

## One-time setup (≈5 minutes)

1. Sign up at **https://www.emailjs.com** (free).
2. **Email Services** → *Add New Service* → connect a Gmail account (the address
   emails will be *sent from*). Copy the **Service ID**.
3. **Email Templates** → *Create New Template*:
   - Open **Edit Content → Code editor**, delete everything, paste the entire
     contents of `clinic-notification.html`.
   - **To Email:** `keebhutia872@gmail.com`  ·  **Subject:** `New website enquiry from {{name}}`  ·  **Reply To:** `{{email}}`
   - Save. Copy this **Template ID**.
4. Create a **second** template the same way using `customer-confirmation.html`:
   - **To Email:** `{{email}}`  ·  **From Name:** `Leichhardt Dental Centre`  ·  **Subject:** `We've received your message`  ·  **Reply To:** `leichhardtdentist@gmail.com`
   - Save. Copy this **Template ID**.
5. **Account → General / API Keys** → copy the **Public Key**.

## Then send these 4 values back

- Service ID
- Template ID (notification)
- Template ID (confirmation)
- Public Key

…and the contact form gets wired to EmailJS (replacing FormSubmit).

## Template variables (already embedded)

`{{name}}` · `{{email}}` · `{{phone}}` · `{{message}}`
