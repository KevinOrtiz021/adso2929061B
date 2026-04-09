<?php

namespace App\Exports;

use App\Models\Pet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PetsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Pet::select('id', 'name', 'kind', 'weigth', 'age', 'breed', 'location', 'description', 'active', 'adopted')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Kind',
            'Weight',
            'Age',
            'Breed',
            'Location',
            'Description',
            'Active',
            'Adopted'
        ];
    }
}

