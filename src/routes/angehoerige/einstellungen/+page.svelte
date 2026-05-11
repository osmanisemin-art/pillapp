<script>
  import BackLink from '$lib/components/BackLink.svelte';
  import BottomTabBar from '$lib/components/BottomTabBar.svelte';
  import {
    einnahmen,
    einnahmeHinzufuegen,
    einnahmeBearbeiten,
    einnahmeLoeschen
  } from '$lib/stores/medikamente.js';
  import { showToast } from '$lib/stores/toast.js';

  let editId = $state(null);
  let showForm = $state(false);

  let formData = $state({
    name: '',
    zeit: '',
    dosis: '',
    farbe: ''
  });

  let errors = $state({});

  function validate() {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name ist Pflichtfeld';
    if (!formData.zeit.trim()) e.zeit = 'Uhrzeit ist Pflichtfeld';
    errors = e;
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (editId !== null) {
      einnahmeBearbeiten(editId, {
        name: formData.name,
        zeit: formData.zeit,
        dosis: formData.dosis,
        farbe: formData.farbe || null
      });
      showToast('Einnahme gespeichert ✓');
    } else {
      einnahmeHinzufuegen({
        name: formData.name,
        zeit: formData.zeit,
        dosis: formData.dosis,
        farbe: formData.farbe || null
      });
      showToast('Neue Einnahme hinzugefügt ✓');
    }

    resetForm();
  }

  function handleEdit(e) {
    editId = e.id;
    formData = {
      name: e.name,
      zeit: e.zeit,
      dosis: e.dosis || '',
      farbe: e.farbe || ''
    };
    showForm = true;
    errors = {};
  }

  function handleDelete(id) {
    einnahmeLoeschen(id);
    showToast('Einnahme gelöscht');
  }

  function resetForm() {
    editId = null;
    showForm = false;
    formData = { name: '', zeit: '', dosis: '', farbe: '' };
    errors = {};
  }
</script>

<main class="page">
  <BackLink />

  <div class="content">
    <header class="header">
      <h1 class="title">Einstellungen</h1>
      <p class="subtitle">Medikamente verwalten</p>
    </header>

    <section class="liste" aria-label="Medikamentenliste">
      {#each $einnahmen as e (e.id)}
        <div class="einnahme-card">
          <div class="einnahme-info">
            <span class="einnahme-name">{e.name}</span>
            <span class="einnahme-detail">{e.zeit} · {e.dosis}</span>
          </div>
          <div class="einnahme-actions">
            <button
              class="edit-btn"
              onclick={() => handleEdit(e)}
              aria-label={`${e.name} bearbeiten`}
            >✏️</button>
            <button
              class="delete-btn"
              onclick={() => handleDelete(e.id)}
              aria-label={`${e.name} löschen`}
            >🗑️</button>
          </div>
        </div>
      {/each}
    </section>

    {#if !showForm}
      <button
        class="add-btn"
        onclick={() => { showForm = true; editId = null; }}
        aria-label="Neue Einnahme hinzufügen"
      >
        + Einnahme hinzufügen
      </button>
    {/if}

    {#if showForm}
      <section class="form-section" aria-label="Einnahme-Formular">
        <h2 class="form-title">
          {editId !== null ? 'Einnahme bearbeiten' : 'Neue Einnahme'}
        </h2>

        <div class="form-group">
          <label for="name" class="form-label">
            Name <span class="required" aria-label="Pflichtfeld">*</span>
          </label>
          <input
            id="name"
            type="text"
            class="form-input"
            class:error={errors.name}
            bind:value={formData.name}
            placeholder="z. B. Morgen"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {#if errors.name}
            <span class="error-msg" id="name-error" role="alert">{errors.name}</span>
          {/if}
        </div>

        <div class="form-group">
          <label for="zeit" class="form-label">
            Uhrzeit <span class="required" aria-label="Pflichtfeld">*</span>
          </label>
          <input
            id="zeit"
            type="time"
            class="form-input"
            class:error={errors.zeit}
            bind:value={formData.zeit}
            aria-required="true"
            aria-describedby={errors.zeit ? 'zeit-error' : undefined}
          />
          {#if errors.zeit}
            <span class="error-msg" id="zeit-error" role="alert">{errors.zeit}</span>
          {/if}
        </div>

        <div class="form-group">
          <label for="dosis" class="form-label">Dosis-Beschreibung</label>
          <input
            id="dosis"
            type="text"
            class="form-input"
            bind:value={formData.dosis}
            placeholder="z. B. 2 weisse + 1 blaue"
          />
        </div>

        <div class="form-group">
          <label for="farbe" class="form-label">Farbe / Beschreibung</label>
          <input
            id="farbe"
            type="text"
            class="form-input"
            bind:value={formData.farbe}
            placeholder="z. B. weiss"
          />
        </div>

        <div class="form-actions">
          <button class="submit-btn" onclick={handleSubmit} aria-label="Speichern">
            Speichern
          </button>
          <button class="cancel-btn" onclick={resetForm} aria-label="Abbrechen">
            Abbrechen
          </button>
        </div>
      </section>
    {/if}
  </div>

  <BottomTabBar activeTab="einstellungen" />
</main>

<style>
  .page {
    min-height: 100vh;
    max-width: 375px;
    margin: 0 auto;
    background: var(--color-bg);
    padding-bottom: 70px;
    position: relative;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 64px 16px 16px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 14px;
    color: var(--color-gray);
  }

  .liste {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .einnahme-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-gray-light);
    padding: 14px 12px;
    border-radius: var(--radius-md);
  }

  .einnahme-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .einnahme-name {
    font-weight: 600;
    font-size: 16px;
  }

  .einnahme-detail {
    font-size: 13px;
    color: var(--color-gray);
  }

  .einnahme-actions {
    display: flex;
    gap: 8px;
  }

  .edit-btn, .delete-btn {
    padding: 8px;
    border-radius: var(--radius-sm);
    font-size: 18px;
    background: var(--color-bg);
  }

  .add-btn {
    padding: 14px;
    background: var(--color-primary-light);
    color: var(--color-primary);
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }

  .form-section {
    background: var(--color-gray-light);
    border-radius: var(--radius-md);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-title {
    font-size: 18px;
    font-weight: 700;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
  }

  .required {
    color: var(--color-danger);
  }

  .form-input {
    padding: 10px 12px;
    border: 1.5px solid #ddd;
    border-radius: var(--radius-sm);
    font-size: 15px;
    font-family: var(--font-family);
    background: var(--color-bg);
    color: var(--color-text);
    width: 100%;
  }

  .form-input.error {
    border-color: var(--color-danger);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  .error-msg {
    font-size: 12px;
    color: var(--color-danger);
  }

  .form-actions {
    display: flex;
    gap: 10px;
  }

  .submit-btn {
    flex: 1;
    padding: 12px;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
    font-size: 15px;
    font-weight: 600;
  }

  .cancel-btn {
    flex: 1;
    padding: 12px;
    background: var(--color-bg);
    color: var(--color-text);
    border: 1.5px solid #ddd;
    border-radius: var(--radius-sm);
    font-size: 15px;
  }
</style>
