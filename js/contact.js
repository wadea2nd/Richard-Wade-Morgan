/* Contact dialog.
   Every "Contact" link is a real mailto: link, so it works without
   JavaScript. With JavaScript it opens a small message form instead.

   Delivery: the form posts to Netlify Forms (see the hidden form in
   index.html, which is how Netlify discovers it). If the post fails, the
   dialog says so and offers a mailto: link, so a message is never lost. */

import { SITE } from "./data.js";

let dialog, form, status, sendBtn, emailInput, messageInput, body;

const CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19"/></svg>';

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "dialog";
  dialog.setAttribute("aria-labelledby", "contact-title");
  dialog.innerHTML = `
    <form name="contact" method="POST" novalidate>
      <input type="hidden" name="form-name" value="contact">
      <p class="honeypot" inert><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

      <div class="dialog__header">
        <h2 class="dialog__title" id="contact-title">Contact</h2>
        <button type="button" class="dialog__close" data-close aria-label="Close contact form">${CLOSE_ICON}</button>
      </div>

      <div class="dialog__body">
        <label class="field">
          <span class="visually-hidden">Your email address</span>
          <input type="email" name="email" placeholder="From: (enter your email address)…" autocomplete="email" required>
        </label>
        <label class="field">
          <span class="visually-hidden">Your message</span>
          <textarea name="message" placeholder="Write your message…" required></textarea>
        </label>
      </div>

      <p class="form-status" role="status" aria-live="polite"></p>

      <div class="dialog__footer">
        <button type="button" class="btn" data-close>Cancel</button>
        <button type="submit" class="btn btn--solid">Send</button>
      </div>
    </form>
  `;
  document.body.append(dialog);

  form = dialog.querySelector("form");
  status = dialog.querySelector(".form-status");
  sendBtn = dialog.querySelector('button[type="submit"]');
  emailInput = form.elements.email;
  messageInput = form.elements.message;
  body = dialog.querySelector(".dialog__body");

  dialog.querySelectorAll("[data-close]").forEach((btn) => btn.addEventListener("click", () => dialog.close()));

  /* Clicking the dimmed backdrop closes it. */
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  form.addEventListener("submit", onSubmit);
}

function setStatus(text, state) {
  status.textContent = text;
  status.dataset.state = state || "";
}

async function onSubmit(event) {
  event.preventDefault();

  if (!emailInput.value.trim() || !emailInput.checkValidity()) {
    setStatus("Please enter a valid email address so I can reply.", "error");
    emailInput.focus();
    return;
  }
  if (!messageInput.value.trim()) {
    setStatus("Please write a message.", "error");
    messageInput.focus();
    return;
  }

  sendBtn.disabled = true;
  setStatus("Sending…", "");

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    form.reset();
    setStatus("Thanks, your message is on its way. I will reply soon.", "");
    sendBtn.textContent = "Sent";
    window.setTimeout(() => { if (dialog.open) dialog.close(); }, 2200);
  } catch (error) {
    const subject = encodeURIComponent("Hello from your website");
    const text = encodeURIComponent(messageInput.value);
    status.innerHTML = "";
    status.dataset.state = "error";
    status.append("That didn’t send. ");
    const link = document.createElement("a");
    link.href = `mailto:${SITE.email}?subject=${subject}&body=${text}`;
    link.textContent = "Email me directly instead.";
    status.append(link);
    sendBtn.disabled = false;
  }
}

function open() {
  if (!dialog) build();
  setStatus("", "");
  sendBtn.disabled = false;
  sendBtn.textContent = "Send";
  dialog.showModal();
  emailInput.focus();
}

export function initContact() {
  const triggers = document.querySelectorAll("[data-contact]");
  if (!triggers.length || typeof HTMLDialogElement !== "function") return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      open();
    });
  });
}
