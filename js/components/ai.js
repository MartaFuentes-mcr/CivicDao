(() => {
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiPrompt');
  const button = document.getElementById('aiSubmit');
  const output = document.getElementById('aiOutput');
  const spinner = document.getElementById('aiSpinner');

  if (!form || !input || !button || !output) return;

  const endpoint = 'http://localhost:3001/api/generate-story';

  const setLoading = (isLoading) => {
    button.disabled = isLoading;
    if (spinner) spinner.style.display = isLoading ? 'inline-block' : 'none';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) {
      output.textContent = 'Por favor, escribe un tema o prompt.';
      return;
    }

    setLoading(true);
    output.textContent = '';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Error HTTP ${res.status}`);
      }

      const data = await res.json();
      const story = data?.story || '(Sin texto)';
      output.textContent = story;
    } catch (err) {
      output.textContent = `Error: ${err.message}`;
    } finally {
      setLoading(false);
    }
  });
})();



