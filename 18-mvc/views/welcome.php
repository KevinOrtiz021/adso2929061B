<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Manager</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="bg-gradient-to-br from-base-200 to-base-300 min-h-screen">

  <div class="container mx-auto px-4 py-12 max-w-7xl">
    <div class="text-center mb-10">
      <h1 class="text-5xl font-bold text-base-content mb-3 tracking-tight">Pokémon Manager</h1>
      <p class="text-base-content/60 text-lg">Manage your Pokémon collection</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="stat bg-base-100 rounded-xl shadow-sm border border-base-300">
        <div class="stat-title text-base-content/60">Total Pokémon</div>
        <div class="stat-value text-neutral"><?= count($data) ?></div>
        <div class="stat-desc text-base-content/50">In your collection</div>
      </div>

      <div class="stat bg-base-100 rounded-xl shadow-sm border border-base-300">
        <div class="stat-title text-base-content/60">Types Available</div>
        <div class="stat-value text-neutral">18</div>
        <div class="stat-desc text-base-content/50">Different types</div>
      </div>

      <div class="stat bg-base-100 rounded-xl shadow-sm border border-base-300">
        <div class="stat-title text-base-content/60">Quick Actions</div>
        <div class="stat-actions mt-2">
          <a href="<?= BASE_PATH ?>create" class="btn btn-neutral btn-sm gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z">
              </path>
            </svg>
            Add New
          </a>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-lg border border-base-300">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table">
            <thead class="bg-base-200/50">
              <tr class="border-b border-base-300">
                <th class="text-base-content/70 font-semibold">ID</th>
                <th class="text-base-content/70 font-semibold">Name</th>
                <th class="text-base-content/70 font-semibold">Type</th>
                <th class="text-base-content/70 font-semibold">Stats</th>
                <th class="text-base-content/70 font-semibold">Trainer ID</th>
                <th class="text-base-content/70 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <?php if (empty($data)): ?>
                <tr>
                  <td colspan="6" class="text-center py-12">
                    <p class="text-base-content/50 text-lg mb-4">No Pokémon found in your collection</p>
                    <a href="<?= BASE_PATH ?>create" class="btn btn-neutral btn-sm">Add your first Pokémon</a>
                  </td>
                </tr>
              <?php else: ?>
                <?php foreach ($data as $p): ?>
                  <tr class="hover:bg-base-200/30 transition-colors border-b border-base-300/50">
                    <th class="font-mono text-base-content/60 font-normal">#<?= str_pad($p['id'], 3, '0', STR_PAD_LEFT) ?>
                    </th>
                    <td class="font-semibold text-base-content"><?= htmlspecialchars($p['name']) ?></td>
                    <td>
                      <?php
                      $model = new Model();
                      $badgeClass = $model->getBadgeClass($p['type']);
                      ?>
                      <span class="badge <?= $badgeClass ?> badge-sm gap-1">
                        <?= htmlspecialchars($p['type']) ?>
                      </span>
                    </td>
                    <td>
                      <div class="flex gap-2 flex-wrap">
                        <span class="badge badge-outline badge-sm text-base-content/60">⚔️ <?= $p['strength'] ?></span>
                        <span class="badge badge-outline badge-sm text-base-content/60">❤️ <?= $p['staming'] ?></span>
                      </div>
                    </td>
                    <td class="font-mono text-sm text-base-content/60"><?= htmlspecialchars($p['trainer_id']) ?></td>
                    <td>
                      <div class="flex justify-center gap-1">
                        <a href="<?= BASE_PATH ?>show/<?= $p['id'] ?>" class="btn btn-sm btn-ghost btn-square"
                          title="View Details">
                          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z">
                            </path>
                          </svg>
                        </a>
                        <a href="<?= BASE_PATH ?>edit/<?= $p['id'] ?>" class="btn btn-sm btn-ghost btn-square" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z">
                            </path>
                          </svg>
                        </a>
                        <a href="javascript:void(0)" class="btn btn-sm btn-ghost btn-square text-error deleteBtn"
                          data-id="<?= $p['id'] ?>" data-name="<?= htmlspecialchars($p['name']) ?>" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z">
                            </path>
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    document.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');

        Swal.fire({
          title: "Delete Pokémon?",
          html: `Are you sure you want to delete <strong>${name}</strong>?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ef4444",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Yes, delete it",
          cancelButtonText: "Cancel"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "<?= BASE_PATH ?>destroy/" + id;
          }
        });
      });
    });
  </script>
</body>

</html>