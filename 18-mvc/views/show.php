<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Details</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body>

  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col">

      <h1 class="text-4xl font-bold mb-6">Pokémon Details</h1>

      <div class="card bg-base-100 shadow-xl w-full max-w-md p-6">

        <!-- Título + Badge -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold"><?= htmlspecialchars($data['name']) ?></h2>

          <?php 
            $type = $data['type'];
            $badge = "badge"; 

            if ($type == 'Water') $badge = 'badge badge-outline badge-info';
            elseif ($type == 'Grass') $badge = 'badge badge-outline badge-success';
            elseif ($type == 'Fire') $badge = 'badge badge-outline badge-error';
            elseif ($type == 'Electric') $badge = 'badge badge-outline badge-warning';
            elseif ($type == 'Normal') $badge = 'badge badge-outline badge-secondary';
            elseif ($type == 'Poison') $badge = 'badge badge-outline badge-primary';
            elseif ($type == 'Ghost') $badge = 'badge badge-outline badge-accent';
            elseif ($type == 'Dragon') $badge = 'badge badge-outline badge-secondary';
            elseif ($type == 'Rock') $badge = 'badge badge-outline badge-neutral';
          ?>

          <span class="<?= $badge ?>"><?= htmlspecialchars($type) ?></span>
        </div>

        <!-- Datos -->
        <div class="space-y-2 text-left">
          <p><b>ID:</b> <?= htmlspecialchars($data['id']) ?></p>
          <p><b>Strength:</b> <?= htmlspecialchars($data['strength']) ?></p>
          <p><b>Staming:</b> <?= htmlspecialchars($data['staming']) ?></p>
          <p><b>Speed:</b> <?= htmlspecialchars($data['speed']) ?></p>
          <p><b>Accuracy:</b> <?= htmlspecialchars($data['accuracy']) ?></p>
          <p><b>Trainer ID:</b> <?= htmlspecialchars($data['trainer_id']) ?></p>
        </div>

        <!-- Botón volver -->
        <a href="index.php" class="btn btn-neutral w-full mt-6">
          Back
        </a>

      </div>
    </div>
  </div>

</body>
</html>
