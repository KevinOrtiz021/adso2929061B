<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Details - <?= htmlspecialchars($data['name']) ?></title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-gradient-to-br from-base-200 to-base-300 min-h-screen">

  <?php
  // Crear instancia del modelo para obtener datos del entrenador
  $model = new Model();
  $trainer = $model->findTrainer($data['trainer_id']);
  ?>

  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <div class="text-sm breadcrumbs mb-6">
        <ul>
          <li><a href="<?= BASE_PATH ?>" class="text-base-content/60 hover:text-base-content">Home</a></li>
          <li class="text-base-content">Pokémon Details</li>
        </ul>
      </div>

      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-base-content mb-2">Pokémon Details</h1>
        <p class="text-base-content/60">Complete information about <?= htmlspecialchars($data['name']) ?></p>
      </div>

      <!-- Details Card -->
      <div class="card bg-base-100 shadow-lg border border-base-300">
        <div class="card-body p-8">
          <!-- Name and Type Header -->
          <div class="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-base-300">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <p class="text-base-content/50 font-mono text-sm mb-1">#<?= str_pad($data['id'], 3, '0', STR_PAD_LEFT) ?>
              </p>
              <h2 class="text-4xl font-bold text-base-content"><?= htmlspecialchars($data['name']) ?></h2>
            </div>

            <?php $badgeClass = $model->getBadgeClass($data['type']); ?>
            <div class="text-center">
              <p class="text-xs text-base-content/50 mb-2">TYPE</p>
              <span
                class="badge <?= $badgeClass ?> badge-lg px-6 py-4 text-base"><?= htmlspecialchars($data['type']) ?></span>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-base-content mb-4">Battle Statistics</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <!-- Strength -->
              <div class="stat bg-base-200 rounded-xl border border-base-300">
                <div class="stat-figure text-neutral">
                  <span class="text-3xl">⚔️</span>
                </div>
                <div class="stat-title text-base-content/60">Strength</div>
                <div class="stat-value text-neutral text-4xl"><?= htmlspecialchars($data['strength']) ?></div>
                <div class="stat-desc text-base-content/50">Attack power</div>
                <?php $strengthPercent = $model->calculatePercentage($data['strength']); ?>
                <progress class="progress progress-neutral mt-2" value="<?= $strengthPercent ?>" max="100"></progress>
                <div class="text-xs text-base-content/50 mt-1 text-right"><?= round($strengthPercent) ?>% of max</div>
              </div>

              <!-- Stamina -->
              <div class="stat bg-base-200 rounded-xl border border-base-300">
                <div class="stat-figure text-neutral">
                  <span class="text-3xl">❤️</span>
                </div>
                <div class="stat-title text-base-content/60">Stamina</div>
                <div class="stat-value text-neutral text-4xl"><?= htmlspecialchars($data['staming']) ?></div>
                <div class="stat-desc text-base-content/50">Endurance</div>
                <?php $staminaPercent = $model->calculatePercentage($data['staming']); ?>
                <progress class="progress progress-neutral mt-2" value="<?= $staminaPercent ?>" max="100"></progress>
                <div class="text-xs text-base-content/50 mt-1 text-right"><?= round($staminaPercent) ?>% of max</div>
              </div>

              <!-- Speed -->
              <div class="stat bg-base-200 rounded-xl border border-base-300">
                <div class="stat-figure text-neutral">
                  <span class="text-3xl">⚡</span>
                </div>
                <div class="stat-title text-base-content/60">Speed</div>
                <div class="stat-value text-neutral text-4xl"><?= htmlspecialchars($data['speed']) ?></div>
                <div class="stat-desc text-base-content/50">Movement rate</div>
                <?php $speedPercent = $model->calculatePercentage($data['speed']); ?>
                <progress class="progress progress-neutral mt-2" value="<?= $speedPercent ?>" max="100"></progress>
                <div class="text-xs text-base-content/50 mt-1 text-right"><?= round($speedPercent) ?>% of max</div>
              </div>

              <!-- Accuracy -->
              <div class="stat bg-base-200 rounded-xl border border-base-300">
                <div class="stat-figure text-neutral">
                  <span class="text-3xl">🎯</span>
                </div>
                <div class="stat-title text-base-content/60">Accuracy</div>
                <div class="stat-value text-neutral text-4xl"><?= htmlspecialchars($data['accuracy']) ?></div>
                <div class="stat-desc text-base-content/50">Hit precision</div>
                <?php $accuracyPercent = $model->calculatePercentage($data['accuracy']); ?>
                <progress class="progress progress-neutral mt-2" value="<?= $accuracyPercent ?>" max="100"></progress>
                <div class="text-xs text-base-content/50 mt-1 text-right"><?= round($accuracyPercent) ?>% of max</div>
              </div>

            </div>
          </div>

          <!-- Trainer Section -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-base-content mb-4">Trainer Information</h3>
            <div class="alert border border-base-300 bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-8 text-neutral" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                  d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z">
                </path>
              </svg>
              <div class="flex-1">
                <div class="font-bold text-lg text-base-content">
                  <?= $trainer ? htmlspecialchars($trainer['name']) : 'Unknown Trainer' ?>
                </div>
                <div class="text-sm mt-2 flex flex-wrap gap-2">
                  <?php if ($trainer && isset($trainer['region'])): ?>
                    <span class="badge badge-neutral badge-sm">
                      📍 <?= htmlspecialchars($trainer['region']) ?>
                    </span>
                  <?php endif; ?>

                  <?php if ($trainer && isset($trainer['badge_count'])): ?>
                    <span class="badge badge-neutral badge-sm">
                      🏅 <?= $trainer['badge_count'] ?> Badges
                    </span>
                  <?php endif; ?>

                  <span class="badge badge-ghost badge-sm font-mono">
                    Trainer ID: <?= htmlspecialchars($data['trainer_id']) ?>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <a href="<?= BASE_PATH ?>edit/<?= $data['id'] ?>" class="btn btn-neutral flex-1 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z">
                </path>
              </svg>
              Edit Pokémon
            </a>

            <a href="<?= BASE_PATH ?>" class="btn btn-ghost flex-1 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z">
                </path>
              </svg>
              Back to List
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</body>

</html>