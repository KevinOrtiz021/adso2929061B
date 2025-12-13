<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Pokémon</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-gradient-to-br from-base-200 to-base-300 min-h-screen">

  <?php
  $model = new Model();
  $types = $model->getAllTypes();
  $trainers = $model->getAllTrainers();
  ?>

  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="text-sm breadcrumbs mb-6">
        <ul>
          <li><a href="<?= BASE_PATH ?>" class="text-base-content/60 hover:text-base-content">Home</a></li>
          <li class="text-base-content">Add Pokémon</li>
        </ul>
      </div>
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-base-content mb-2">Add New Pokémon</h1>
        <p class="text-base-content/60">Fill in the details to add a new Pokémon to your collection</p>
      </div>
      <div class="card bg-base-100 shadow-lg border border-base-300">
        <div class="card-body p-8">
          <form action="<?= BASE_PATH ?>store" method="POST" class="space-y-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold text-base-content">Name</span>
                <span class="label-text-alt text-error">*</span>
              </label>
              <input type="text" name="name" placeholder="e.g. Pikachu"
                class="input input-bordered w-full focus:input-neutral" required>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold text-base-content">Type</span>
                <span class="label-text-alt text-error">*</span>
              </label>
              <select name="type" class="select select-bordered w-full focus:select-neutral" required>
                <option value="" disabled selected>Select a type</option>
                <?php foreach ($types as $type): ?>
                  <option value="<?= $type ?>"><?= $type ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            <div class="divider text-base-content/60">Battle Stats</div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/80">⚔️ Strength</span>
                  <span class="label-text-alt text-base-content/50">0-1000</span>
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" class="btn btn-xs btn-outline decrement" data-target="strength">-</button>
                  <input type="number" name="strength" id="strength" value="50" min="0" max="1000" step="10"
                    class="input input-bordered w-full focus:input-neutral text-center" required>
                  <button type="button" class="btn btn-xs btn-outline increment" data-target="strength">+</button>
                </div>
                <div class="flex justify-between text-xs mt-1">
                  <span class="text-base-content/50">Weak</span>
                  <span class="text-base-content/50">Strong</span>
                </div>
                <input type="range" min="0" max="1000" value="50" class="range range-xs mt-1"
                  oninput="document.getElementById('strength').value = this.value">
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/80">❤️ Stamina</span>
                  <span class="label-text-alt text-base-content/50">0-1000</span>
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" class="btn btn-xs btn-outline decrement" data-target="staming">-</button>
                  <input type="number" name="staming" id="staming" value="50" min="0" max="1000" step="10"
                    class="input input-bordered w-full focus:input-neutral text-center" required>
                  <button type="button" class="btn btn-xs btn-outline increment" data-target="staming">+</button>
                </div>
                <div class="flex justify-between text-xs mt-1">
                  <span class="text-base-content/50">Low</span>
                  <span class="text-base-content/50">High</span>
                </div>
                <input type="range" min="0" max="1000" value="50" class="range range-xs mt-1"
                  oninput="document.getElementById('staming').value = this.value">
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/80">⚡ Speed</span>
                  <span class="label-text-alt text-base-content/50">0-1000</span>
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" class="btn btn-xs btn-outline decrement" data-target="speed">-</button>
                  <input type="number" name="speed" id="speed" value="50" min="0" max="1000" step="10"
                    class="input input-bordered w-full focus:input-neutral text-center" required>
                  <button type="button" class="btn btn-xs btn-outline increment" data-target="speed">+</button>
                </div>
                <div class="flex justify-between text-xs mt-1">
                  <span class="text-base-content/50">Slow</span>
                  <span class="text-base-content/50">Fast</span>
                </div>
                <input type="range" min="0" max="1000" value="50" class="range range-xs mt-1"
                  oninput="document.getElementById('speed').value = this.value">
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-base-content/80">🎯 Accuracy</span>
                  <span class="label-text-alt text-base-content/50">0-1000</span>
                </label>
                <div class="flex items-center gap-2">
                  <button type="button" class="btn btn-xs btn-outline decrement" data-target="accuracy">-</button>
                  <input type="number" name="accuracy" id="accuracy" value="50" min="0" max="1000" step="10"
                    class="input input-bordered w-full focus:input-neutral text-center" required>
                  <button type="button" class="btn btn-xs btn-outline increment" data-target="accuracy">+</button>
                </div>
                <div class="flex justify-between text-xs mt-1">
                  <span class="text-base-content/50">Poor</span>
                  <span class="text-base-content/50">Excellent</span>
                </div>
                <input type="range" min="0" max="1000" value="50" class="range range-xs mt-1"
                  oninput="document.getElementById('accuracy').value = this.value">
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold text-base-content">Trainer</span>
                <span class="label-text-alt text-error">*</span>
              </label>
              <select name="trainer_id" class="select select-bordered w-full focus:select-neutral" required>
                <option value="" disabled selected>Select a trainer</option>
                <?php foreach ($trainers as $trainer): ?>
                  <option value="<?= $trainer['id'] ?>">
                    <?= htmlspecialchars($trainer['name']) ?>
                    <span class="text-base-content/50">(ID: <?= $trainer['id'] ?>)</span>
                  </option>
                <?php endforeach; ?>
              </select>
            </div>
            <div class="flex gap-3 pt-6">
              <button type="submit" class="btn btn-neutral flex-1 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z">
                  </path>
                </svg>
                Save Pokémon
              </button>

              <a href="<?= BASE_PATH ?>" class="btn btn-ghost flex-1 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z">
                  </path>
                </svg>
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script>
    document.querySelectorAll('.increment').forEach(button => {
      button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        let value = parseInt(input.value) || 0;
        const step = parseInt(input.step) || 10;
        const max = parseInt(input.max) || 1000;

        if (value + step <= max) {
          input.value = value + step;
          const slider = input.previousElementSibling?.previousElementSibling?.querySelector('input[type="range"]') ||
            input.parentElement.nextElementSibling?.nextElementSibling;
          if (slider && slider.type === 'range') {
            slider.value = input.value;
          }
        }
      });
    });

    document.querySelectorAll('.decrement').forEach(button => {
      button.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        let value = parseInt(input.value) || 0;
        const step = parseInt(input.step) || 10;
        const min = parseInt(input.min) || 0;

        if (value - step >= min) {
          input.value = value - step;
          const slider = input.previousElementSibling?.previousElementSibling?.querySelector('input[type="range"]') ||
            input.parentElement.nextElementSibling?.nextElementSibling;
          if (slider && slider.type === 'range') {
            slider.value = input.value;
          }
        }
      });
    });

    document.querySelectorAll('input[type="range"]').forEach(slider => {
      slider.addEventListener('input', function () {
        const targetName = this.parentElement.previousElementSibling?.querySelector('input[type="number"]')?.name;
        if (targetName) {
          const input = document.querySelector(`input[name="${targetName}"]`);
          if (input) {
            input.value = this.value;
          }
        }
      });
    });
  </script>
</body>

</html>