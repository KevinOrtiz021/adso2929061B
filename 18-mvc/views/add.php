<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Pokémon</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body>

  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col">

      <h1 class="text-4xl font-bold mb-6">Add Pokémon</h1>

      <div class="card bg-base-100 shadow-xl w-full max-w-md p-6">
        <form action="index.php?action=insert" method="POST" class="space-y-4">

          <input type="text" name="name" placeholder="Name"
            class="input input-bordered w-full" required>

          <input type="text" name="type" placeholder="Type (Fire, Water, Grass...)"
            class="input input-bordered w-full" required>

          <input type="number" name="strength" placeholder="Strength"
            class="input input-bordered w-full" required>

          <input type="number" name="staming" placeholder="Staming"
            class="input input-bordered w-full" required>

          <input type="number" name="speed" placeholder="Speed"
            class="input input-bordered w-full" required>

          <input type="number" name="accuracy" placeholder="Accuracy"
            class="input input-bordered w-full" required>

          <input type="number" name="trainer_id" placeholder="Trainer ID"
            class="input input-bordered w-full" required>

          <button type="submit" class="btn btn-primary w-full">
            Save Pokémon
          </button>

        </form>

        <a href="index.php" class="btn btn-neutral w-full mt-4">Back</a>
      </div>

    </div>
  </div>

</body>

</html>
