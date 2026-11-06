/* "Copy" buttons in the Contact menu: put the LinkedIn link or the email
   address on the clipboard, ready to paste somewhere else. */

let status = null;

function announce(text) {
  if (!status) {
    status = document.createElement("p");
    status.className = "visually-hidden";
    status.setAttribute("role", "status");
    document.body.append(status);
  }
  status.textContent = "";
  window.setTimeout(() => { status.textContent = text; }, 30);
}

/* Older browsers and non-secure pages: copy through a temporary field. */
function legacyCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  field.remove();
  return ok;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return legacyCopy(text);
  }
}

export function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    let timer = null;
    button.addEventListener("click", async () => {
      const label = button.dataset.copyLabel || "text";
      const ok = await copyText(button.dataset.copy);
      announce(ok ? `Copied the ${label}.` : `Could not copy. The ${label} is ${button.dataset.copy}`);
      if (!ok) return;
      button.classList.add("is-copied");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => button.classList.remove("is-copied"), 1800);
    });
  });
}
