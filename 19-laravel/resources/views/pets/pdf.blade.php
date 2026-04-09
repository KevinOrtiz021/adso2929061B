<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Mascotas - Larapets</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            font-size: 12px;
            padding: 20px;
            background: #fff;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #4a5568;
        }

        .header h1 {
            color: #2d3748;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header .date {
            color: #718096;
            font-size: 11px;
        }

        .header .stats {
            color: #48bb78;
            font-size: 12px;
            margin-top: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 11px;
        }

        th {
            background-color: #2d3748;
            color: white;
            padding: 10px 8px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #4a5568;
        }

        td {
            padding: 8px 6px;
            border: 1px solid #cbd5e0;
            vertical-align: middle;
        }

        tr:nth-child(even) {
            background-color: #f7fafc;
        }

        .pet-photo {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            display: block;
            margin: 0 auto;
        }

        .status-active {
            color: #48bb78;
            font-weight: bold;
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            background: #f0fff4;
            font-size: 10px;
        }

        .status-adopted {
            color: #4299e1;
            font-weight: bold;
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            background: #ebf8ff;
            font-size: 10px;
        }

        .text-center {
            text-align: center;
        }

        .font-bold {
            font-weight: bold;
        }

        .badge-perro {
            background-color: #4299e1;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 9px;
            display: inline-block;
        }

        .badge-gato {
            background-color: #ed8936;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 9px;
            display: inline-block;
        }

        .footer {
            text-align: center;
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #a0aec0;
        }

        @page {
            margin: 15mm;
            size: landscape;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1> LISTADO DE MASCOTAS - LARAPETS</h1>
        <div class="date">Fecha: {{ \Carbon\Carbon::now()->format('d/m/Y H:i:s') }}</div>
        <div class="stats">
             Total: {{ $pets->count() }} mascotas | 
             Perros: {{ $pets->where('kind', 'Perro')->count() }} | 
             Gatos: {{ $pets->where('kind', 'Gato')->count() }} |
            Adoptados: {{ $pets->where('adopted', 1)->count() }}
        </div>
    </div>

    <table cellspacing="0">
        <thead>
            <tr>
                <th width="5%">ID</th>
                <th width="10%">NOMBRE</th>
                <th width="8%">TIPO</th>
                <th width="8%">PESO</th>
                <th width="8%">EDAD</th>
                <th width="12%">RAZA</th>
                <th width="12%">UBICACIÓN</th>
                <th width="25%">DESCRIPCIÓN</th>
                <th width="12%">ESTADO</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pets as $pet)
            <tr>
                <td class="text-center">{{ $pet->id }}</td>
                <td class="font-bold">{{ $pet->name }}</td>
                <td class="text-center">
                    @if($pet->kind == 'Perro')
                        <span class="badge-perro"> {{ $pet->kind }}</span>
                    @else
                        <span class="badge-gato"> {{ $pet->kind }}</span>
                    @endif
                </td>
                <td class="text-center">{{ number_format($pet->weight, 1) }} kg</td>
                <td class="text-center">
                    @if($pet->age < 1)
                        {{ $pet->age * 12 }} meses
                    @else
                        {{ number_format($pet->age, 0) }} años
                    @endif
                </td>
                <td>{{ $pet->breed ?: 'No especificada' }}</td>
                <td>{{ $pet->location ?: 'No especificada' }}</td>
                <td>{{ Str::limit($pet->description, 80) }}</td>
                <td class="text-center">
                    @if($pet->adopted)
                        <span class="status-adopted"> ADOPTADO</span>
                    @elseif($pet->active)
                        <span class="status-active"> DISPONIBLE</span>
                    @else
                        <span class="status-inactive"> INACTIVO</span>
                    @endif
                </td>
            </tr>
            @empty
                <tr>
                    <td colspan="9" class="text-center">No hay mascotas registradas</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Este documento fue generado automáticamente por Larapets - Sistema de Gestión de Mascotas
    </div>
</body>
</html>